
import { ElementTypeDefinition } from "../models/element"
import { CheckboxFieldComponent } from "../shared/element-types/checkbox-field/checkbox-field"
import { SelectFieldComponent } from "../shared/element-types/select-field/select-field"
import { TextFieldComponent } from "../shared/element-types/text-field/text-field"

// This service manages the definitions of available element types in the form builder. 
// It provides a centralized place to register and retrieve element type information, such as default configurations and associated components.
export const TEXT_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'text',
    elementType: 'formField',
    label: 'Text Field',
    icon: 'text_fields',
    defaultConfig: {
        placeholder: 'Enter text',
        required: false,
        label: 'Text Field',
        value: '',
    },
    elementConfig: [
        { type: 'text', label: 'Label', key: 'label' },
        { type: 'text', label: 'Placeholder', key: 'placeholder' },
        { type: 'checkbox', label: 'Required', key: 'required' },
        {
            type: 'select', key: 'inputType', label: 'Input Type',
            options: [
                { label: 'Text', value: 'text' },
                { label: 'Email', value: 'email' },
                { label: 'Number', value: 'number' },
                { label: 'Phone', value: 'tel' },
            ]
        }
    ],
    component: TextFieldComponent,
}

export const CHECKBOX_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'checkbox',
    elementType: 'formField',
    label: 'Checkbox Group',
    icon: 'check_box',
    defaultConfig: {
        required: false,
        label: 'Checkbox Group',
        alignment: 'vertical',
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
        ]
    },
    elementConfig: [
        { type: 'text', label: 'Label', key: 'label' },
        {
            type: 'select', key: 'alignment', label: 'Alignment',
            options: [
                { label: 'Vertical', value: 'vertical' },
                { label: 'Horizontal', value: 'horizontal' },
            ]
        },
        { type: 'checkbox', label: 'Required', key: 'required' },
        { type: 'dynamic-options', key: 'options', label: 'Checkbox Options' }
    ],
    component: CheckboxFieldComponent
}

export const SELECT_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'select',
    elementType: 'formField',
    label: 'Dropdown',
    icon: 'arrow_drop_down_circle',
    defaultConfig: {
        label: 'Select',
        placeholder: 'Select an option',
        required: false,
        value: '',
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
        ]
    },
    elementConfig: [
        { type: 'text', label: 'Label', key: 'label' },
        { type: 'text', label: 'Placeholder', key: 'placeholder' },
        { type: 'checkbox', label: 'Required', key: 'required' },
        { type: 'dynamic-options', key: 'options', label: 'Dropdown Options' }
    ],
    component: SelectFieldComponent,
}