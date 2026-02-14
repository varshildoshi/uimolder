import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { ComponentNode, FormRow, ViewMode } from '../layout-builder/layout-builder';
import { ElementService } from '../../services/element.service';
import { ElementPreview } from './components/element-preview/element-preview';
import { ElementEditor } from './components/element-editor/element-editor';

@Component({
  selector: 'app-elements-canvas',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, MatIconModule, ElementEditor, ElementPreview],
  host: {
    'class': 'block h-full'
  },
  templateUrl: './elements-canvas.html',
  styleUrl: './elements-canvas.scss'
})
export class ElementsCanvas {
  public readonly viewMode = input<ViewMode>('editor');
  elementService = inject(ElementService);

  public readonly addRow = output<void>();
  public readonly removeRowAction = output<string>();
  public readonly removeItemAction = output<string>();
  public readonly selectElement = output<string>();
  public readonly viewModeChange = output<ViewMode>();

  public onRemoveRow(rowId: string) {
    this.removeRowAction.emit(rowId);
  }

  public onRemoveItem(id: string, event: MouseEvent) {
    event.stopPropagation();
    this.removeItemAction.emit(id);
  }

  public onSelectElement(id: string) {
    this.selectElement.emit(id);
  }

  public setViewMode(mode: ViewMode) {
    this.viewModeChange.emit(mode);
  }
}