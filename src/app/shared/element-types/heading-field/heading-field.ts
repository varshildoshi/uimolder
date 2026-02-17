import { Component, inject, input } from '@angular/core';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heading-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heading-field.html',
  styleUrl: './heading-field.scss',
})
export class HeadingFieldComponent {

  element = input.required<FormElement>();
  layoutService = inject(LayoutService);

  public readonly flavor = this.layoutService.activeFlavor;
}
