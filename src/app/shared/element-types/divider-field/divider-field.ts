import { Component, inject, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-divider-field',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './divider-field.html',
  styleUrl: './divider-field.scss',
})
export class DividerFieldComponent {

  element = input.required<FormElement>();
  layoutService = inject(LayoutService);

  public readonly flavor = this.layoutService.activeFlavor;
}
