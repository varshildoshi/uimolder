import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { ElementService } from '../../services/element.service';
import { ElementPreview } from './components/element-preview/element-preview';
import { ElementEditor } from './components/element-editor/element-editor';
import { LayoutService, ViewMode } from '../../services/layout.service';

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
  private readonly layoutService = inject(LayoutService);
  readonly viewMode = this.layoutService.viewMode;
  readonly elementService = inject(ElementService);

  setViewMode(mode: ViewMode) {
    this.layoutService.viewMode.set(mode);
  }
}
