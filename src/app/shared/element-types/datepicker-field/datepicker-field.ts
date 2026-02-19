import { ChangeDetectionStrategy, Component, inject, input, effect, computed } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { FormElement } from '../../../models/element';
import { FormsModule } from '@angular/forms';
import { ElementService } from '../../../services/element.service';
import { LayoutService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-datepicker-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatIconModule],
  templateUrl: './datepicker-field.html',
  styleUrl: './datepicker-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerFieldComponent {

  element = input.required<FormElement>();
  elementService = inject(ElementService);
  layoutService = inject(LayoutService);
  private dateAdapter = inject(DateAdapter);

  public readonly flavor = this.layoutService.activeFlavor;

  // Manual display format for consistency across all browsers
  formattedDate = computed(() => {
    const val = this.element().value;
    if (!val) return '';
    const date = this.parseDate(val);
    if (isNaN(date.getTime())) return '';
    
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  });

  // ISO date required for native <input type="date"> sync
  isoDate = computed(() => {
    const val = this.element().value;
    if (!val) return '';
    const date = this.parseDate(val);
    if (isNaN(date.getTime())) return '';
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  constructor() {
    this.dateAdapter.setLocale('en-GB'); // Ensures DD/MM/YYYY in Material
  }

  private parseDate(val: any): Date {
    if (val instanceof Date) return val;
    if (typeof val === 'string') {
      if (val.includes('-')) { // YYYY-MM-DD
        const [y, m, d] = val.split('-');
        return new Date(+y, +m - 1, +d);
      }
      if (val.includes('/')) { // DD/MM/YYYY
        const [d, m, y] = val.split('/');
        return new Date(+y, +m - 1, +d);
      }
    }
    return new Date(val);
  }

  updateValue(val: any) {
    this.elementService.updateElement(this.element().id, { value: val });
  }
}
