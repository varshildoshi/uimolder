import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray, copyArrayItem, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutService } from '../../services/layout.service';

export interface FormField {
  id: string;
  type: string;
  label: string;
  key: string;
  placeholder?: string;
  required: boolean;
  options?: { label: string; value: string }[]; // For Select/Radio
  width: number; // 50 for half-width, 100 for full
}

export interface FormRow {
  id: string;
  fields: FormField[];
}

interface Flavor {
  id: number;
  name: 'html' | 'material' | 'tailwind';
  label: string;
  iconPath: string;
  color: string;
}

@Component({
  selector: 'app-forge-builder-v2',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, MatIconModule, MatButtonModule],
  templateUrl: './forge-builder-v2.html',
  styleUrl: './forge-builder-v2.scss',
})
export class ForgeBuilderV2 {

  viewMode = signal<'editor' | 'preview'>('editor');
  selectedFlavor = signal<'html' | 'material' | 'tailwind'>('html');
  selectedId = signal<string | null>(null);
  rowIds = computed(() => this.formRows().map(r => r.id));

  private readonly layoutService = inject(LayoutService);
  public readonly headerHeight = this.layoutService.headerHeight;

  // Zoaib-style Row-based Canvas
  formRows = signal<FormRow[]>([
    { id: 'row_initial', fields: [] }
  ]);

  // selectedFlavor = signal<Flavor['name']>('html');

  flavors: Flavor[] = [
    {
      id: 0,
      name: 'html',
      label: 'HTML',
      color: '#e34f26',
      iconPath: 'm3 2 1.578 17.824L12 22l7.467-2.175L21 2H3Zm14.049 6.048H9.075l.172 2.016h7.697l-.626 6.565-4.246 1.381-4.281-1.455-.288-2.932h2.024l.16 1.411 2.4.815 2.346-.763.297-3.005H7.416l-.562-6.05h10.412l-.217 2.017Z'
    },
    {
      id: 1,
      name: 'tailwind',
      label: 'Tailwind',
      color: '#38bdf8',
      iconPath: 'M11.782 5.72a4.773 4.773 0 0 0-4.8 4.173 3.43 3.43 0 0 1 2.741-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.934-2.865 3.137-3.921-.969 1.379-2.44 2.207-4.259 1.231-1.253-.673-2.19-3.438-5.959-3.318ZM6.8 11.979A4.772 4.772 0 0 0 2 16.151a3.431 3.431 0 0 1 2.745-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.933-2.865 3.137-3.921-.97 1.379-2.44 2.208-4.259 1.231-1.253-.673-2.19-3.443-5.963-3.317Z'
    },
    {
      id: 2,
      name: 'material',
      label: 'Material',
      color: '#dd0031',
      iconPath: 'M12 2L3.8 4.9l1.2 10.9L12 21l7-5.2 1.2-10.9L12 2zm0 2l5.1 11.5h-1.9l-1-2.6H9.8l-1 2.6H6.9L12 4zm1.5 7.4L12 7.8l-1.5 3.6h3z'
    }
  ];

  toolbox = [
    { type: 'input', label: 'Text Field', width: 100 },
    { type: 'textarea', label: 'Message Area', width: 100 },
    { type: 'dropdown', label: 'Select Option', width: 50 },
    { type: 'datepicker', label: 'Date Picker', width: 50 },
    { type: 'checkbox', label: 'Agreement', width: 100 },
    { type: 'button', label: 'Submit Button', width: 100 }
  ];

  activeField = computed(() => {
    for (const row of this.formRows()) {
      const field = row.fields.find(f => f.id === this.selectedId());
      if (field) return field;
    }
    return null;
  });

  onDrop(event: CdkDragDrop<any[]>, rowId?: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const fieldBlueprint = event.previousContainer.data[event.previousIndex];
      const newField: FormField = {
        ...fieldBlueprint,
        id: 'f_' + Math.random().toString(36).substr(2, 9),
        key: fieldBlueprint.label.toLowerCase().replace(/ /g, '_'),
        required: false,
        options: fieldBlueprint.type === 'dropdown' ? [{ label: 'Option 1', value: '1' }] : []
      };

      // Add to specific row or create new
      this.formRows.update(rows => rows.map(row => {
        if (row.id === rowId) {
          const newFields = [...row.fields];
          newFields.splice(event.currentIndex, 0, newField);
          return { ...row, fields: newFields };
        }
        return row;
      }));
    }
  }

  // Updated addNewRow to handle unique IDs and standard naming
  addNewRow() {
    const newRow: FormRow = {
      id: 'row_' + Math.random().toString(36).substring(2, 9),
      fields: []
    };
    this.formRows.update(rows => [...rows, newRow]);
  }

  // Element-level removal
  removeField(rowId: string, fieldId: string, event: MouseEvent) {
    event.stopPropagation();
    this.formRows.update(rows => rows.map(row => {
      if (row.id === rowId) {
        return { ...row, fields: row.fields.filter(f => f.id !== fieldId) };
      }
      return row;
    }));
    if (this.selectedId() === fieldId) this.selectedId.set(null);
  }

  exportLayout() {
    const data = JSON.stringify(this.formRows(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uimolder-layout.json';
    a.click();
  }

}
