import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { FormElement } from '../../../models/element';
import { LayoutService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heading-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heading-field.html',
  styleUrl: './heading-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingFieldComponent {

  element = input.required<FormElement>();
  layoutService = inject(LayoutService);

  public readonly flavor = this.layoutService.activeFlavor;

  level = computed(() => this.element().level || 'h2');
  textAlign = computed(() => this.element().textAlign || 'left');
}
