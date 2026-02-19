import { Component, inject, input, output, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodeGeneratorService } from '../../services/code-generator.service';
import { LayoutService } from '../../services/layout.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-export-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatCheckboxModule],
  templateUrl: './export-modal.html',
  styleUrl: './export-modal.scss',
})
export class ExportModal {
  isOpen = input.required<boolean>();
  close = output<void>();

  private generatorService = inject(CodeGeneratorService);
  private layoutService = inject(LayoutService);

  useExternalCss = signal(false);
  activeTab = signal<'ts' | 'scss'>('ts');

  generatedCode = computed(() => {
    return this.generatorService.generateComponent(this.layoutService.activeFlavor(), this.useExternalCss());
  });

  copyToClipboard() {
    const text = this.activeTab() === 'ts' ? this.generatedCode().ts : this.generatedCode().scss;
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  }

  downloadFile() {
    const text = this.activeTab() === 'ts' ? this.generatedCode().ts : this.generatedCode().scss;
    const filename = this.activeTab() === 'ts' ? 'generated-layout.ts' : 'layout.scss';
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }
}
