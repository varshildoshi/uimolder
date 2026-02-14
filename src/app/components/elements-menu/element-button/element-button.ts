import { Component, input, signal } from '@angular/core';
import { ElementTypeDefinition } from '../../../models/element';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-element-button',
  imports: [MatIconModule, DragDropModule],
  templateUrl: './element-button.html',
  styleUrl: './element-button.scss',
})
export class ElementButton {
  element = input.required<ElementTypeDefinition>();
  whileDragging = signal(false);
}
