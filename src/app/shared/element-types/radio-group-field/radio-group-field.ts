import { Component, inject, input } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormElement } from '../../../models/element';
import { FormsModule } from '@angular/forms';
import { ElementService } from '../../../services/element.service';
import { LayoutService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-group-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule],
  templateUrl: './radio-group-field.html',
  styleUrl: './radio-group-field.scss',
})
export class RadioGroupFieldComponent {

  element = input.required<FormElement>();
  elementService = inject(ElementService);
  layoutService = inject(LayoutService);

  public readonly flavor = this.layoutService.activeFlavor;

  updateValue(val: any) {
    this.elementService.updateElement(this.element().id, { value: val });
  }
}
