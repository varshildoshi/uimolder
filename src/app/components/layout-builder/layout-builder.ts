import { ChangeDetectionStrategy, Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutService } from '../../services/layout.service';
import { ElementsMenu } from '../elements-menu/elements-menu';
import { ElementsCanvas } from '../elements-canvas/elements-canvas';
import { ElementsSettings } from '../elements-settings/elements-settings';
import { ExportModal } from '../../shared/export-modal/export-modal';

export interface ComponentNode {
  id: string;
  type: string;
  label: string;
  props: any;
  children?: ComponentNode[];
}

export interface FormRow {
  id: string;
  fields: ComponentNode[];
}

export type ViewMode = 'editor' | 'preview';
export type FlavorName = 'html' | 'tailwind' | 'material';

export interface Flavor {
  name: FlavorName;
  label: string;
  iconPath: string;
  color: string;
}

@Component({
  selector: 'app-layout-builder',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    ElementsMenu,
    ElementsCanvas,
    ElementsSettings,
    ExportModal
  ],
  templateUrl: './layout-builder.html',
  styleUrl: './layout-builder.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutBuilder {
  private readonly layoutService = inject(LayoutService);
  public readonly headerHeight = this.layoutService.headerHeight;

  public readonly isExportOpen = signal(false);

  public readonly formRows = signal<FormRow[]>([
    { id: 'row_initial', fields: [] }
  ]);
  public readonly rowIds = computed(() => this.formRows().map(r => r.id));
  public readonly selectedElementId = signal<string | null>(null);
  public readonly viewMode = this.layoutService.viewMode;

  public readonly activeFlavor = this.layoutService.activeFlavor;

  public readonly flavors: Flavor[] = [
    {
      name: 'html',
      label: 'HTML',
      color: '#e34f26',
      iconPath: 'm3 2 1.578 17.824L12 22l7.467-2.175L21 2H3Zm14.049 6.048H9.075l.172 2.016h7.697l-.626 6.565-4.246 1.381-4.281-1.455-.288-2.932h2.024l.16 1.411 2.4.815 2.346-.763.297-3.005H7.416l-.562-6.05h10.412l-.217 2.017Z'
    },
    {
      name: 'tailwind',
      label: 'Tailwind',
      color: '#38bdf8',
      iconPath: 'M11.782 5.72a4.773 4.773 0 0 0-4.8 4.173 3.43 3.43 0 0 1 2.741-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.934-2.865 3.137-3.921-.969 1.379-2.44 2.207-4.259 1.231-1.253-.673-2.19-3.438-5.959-3.318ZM6.8 11.979A4.772 4.772 0 0 0 2 16.151a3.431 3.431 0 0 1 2.745-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.933-2.865 3.137-3.921-.97 1.379-2.44 2.208-4.259 1.231-1.253-.673-2.19-3.443-5.963-3.317Z'
    },
    {
      name: 'material',
      label: 'Material',
      color: '#dd0031',
      iconPath: 'M12 2L3.8 4.9l1.2 10.9L12 21l7-5.2 1.2-10.9L12 2zm0 2l5.1 11.5h-1.9l-1-2.6H9.8l-1 2.6H6.9L12 4zm1.5 7.4L12 7.8l-1.5 3.6h3z'
    }
  ];

  public readonly activeComponent = computed(() => {
    for (const row of this.formRows()) {
      const item = row.fields.find(i => i.id === this.selectedElementId());
      if (item) return item;
    }
    return null;
  });

  public onDrop(event: CdkDragDrop<ComponentNode[]>, rowId: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.id === 'toolbox-list') {
      const blueprint = event.previousContainer.data[event.previousIndex];
      const newItem: ComponentNode = {
        ...JSON.parse(JSON.stringify(blueprint)),
        id: `node_${Math.random().toString(36).substring(2, 9)}`,
        props: { ...blueprint.props, value: '' }
      };

      this.formRows.update(rows => rows.map(row => {
        if (row.id === rowId) {
          const newFields = [...row.fields];
          newFields.splice(event.currentIndex, 0, newItem);
          return { ...row, fields: newFields };
        }
        return row;
      }));
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.formRows.set([...this.formRows()]);
    }
  }

  public addNewRow() {
    const newRow: FormRow = {
      id: 'row_' + Math.random().toString(36).substring(2, 9),
      fields: []
    };
    this.formRows.update(rows => [...rows, newRow]);
  }

  public removeRow(rowId: string) {
    if (this.formRows().length > 1) {
      this.formRows.update(rows => rows.filter(r => r.id !== rowId));
    }
  }

  public updateProp(key: string, val: any) {
    this.formRows.update(rows => rows.map(row => ({
      ...row,
      fields: row.fields.map(i => i.id === this.selectedElementId() ? { ...i, props: { ...i.props, [key]: val } } : i)
    })));
  }

  public updateLabel(val: string) {
    this.formRows.update(rows => rows.map(row => ({
      ...row,
      fields: row.fields.map(i => i.id === this.selectedElementId() ? { ...i, label: val } : i)
    })));
  }

  public removeItem(id: string) {
    this.formRows.update(rows => rows.map(row => ({
      ...row,
      fields: row.fields.filter(i => i.id !== id)
    })));
    if (this.selectedElementId() === id) this.selectedElementId.set(null);
  }

    public exportLayout() {
      this.isExportOpen.set(true);
    }
  }
  