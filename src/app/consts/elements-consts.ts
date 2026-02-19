import { ElementTypeDefinition } from "../models/element"
import { CheckboxFieldComponent } from "../shared/element-types/checkbox-field/checkbox-field"
import { SelectFieldComponent } from "../shared/element-types/select-field/select-field"
import { TextFieldComponent } from "../shared/element-types/text-field/text-field"
import { TextareaFieldComponent } from "../shared/element-types/textarea-field/textarea-field"
import { RadioGroupFieldComponent } from "../shared/element-types/radio-group-field/radio-group-field"
import { DatepickerFieldComponent } from "../shared/element-types/datepicker-field/datepicker-field"
import { HeadingFieldComponent } from "../shared/element-types/heading-field/heading-field"
import { ButtonsGroupComponent } from "../shared/element-types/buttons-group/buttons-group"
import { CardContainerComponent } from "../shared/element-types/card-container/card-container"

export const CARD_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'card',
    elementType: 'layoutField',
    label: 'Card Container',
    icon: 'view_quilt',
    defaultConfig: {
        label: 'Card Header',
        required: false,
        children: []
    },
    elementConfig: [
        { type: 'text', label: 'Card Header', key: 'label' },
    ],
    component: CardContainerComponent
}

export const HEADING_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'heading',
    elementType: 'displayField',
    label: 'Heading',
    icon: 'title',
    defaultConfig: {
        label: 'New Section',
        level: 'h2',
        textAlign: 'left',
        required: false
    },
    elementConfig: [
        { type: 'text', label: 'Text', key: 'label' },
        {
            type: 'select', key: 'level', label: 'Level',
            options: [
                { label: 'H1 - Hero', value: 'h1' },
                { label: 'H2 - Section', value: 'h2' },
                { label: 'H3 - Subsection', value: 'h3' },
                { label: 'H4 - Card Title', value: 'h4' },
                { label: 'H5 - Small', value: 'h5' },
                { label: 'H6 - Tiny', value: 'h6' },
            ]
        },
        {
            type: 'select', key: 'textAlign', label: 'Alignment',
            options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
            ]
        }
    ],
    component: HeadingFieldComponent
}

export const BUTTONS_GROUP_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'buttons-group',
    elementType: 'actionField',
    label: 'Buttons',
    icon: 'smart_button',
    defaultConfig: {
        primaryLabel: 'Submit',
        secondaryLabel: 'Cancel',
        showSecondary: true,
        textAlign: 'right',
        required: false
    },
    elementConfig: [
        { type: 'text', label: 'Submit Button Text', key: 'primaryLabel' },
        { type: 'text', label: 'Cancel Button Text', key: 'secondaryLabel' },
        { type: 'checkbox', label: 'Show Cancel Button', key: 'showSecondary' },
        {
            type: 'select', key: 'textAlign', label: 'Alignment',
            options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
            ]
        }
    ],
    component: ButtonsGroupComponent
}

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

export const TEXTAREA_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'textarea',
    elementType: 'formField',
    label: 'Textarea',
    icon: 'notes',
    defaultConfig: {
        placeholder: 'Enter long text',
        required: false,
        label: 'Textarea',
        rows: 3,
        value: '',
    },
    elementConfig: [
        { type: 'text', label: 'Label', key: 'label' },
        { type: 'text', label: 'Placeholder', key: 'placeholder' },
        { type: 'number', label: 'Rows', key: 'rows' },
        { type: 'checkbox', label: 'Required', key: 'required' },
    ],
    component: TextareaFieldComponent,
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

export const RADIO_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'radio',
    elementType: 'formField',
    label: 'Radio Group',
    icon: 'radio_button_checked',
    defaultConfig: {
        required: false,
        label: 'Radio Group',
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
        { type: 'dynamic-options', key: 'options', label: 'Radio Options' }
    ],
    component: RadioGroupFieldComponent
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

export const DATEPICKER_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'datepicker',
    elementType: 'formField',
    label: 'Datepicker',
    icon: 'calendar_today',
    defaultConfig: {
        label: 'Datepicker',
        placeholder: 'Select a date',
        required: false,
        value: ''
    },
    elementConfig: [
        { type: 'text', label: 'Label', key: 'label' },
        { type: 'text', label: 'Placeholder', key: 'placeholder' },
        { type: 'checkbox', label: 'Required', key: 'required' },
    ],
    component: DatepickerFieldComponent,
}
