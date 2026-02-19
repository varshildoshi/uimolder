import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementService } from '../../../services/element.service';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './select-field.html',
  styleUrl: './select-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFieldComponent {

  element = input.required<FormElement>();
  layoutService = inject(LayoutService);
  elementService = inject(ElementService);

  public readonly flavor = this.layoutService.activeFlavor;

  updateValue(val: any) {
    this.elementService.updateElement(this.element().id, { value: val });
  }
}
