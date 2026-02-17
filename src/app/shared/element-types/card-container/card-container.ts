import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';
import { ElementService } from '../../../services/element.service';

@Component({
  selector: 'app-card-container',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './card-container.html',
  styleUrl: './card-container.scss',
})
export class CardContainerComponent {

  element = input.required<FormElement>();
  layoutService = inject(LayoutService);
  elementService = inject(ElementService);

  public readonly flavor = this.layoutService.activeFlavor;
}
