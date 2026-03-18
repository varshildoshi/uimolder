import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { ElementTypesService } from '../../services/element-types.service';
import { ElementService } from '../../services/element.service';
import { ElementButton } from "./element-button/element-button";
import { LayoutService } from '../../services/layout.service';

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
  elementService = inject(ElementService);
  elementTypes = this.elementTypesService.getAllElementsTypes();
  viewMode = inject(LayoutService).viewMode;

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
      elements: ['card', 'button', 'buttons-group']
    }
  ];

  getElementsByCategory(elements: string[]) {
    return this.elementTypes.filter(e => elements.includes(e.type));
  }

  noDropAllowed(item: CdkDrag<any>) {
    return false;
  }
}