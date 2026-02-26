import { Component, inject, input, signal } from '@angular/core';
import { ElementTypeDefinition } from '../../../models/element';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ElementService } from '../../../services/element.service';

@Component({
  selector: 'app-element-button',
  imports: [MatIconModule, DragDropModule],
  templateUrl: './element-button.html',
  styleUrl: './element-button.scss',
})
export class ElementButton {
  element = input.required<ElementTypeDefinition>();
  elementService = inject(ElementService);
  whileDragging = signal(false);
}
