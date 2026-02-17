import { Component, inject, input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { FormsModule } from '@angular/forms';
import { ElementService } from '../../../services/element.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-group-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonToggleModule],
  templateUrl: './button-group-field.html',
  styleUrl: './button-group-field.scss',
})
export class ButtonGroupFieldComponent {

  element = input.required<FormElement>();
  layoutService = inject(LayoutService);
  elementService = inject(ElementService);

  public readonly flavor = this.layoutService.activeFlavor;

  updateValue(val: any) {
    this.elementService.updateElement(this.element().id, { value: val });
  }
}
