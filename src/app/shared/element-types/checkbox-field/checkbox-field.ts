import { Component, input } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormElement } from '../../../models/element';

@Component({
  selector: 'app-checkbox-field',
  imports: [MatCheckbox],
  templateUrl: './checkbox-field.html',
  styleUrl: './checkbox-field.scss',
})
export class CheckboxFieldComponent {

  element = input.required<FormElement>();

}
