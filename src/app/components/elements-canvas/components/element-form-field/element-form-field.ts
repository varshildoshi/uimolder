import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { FormElement } from '../../../../models/element';
import { TitleCasePipe } from '@angular/common';
import { ElementService } from '../../../../services/element.service';
import { FieldPreview } from '../field-preview/field-preview';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutService } from '../../../../services/layout.service';

@Component({
  selector: 'app-element-form-field',
  imports: [FieldPreview, DragDropModule],
  templateUrl: './element-form-field.html',
  styleUrl: './element-form-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementFormField {

  element = input.required<FormElement>();
  elementService = inject(ElementService);
  viewMode = inject(LayoutService).viewMode;

  selectElement(e: Event) {
    e.stopPropagation();
    this.elementService.setSelectedElement(this.element().id);
  }

  deleteElement(e: Event) {
    e.stopPropagation();
    this.elementService.deleteElementFromRow(this.element().id);
  }

}
