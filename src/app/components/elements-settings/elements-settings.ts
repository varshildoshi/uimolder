import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementService } from '../../services/element.service';
import { ElementTypesService } from '../../services/element-types.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { DynamicOptions } from "../../shared/element-types/select-field/dynamic-options/dynamic-options";

@Component({
  selector: 'app-elements-settings',
  standalone: true,
  imports: [FormsModule, MatFormField, MatInputModule, MatCheckboxModule, MatOptionModule, MatSelectModule, DynamicOptions],
  host: {
    'class': 'block h-full'
  },
  templateUrl: './elements-settings.html',
  styleUrl: './elements-settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsSettings {

  elementService = inject(ElementService);
  elementTypesService = inject(ElementTypesService);

  elementConfigs = computed(() => {
    const element = this.elementService.selectedElement();
    if (!element) return [];

    const elementDef = this.elementTypesService.getElementType(element.type);
    return elementDef?.elementConfig || [];
  });

  elementValues = computed(() => {
    const element = this.elementService.selectedElement();
    if (!element) return {};
    return element as any; // Type assertion to access dynamic properties
  });

  updateElement(elementId: string, key: string, value: any) {
    this.elementService.updateElement(elementId, { [key]: value });
  }

}