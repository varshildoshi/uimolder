import { Component, inject, input, output, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodeGeneratorService } from '../../services/code-generator.service';
import { LayoutService } from '../../services/layout.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-export-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCheckboxModule, MatRadioModule],
  templateUrl: './export-modal.html',
  styleUrl: './export-modal.scss',
})
export class ExportModal {
  isOpen = input.required<boolean>();
  close = output<void>();

  private generatorService = inject(CodeGeneratorService);
  public layoutService = inject(LayoutService);

  useExternalCss = signal(false);
  styleType = signal<'css' | 'scss'>('scss');
  activeTab = signal<'ts' | 'styles'>('ts');

  // Reset modal state when closed or when flavor changes
  constructor() {
    effect(() => {
      // Trigger reset on closing or flavor change
      this.isOpen();
      this.layoutService.activeFlavor();

      this.useExternalCss.set(false);
      this.styleType.set('scss');
      this.activeTab.set('ts');
    });
  }

  flavorData = computed(() => {
    const flavor = this.layoutService.activeFlavor();
    switch (flavor) {
      case 'html': return { label: 'HTML', color: '#e34f26', icon: 'm3 2 1.578 17.824L12 22l7.467-2.175L21 2H3Zm14.049 6.048H9.075l.172 2.016h7.697l-.626 6.565-4.246 1.381-4.281-1.455-.288-2.932h2.024l.16 1.411 2.4.815 2.346-.763.297-3.005H7.416l-.562-6.05h10.412l-.217 2.017Z' };
      case 'tailwind': return { label: 'Tailwind', color: '#38bdf8', icon: 'M11.782 5.72a4.773 4.773 0 0 0-4.8 4.173 3.43 3.43 0 0 1 2.741-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.934-2.865 3.137-3.921-.969 1.379-2.44 2.207-4.259 1.231-1.253-.673-2.19-3.438-5.959-3.318ZM6.8 11.979A4.772 4.772 0 0 0 2 16.151a3.431 3.431 0 0 1 2.745-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.933-2.865 3.137-3.921-.97 1.379-2.44 2.208-4.259 1.231-1.253-.673-2.19-3.443-5.963-3.317Z' };
      case 'material': return { label: 'Material', color: '#dd0031', icon: 'M12 2L3.8 4.9l1.2 10.9L12 21l7-5.2 1.2-10.9L12 2zm0 2l5.1 11.5h-1.9l-1-2.6H9.8l-1 2.6H6.9L12 4zm1.5 7.4L12 7.8l-1.5 3.6h3z' };
      default: return { label: 'Unknown', color: '#fff', icon: '' };
    }
  });

  generatedCode = computed(() => {
    return this.generatorService.generateComponent(
      this.layoutService.activeFlavor(),
      this.useExternalCss(),
      this.styleType()
    );
  });

  get stylesLabel(): string {
    return this.styleType() === 'scss' ? 'Styles (SCSS)' : 'Styles (CSS)';
  }

  get stylesFileName(): string {
    return this.styleType() === 'scss' ? 'layout.scss' : 'layout.css';
  }

  downloadFile() {
    const text = this.activeTab() === 'ts' ? this.generatedCode().ts : this.generatedCode().styles;
    const filename = this.activeTab() === 'ts' ? 'generated-layout.ts' : this.stylesFileName;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }
}
