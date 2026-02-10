import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface ComponentNode {
  id: string;
  type: string;
  label: string;
  props: any;
  children?: ComponentNode[];
}

export type ViewMode = 'editor' | 'preview';
export type FlavorName = 'html' | 'tailwind' | 'material';

export interface Flavor {
  name: FlavorName;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-layout-builder',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './layout-builder.html',
  styleUrl: './layout-builder.scss'
})
export class LayoutBuilder {
  public readonly canvasItems = signal<ComponentNode[]>([]);
  public readonly selectedElementId = signal<string | null>(null);
  public readonly viewMode = signal<ViewMode>('editor');
  public readonly activeFlavor = signal<FlavorName>('html');

  public readonly toolbox = [
    { type: 'input', label: 'Text Field', props: { placeholder: 'Enter text...' } },
    { type: 'button', label: 'Action Button', props: { text: 'Click Me' } },
    { type: 'card', label: 'Content Card', props: { title: 'Card Title' } }
  ];

  public onDrop(event: CdkDragDrop<ComponentNode[]>) {
    if (event.previousContainer === event.container) {
      // Reordering
      const items = [...this.canvasItems()];
      moveItemInArray(items, event.previousIndex, event.currentIndex);
      this.canvasItems.set(items);
    } else {
      // Adding new item from toolbox
      const blueprint = event.previousContainer.data[event.previousIndex];
      const newItem: ComponentNode = {
        ...JSON.parse(JSON.stringify(blueprint)),
        id: `node_${Math.random().toString(36).substring(2, 9)}`
      };
      
      this.canvasItems.update(items => {
        const copy = [...items];
        copy.splice(event.currentIndex, 0, newItem);
        return copy;
      });
    }
  }
}