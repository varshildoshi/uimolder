import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { ElementTypesService } from '../../services/element-types.service';
import { ElementButton } from "./element-button/element-button";

@Component({
  selector: 'app-elements-menu',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatIconModule, ElementButton],
  host: {
    'class': 'block h-full'
  },
  templateUrl: './elements-menu.html',
  styleUrl: './elements-menu.scss'
})
export class ElementsMenu {

  elementTypesService = inject(ElementTypesService);
  elementTypes = this.elementTypesService.getAllElementsTypes();

  public readonly rowIds = input<string[]>([]);

  public readonly toolbox = [
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

  noDropAllowed(item: CdkDrag<any>) {
    return false;
  }
}