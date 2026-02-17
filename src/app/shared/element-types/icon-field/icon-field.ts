import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-field',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './icon-field.html',
  styleUrl: './icon-field.scss',
})
export class IconFieldComponent {

  element = input.required<FormElement>();
  layoutService = inject(LayoutService);

  public readonly flavor = this.layoutService.activeFlavor;
}
