import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { ElementService } from '../../../services/element.service';

@Component({
  selector: 'app-submit-cancel-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './submit-cancel-field.html',
  styleUrl: './submit-cancel-field.scss',
})
export class SubmitCancelFieldComponent {
  element = input.required<FormElement>();
  layoutService = inject(LayoutService);
  elementService = inject(ElementService);

  public readonly flavor = this.layoutService.activeFlavor;
}
