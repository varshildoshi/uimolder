import { inject, Injectable } from '@angular/core';
import { ElementService } from './element.service';
import { ElementTypesService } from './element-types.service';
import { FlavorName } from '../models/element';
import { ElementRow } from '../models/element-row';
import { FormElement } from '../models/element';

@Injectable({
  providedIn: 'root'
})
export class CodeGeneratorService {
  private elementService = inject(ElementService);
  private elementTypesService = inject(ElementTypesService);

  private usedTypes = new Set<string>();

  /**
   * Main entry point to generate the component files
   */
  public generateComponent(flavor: FlavorName, useExternalCss: boolean, styleType: 'css' | 'scss'): { ts: string, styles: string } {
    this.usedTypes.clear();
    const rows = this.elementService.rows();
    const result = this.generateLayout(rows, flavor, useExternalCss, styleType);

    const tsContent = this.getComponentTsString(flavor, result.html, result.css, useExternalCss, styleType);
    const stylesContent = this.getStylesString(result.css);

    return { ts: tsContent, styles: stylesContent };
  }

  /**
   * Generates the final TypeScript string for the Angular component
   */
  private getComponentTsString(flavor: FlavorName, html: string, css: string, useExternalCss: boolean, styleType: 'css' | 'scss'): string {
    const imports = this.getImports(flavor);
    const modules = this.getImportModules(flavor);

    const styleDeclaration = useExternalCss 
        ? `styleUrl: './layout.${styleType}'` 
        : `styles: [\`
${this.indent(css, 4)}
  \`]`;

    return `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
${imports}

@Component({
  selector: 'app-generated-layout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ${modules}
  ],
  template: \`
${this.indent(html, 4)}
  \`,
  ${styleDeclaration}
})
export class GeneratedLayoutComponent {}`;
  }

  /**
   * Generates the final Styles string
   */
  private getStylesString(css: string): string {
    if (!css) return '/* No custom styles generated */';
    return `/* Generated Layout Styles */\n\n${css}`;
  }

  private generateLayout(rows: ElementRow[], flavor: FlavorName, useExternalCss: boolean, styleType: 'css' | 'scss'): { html: string, css: string } {
    let html = '';
    let css = '';

    rows.forEach(row => {
      const rowResult = this.generateRow(row, flavor, useExternalCss, styleType);
      html += rowResult.html + '\n';
      css += rowResult.css + '\n';
    });

    return { html: html.trim(), css: css.trim() };
  }

  private generateRow(row: ElementRow, flavor: FlavorName, useExternalCss: boolean, styleType: 'css' | 'scss'): { html: string, css: string } {
    let rowHtml = '';
    let rowCss = '';

    row.elements.forEach(el => {
      const elResult = this.generateElement(el, flavor, useExternalCss, styleType);
      rowHtml += elResult.html + '\n';
      rowCss += elResult.css + '\n';
    });

    const className = `row_${row.id.split('-')[0]}`;
    
    if (flavor === 'tailwind' || flavor === 'material') {
        const wrapper = `<div class="flex flex-wrap gap-4 w-full mb-6">\n${this.indent(rowHtml, 2)}\n</div>`;
        return { html: wrapper, css: rowCss };
    }

    const rowStyles = `display: flex; flex-wrap: wrap; gap: 16px; width: 100%; margin-bottom: 24px;`;
    
    if (useExternalCss && styleType === 'scss') {
        return {
            html: `<div class="${className}">\n${this.indent(rowHtml, 2)}\n</div>`,
            css: `.${className} {\n  ${rowStyles}\n${this.indent(rowCss, 2)}\n}`
        };
    }

    if (useExternalCss) {
        return {
            html: `<div class="${className}">\n${this.indent(rowHtml, 2)}\n</div>`,
            css: `.${className} { ${rowStyles} }\n${rowCss}`
        };
    }
    return {
        html: `<div style="${rowStyles}">\n${this.indent(rowHtml, 2)}\n</div>`,
        css: rowCss
    };
  }

