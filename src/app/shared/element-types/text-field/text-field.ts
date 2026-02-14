import { Component, inject, input } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ElementConfigDefinition, FormElement } from '../../../models/element';
import { FormsModule } from '@angular/forms';
import { ElementService } from '../../../services/element.service';

@Component({
  selector: 'app-text-field',
  imports: [FormsModule, MatFormField, MatInputModule],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
})
export class TextFieldComponent {

  element = input.required<FormElement>();
  isConfig = input.required<boolean>();
  configElement = input.required<ElementConfigDefinition>();
  elementService = inject(ElementService);

}
