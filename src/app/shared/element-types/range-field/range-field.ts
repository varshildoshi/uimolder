import { Component, inject, input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { FormsModule } from '@angular/forms';
import { ElementService } from '../../../services/element.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-range-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSliderModule],
  templateUrl: './range-field.html',
  styleUrl: './range-field.scss',
})
export class RangeFieldComponent {

  element = input.required<FormElement>();
  layoutService = inject(LayoutService);
  elementService = inject(ElementService);

  public readonly flavor = this.layoutService.activeFlavor;

  updateValue(val: number) {
    this.elementService.updateElement(this.element().id, { value: val });
  }
}
