import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormElement } from '../../../models/element';
import { FormsModule } from '@angular/forms';
import { ElementService } from '../../../services/element.service';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-textarea-field',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './textarea-field.html',
  styleUrl: './textarea-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaFieldComponent {

  element = input.required<FormElement>();
  elementService = inject(ElementService);
  layoutService = inject(LayoutService);

  public readonly flavor = this.layoutService.activeFlavor;

  updateValue(val: any) {
    this.elementService.updateElement(this.element().id, { value: val });
  }
}
