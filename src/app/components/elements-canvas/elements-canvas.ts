import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { ViewMode } from '../layout-builder/layout-builder';
import { ElementService } from '../../services/element.service';
import { ElementPreview } from './components/element-preview/element-preview';
import { ElementEditor } from './components/element-editor/element-editor';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-elements-canvas',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, MatIconModule, ElementEditor, ElementPreview],
  host: {
    'class': 'block h-full'
  },
  templateUrl: './elements-canvas.html',
  styleUrl: './elements-canvas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsCanvas {
  layoutService = inject(LayoutService);
  public readonly viewMode = this.layoutService.viewMode;
  elementService = inject(ElementService);

  public readonly addRow = output<void>();
  public readonly removeRowAction = output<string>();
  public readonly removeItemAction = output<string>();
  public readonly selectElement = output<string>();

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
    this.layoutService.viewMode.set(mode);
  }
}
