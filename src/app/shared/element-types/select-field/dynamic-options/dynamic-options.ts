import { Component, input, output } from '@angular/core';
import { OptionsItem } from '../../../../models/element';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dynamic-options',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './dynamic-options.html',
  styleUrl: './dynamic-options.scss',
})
export class DynamicOptions {

  title = input('');
  options = input.required<OptionsItem[]>();
  optionsChange = output<OptionsItem[]>();

  addOptions() {
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions.push({ label: `Option ${newOptions.length + 1}`, value: `option-${newOptions.length + 1}` });
    this.optionsChange.emit(newOptions);
  }

  removeOption(index: number) {
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions.splice(index, 1);
    this.optionsChange.emit(newOptions);
  }

  updateOption(index: number, newLabel: string) {
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions[index] = { ...newOptions[index], label: newLabel };
    this.optionsChange.emit(newOptions);
  }

}