  private generateElement(el: FormElement, flavor: FlavorName, useExternalCss: boolean, styleType: 'css' | 'scss'): { html: string, css: string } {
    this.usedTypes.add(el.type);
    const typeDef = this.elementTypesService.getElementType(el.type);
    if (!typeDef || !typeDef.getTemplate) return { html: `<!-- Unknown element: ${el.type} -->`, css: '' };

    let innerHtml = '';
    let innerCss = '';

    if (el.nestedRows) {
        const nestedResult = this.generateLayout(el.nestedRows, flavor, useExternalCss, styleType);
        innerHtml = nestedResult.html;
        innerCss = nestedResult.css;
    }

    const result = typeDef.getTemplate(el, flavor, useExternalCss, innerHtml);
    
    let elementCss = result.css || '';
    
    // Simple SCSS Nesting transformation for elements like Cards
    if (useExternalCss && styleType === 'scss' && el.type === 'card' && elementCss) {
        // Find the first selector and nest others
        const lines = elementCss.split('\n').filter(l => l.trim());
        if (lines.length > 1) {
            const parentSelector = lines[0].split('{')[0].trim();
            const parentStyles = lines[0].split('{')[1].replace('}', '').trim();
            const children = lines.slice(1).map(l => {
                const selector = l.split('{')[0].trim().replace(parentSelector, '&');
                const styles = l.split('{')[1].replace('}', '').trim();
                return `  ${selector} { ${styles} }`;
            }).join('\n');
            elementCss = `${parentSelector} {\n  ${parentStyles}\n${children}\n}`;
        }
    }

    return { 
        html: result.html, 
        css: elementCss + '\n' + innerCss 
    };
  }

  private indent(str: string, spaces: number): string {
    const pad = ' '.repeat(spaces);
    if (!str) return '';
    return str.split('\n').map(line => pad + line).join('\n');
  }

  private getImports(flavor: FlavorName): string {
    if (flavor !== 'material') return '';
    
    const imports: string[] = [];
    const types = this.usedTypes;

    if (types.has('text') || types.has('textarea') || types.has('select') || types.has('datepicker')) {
        imports.push("import { MatFormFieldModule } from '@angular/material/form-field';");
    }
    if (types.has('text') || types.has('textarea') || types.has('datepicker')) {
        imports.push("import { MatInputModule } from '@angular/material/input';");
    }
    if (types.has('select')) {
        imports.push("import { MatSelectModule } from '@angular/material/select';");
    }
    if (types.has('checkbox')) {
        imports.push("import { MatCheckboxModule } from '@angular/material/checkbox';");
    }
    if (types.has('radio')) {
        imports.push("import { MatRadioModule } from '@angular/material/radio';");
    }
    if (types.has('datepicker')) {
        imports.push("import { MatDatepickerModule } from '@angular/material/datepicker';");
        imports.push("import { MatNativeDateModule } from '@angular/material/core';");
    }
    if (types.has('button') || types.has('buttons-group')) {
        imports.push("import { MatButtonModule } from '@angular/material/button';");
    }
    if (types.has('card')) {
        imports.push("import { MatCardModule } from '@angular/material/card';");
    }

    return imports.join('\n');
  }

  private getImportModules(flavor: FlavorName): string {
    if (flavor !== 'material') return '';
    
    const modules: string[] = [];
    const types = this.usedTypes;

    if (types.has('text') || types.has('textarea') || types.has('select') || types.has('datepicker')) {
        modules.push("MatFormFieldModule");
    }
    if (types.has('text') || types.has('textarea') || types.has('datepicker')) {
        modules.push("MatInputModule");
    }
    if (types.has('select')) {
        modules.push("MatSelectModule");
    }
    if (types.has('checkbox')) {
        modules.push("MatCheckboxModule");
    }
    if (types.has('radio')) {
        modules.push("MatRadioModule");
    }
    if (types.has('datepicker')) {
        modules.push("MatDatepickerModule");
        modules.push("MatNativeDateModule");
    }
    if (types.has('button') || types.has('buttons-group')) {
        modules.push("MatButtonModule");
    }
    if (types.has('card')) {
        modules.push("MatCardModule");
    }

    return modules.join(',\n    ');
  }
}
