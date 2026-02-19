import { Component, inject, input, output, signal, computed } from '@angular/core';
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
  imports: [CommonModule, FormsModule, MatIconModule, MatCheckboxModule, MatRadioModule],
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
