import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutService, FlavorName } from '../../services/layout.service';
import { ElementsMenu } from '../elements-menu/elements-menu';
import { ElementsCanvas } from '../elements-canvas/elements-canvas';
import { ElementsSettings } from '../elements-settings/elements-settings';
import { ExportModal } from '../../shared/export-modal/export-modal';

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
  readonly headerHeight = this.layoutService.headerHeight;
  readonly isExportOpen = signal(false);
  readonly viewMode = this.layoutService.viewMode;
  readonly activeFlavor = this.layoutService.activeFlavor;

  readonly flavors: Flavor[] = [
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

  exportLayout() {
    this.isExportOpen.set(true);
  }
}
