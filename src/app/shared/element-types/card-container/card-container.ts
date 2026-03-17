import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormElement, ElementTypeDefinition } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';
import { ElementService } from '../../../services/element.service';
import { CdkDrag, CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { FieldPreview } from '../../../components/elements-canvas/components/field-preview/field-preview';
// We use forwardRef or dynamic import to avoid circular dependency if needed, 
// but since we are using them in templates and they are standalone, it's usually fine.
import { ElementFormField } from '../../../components/elements-canvas/components/element-form-field/element-form-field';

@Component({
  selector: 'app-card-container',
  standalone: true,
  imports: [CommonModule, MatCardModule, DragDropModule, FieldPreview, ElementFormField],
  templateUrl: './card-container.html',
  styleUrl: './card-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContainerComponent {

  element = input.required<FormElement>();
  layoutService = inject(LayoutService);
  elementService = inject(ElementService);

  readonly flavor = this.layoutService.activeFlavor;
  readonly viewMode = this.layoutService.viewMode;

  onRowMouseEnter(rowId: string) {
    if (this.elementService.currentlyDraggedItem()) {
      this.elementService.currentlyHoveredRowId.set(rowId);
    }
  }

  onRowMouseLeave() {
    this.elementService.currentlyHoveredRowId.set(null);
  }

  canDropInRow = (rowId: string) => {
    return (drag: CdkDrag) => {
      // 1. If any child row of this row is currently hovered, this row should not accept the drop
      if (this.elementService.isAnyChildHovered(rowId)) {
        return false;
      }

      return true;
    };
  }

  // Header configs (same as Heading component)
  level = computed(() => this.element().level || 'h4');
  headerTextAlign = computed(() => this.element().textAlign || 'left');

  // Card configs
  cardAlignment = computed(() => this.element().alignment || 'center');
  cardSize = computed(() => this.element().size || 'lg');

  onDropInside(event: CdkDragDrop<string>, rowId: string) {
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
      return;
    }

    const dragData = event.item.data as FormElement;
    const previousContainerId = event.previousContainer.data as string;

    this.elementService.moveElement(dragData.id, previousContainerId, rowId, event.currentIndex);
  }
}
