import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ElementTypesService } from '../../../../services/element-types.service';
import { FormElement } from '../../../../models/element';

@Component({
  selector: 'app-field-preview',
  imports: [NgComponentOutlet],
  templateUrl: './field-preview.html',
  styleUrl: './field-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldPreview {

  element = input.required<FormElement>();
  elementTypeService = inject(ElementTypesService);

  previewComponent = computed(() => {
    const type = this.elementTypeService.getElementType(this.element().type);
    return type?.component ?? null;
  });

}
