import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { ElementTypesService } from '../../services/element-types.service';
import { ElementButton } from "./element-button/element-button";

@Component({
  selector: 'app-elements-menu',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatIconModule, ElementButton],
  host: {
    'class': 'block h-full'
  },
  templateUrl: './elements-menu.html',
  styleUrl: './elements-menu.scss'
})
export class ElementsMenu {

  elementTypesService = inject(ElementTypesService);
  elementTypes = this.elementTypesService.getAllElementsTypes();

  public readonly rowIds = input<string[]>([]);

  public readonly categories = [
    {
      name: 'General',
      elements: ['heading']
    },
    {
      name: 'Forms',
      elements: ['text', 'textarea', 'checkbox', 'radio', 'select', 'datepicker']
    },
    {
      name: 'Components',
      elements: ['card', 'button', 'buttonsgroup']
    }
  ];

  getElementsByCategory(elements: string[]) {
    return this.elementTypes.filter(e => elements.includes(e.type));
  }

  noDropAllowed(item: CdkDrag<any>) {
    return false;
  }
}