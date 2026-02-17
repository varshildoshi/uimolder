import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-field',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './button-field.html',
  styleUrl: './button-field.scss',
})
export class ButtonFieldComponent {

  element = input.required<FormElement>();
  layoutService = inject(LayoutService);

  public readonly flavor = this.layoutService.activeFlavor;
}
