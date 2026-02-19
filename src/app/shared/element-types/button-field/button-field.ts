import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-button-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-field.html',
  styleUrl: './button-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFieldComponent {
  element = input.required<FormElement>();
  layoutService = inject(LayoutService);

  public readonly flavor = this.layoutService.activeFlavor;
}
