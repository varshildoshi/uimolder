import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ElementFormField } from '../element-form-field/element-form-field';
import { ElementService } from '../../../../services/element.service';
import { ElementTypeDefinition, FormElement } from '../../../../models/element';

@Component({
  selector: 'app-element-editor',
  standalone: true,
  imports: [DragDropModule, ElementFormField],
  templateUrl: './element-editor.html',
  styleUrl: './element-editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementEditor {

  elementService = inject(ElementService);

  onDropInRow(event: CdkDragDrop<string>, rowId: string) {
    if (event.container.id !== rowId) return;

    if (event.previousContainer.data === 'element-selector') {
      const elementType = event.item.data as ElementTypeDefinition;
      
      // Deep clone and regenerate IDs for nested rows
      const elementConfig = JSON.parse(JSON.stringify(elementType.defaultConfig));
      if (elementConfig.nestedRows) {
        elementConfig.nestedRows.forEach((r: any) => r.id = crypto.randomUUID());
      }

      const newElement: FormElement = {
        id: crypto.randomUUID(),
        type: elementType.type,
        ...elementConfig
      };
      this.elementService.addElementToRow(newElement, rowId, event.currentIndex);
      return; // Ignore drops from the element selector
    }

    const dragData = event.item.data as FormElement;
    const previousRowId = event.previousContainer.data as string;

    this.elementService.moveElement(dragData.id, previousRowId, rowId, event.currentIndex);
  }

}
