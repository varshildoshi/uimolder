import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutService } from '../../services/layout.service';

interface ForgeComponent {
  id: string;
  type: string;
  label: string;
  props: any;
}

interface Flavor {
  id: number;
  name: 'html' | 'material' | 'tailwind';
  label: string;
  iconPath: string;
  color: string;
}

@Component({
  selector: 'app-forge-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, MatIconModule, MatButtonModule],
  templateUrl: './forge-builder.html',
  styleUrl: './forge-builder.scss',
})
export class ForgeBuilder {

  private readonly layoutService = inject(LayoutService);
  public readonly headerHeight = this.layoutService.headerHeight;

  // The 3 Flavors
  selectedFlavor = signal<Flavor['name']>('html');

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

  // Toolbox Blueprints
  toolbox = [
    { type: 'heading', label: 'Section Heading', props: { text: 'New Section', level: 'h2' } },
    { type: 'input', label: 'Text Field', props: { placeholder: 'Enter text...', required: false } },
    { type: 'textarea', label: 'Text Area', props: { placeholder: 'Enter long description...', rows: 4 } },
    { type: 'dropdown', label: 'Select Menu', props: { options: ['Option 1', 'Option 2'], placeholder: 'Choose...' } },
    { type: 'checkbox', label: 'Toggle/Check', props: { checked: false, text: 'Accept Terms' } },
    { type: 'radio', label: 'Radio Group', props: { options: ['Yes', 'No'], selected: 'Yes' } },
    { type: 'datepicker', label: 'Date Picker', props: { placeholder: 'Pick a date' } },
    { type: 'button', label: 'Action Button', props: { text: 'Click Me', color: 'primary' } },
    { type: 'buttongroup', label: 'Button Group', props: { buttons: ['Save', 'Cancel'] } },
    { type: 'card', label: 'Content Card', props: { text: 'Card content goes here...' } }
  ];

  // Canvas State
  canvasItems = signal<ForgeComponent[]>([]);
  selectedId = signal<string | null>(null);

  // Inspector Logic
  activeComponent = computed(() => this.canvasItems().find(i => i.id === this.selectedId()));

  // Inside ForgeBuilder class
  viewMode = signal<'editor' | 'preview'>('editor');

  // Code Generation Engine (The 3 Flavors)
  generatedCode = computed(() => {
    const flavor = this.selectedFlavor();
    const items = this.canvasItems();
    if (items.length === 0) return '';

    return items.map(item => {
      if (flavor === 'html') {
        return `<ui-field [label]="${item.label}" [html]="${item.id}" />`;
      } else if (flavor === 'material') {
        switch (item.type) {
          case 'heading': return `<h2 class="mat-headline-medium">${item.label}</h2>`;
          case 'textarea': return `<mat-form-field class="w-full">\n  <mat-label>${item.label}</mat-label>\n  <textarea matInput rows="${item.props.rows}"></textarea>\n</mat-form-field>`;
          case 'dropdown': return `<mat-form-field class="w-full">\n  <mat-label>${item.label}</mat-label>\n  <mat-select>\n    <mat-option value="1">Option 1</mat-option>\n  </mat-select>\n</mat-form-field>`;
          case 'checkbox': return `<mat-checkbox>${item.label}</mat-checkbox>`;
          case 'datepicker': return `<mat-form-field class="w-full">\n  <mat-label>${item.label}</mat-label>\n  <input matInput [matDatepicker]="picker">\n  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>\n  <mat-datepicker #picker></mat-datepicker>\n</mat-form-field>`;
          case 'radio': return `<mat-radio-group>\n  <mat-radio-button value="1">Yes</mat-radio-button>\n  <mat-radio-button value="2">No</mat-radio-button>\n</mat-radio-group>`;
          default: return `<ui-field [label]="${item.label}" />`;
        }
      } else {
        return `<div class="p-4 border border-brand-gold bg-slate-900">
  <p class="text-white font-mono">${item.label}</p>
</div>`;
      }
    }).join('\n\n');
  });

  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      const newArr = [...this.canvasItems()];
      moveItemInArray(newArr, event.previousIndex, event.currentIndex);
      this.canvasItems.set(newArr);
    } else {
      const newItem = {
        ...JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex])),
        id: `molder_${Math.random().toString(36).substring(2, 7)}`
      };
      this.canvasItems.update(items => {
        const copy = [...items];
        copy.splice(event.currentIndex, 0, newItem);
        return copy;
      });
    }
  }

  updateProp(key: string, val: any) {
    this.canvasItems.update(items => items.map(i => i.id === this.selectedId() ? { ...i, props: { ...i.props, [key]: val } } : i));
  }

  updateLabel(val: string) {
    this.canvasItems.update(items => items.map(i => i.id === this.selectedId() ? { ...i, label: val } : i));
  }

  removeItem(id: string, event: MouseEvent) {
    event.stopPropagation();
    this.canvasItems.update(items => items.filter(i => i.id !== id));
    if (this.selectedId() === id) this.selectedId.set(null);
  }

  exportProject() {
    const data = JSON.stringify(this.canvasItems(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `uimolder-forge-${Date.now()}.json`;
    link.click();
  }
}
