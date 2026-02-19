import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormElement } from '../../../models/element';
import { FormsModule } from '@angular/forms';
import { ElementService } from '../../../services/element.service';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent {

  element = input.required<FormElement>();
  elementService = inject(ElementService);
  layoutService = inject(LayoutService);

  public readonly flavor = this.layoutService.activeFlavor;

  updateValue(val: any) {
    this.elementService.updateElement(this.element().id, { value: val });
  }
}
