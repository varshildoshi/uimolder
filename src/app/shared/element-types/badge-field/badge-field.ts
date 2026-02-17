import { Component, inject, input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge-field',
  standalone: true,
  imports: [CommonModule, MatBadgeModule],
  templateUrl: './badge-field.html',
  styleUrl: './badge-field.scss',
})
export class BadgeFieldComponent {

  element = input.required<FormElement>();
  layoutService = inject(LayoutService);

  public readonly flavor = this.layoutService.activeFlavor;
}
