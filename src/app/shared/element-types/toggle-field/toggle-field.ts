import { Component, inject, input } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { FormsModule } from '@angular/forms';
import { ElementService } from '../../../services/element.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSlideToggleModule],
  templateUrl: './toggle-field.html',
  styleUrl: './toggle-field.scss',
})
export class ToggleFieldComponent {

  element = input.required<FormElement>();
  layoutService = inject(LayoutService);
  elementService = inject(ElementService);

  public readonly flavor = this.layoutService.activeFlavor;

  updateValue(val: boolean) {
    this.elementService.updateElement(this.element().id, { value: val });
  }
}
