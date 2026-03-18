import { Component, inject, input, signal } from '@angular/core';
import { ElementTypeDefinition, DraggedItem } from '../../../models/element';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ElementService } from '../../../services/element.service';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-element-button',
  imports: [MatIconModule, DragDropModule],
  templateUrl: './element-button.html',
  styleUrl: './element-button.scss',
})
export class ElementButton {
  element = input.required<ElementTypeDefinition>();
  elementService = inject(ElementService);
  viewMode = inject(LayoutService).viewMode;
  whileDragging = signal(false);

  onDragStarted() {
    this.whileDragging.set(true);
    this.elementService.currentlyDraggedItem.set(this.element());
  }

  onDragEnded() {
    this.whileDragging.set(false);
    this.elementService.currentlyDraggedItem.set(null);
    this.elementService.currentlyHoveredRowId.set(null);
  }
}
