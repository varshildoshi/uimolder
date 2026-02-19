import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { FormsModule } from '@angular/forms';
import { ElementService } from '../../../services/element.service';
@Component({
  selector: 'app-checkbox-field',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule],
  templateUrl: './checkbox-field.html',
  styleUrl: './checkbox-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxFieldComponent {

  element = input.required<FormElement>();
  layoutService = inject(LayoutService);
  elementService = inject(ElementService);

  public readonly flavor = this.layoutService.activeFlavor;

  updateValue(val: boolean) {
    this.elementService.updateElement(this.element().id, { value: val });
  }
}
