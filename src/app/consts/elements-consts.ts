import { ElementTypeDefinition } from "../models/element"
import { CheckboxFieldComponent } from "../shared/element-types/checkbox-field/checkbox-field"
import { SelectFieldComponent } from "../shared/element-types/select-field/select-field"
import { TextFieldComponent } from "../shared/element-types/text-field/text-field"
import { TextareaFieldComponent } from "../shared/element-types/textarea-field/textarea-field"
import { RadioGroupFieldComponent } from "../shared/element-types/radio-group-field/radio-group-field"
import { DatepickerFieldComponent } from "../shared/element-types/datepicker-field/datepicker-field"
import { HeadingFieldComponent } from "../shared/element-types/heading-field/heading-field"
import { ButtonFieldComponent } from "../shared/element-types/button-field/button-field"
import { ButtonGroupFieldComponent } from "../shared/element-types/button-group-field/button-group-field"
import { CardContainerComponent } from "../shared/element-types/card-container/card-container"
import { ToggleFieldComponent } from "../shared/element-types/toggle-field/toggle-field"
import { BadgeFieldComponent } from "../shared/element-types/badge-field/badge-field"
import { IconFieldComponent } from "../shared/element-types/icon-field/icon-field"
import { DividerFieldComponent } from "../shared/element-types/divider-field/divider-field"
import { RangeFieldComponent } from "../shared/element-types/range-field/range-field"

export const RANGE_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'range',
    elementType: 'formField',
    label: 'Range Slider',
    icon: 'linear_scale',
    defaultConfig: {
        label: 'Select Value',
        required: false,
        min: 0,
        max: 100,
        step: 1,
        value: 50
    },
    elementConfig: [
        { type: 'text', label: 'Label', key: 'label' },
        { type: 'number', label: 'Minimum', key: 'min' },
        { type: 'number', label: 'Maximum', key: 'max' },
        { type: 'number', label: 'Step', key: 'step' },
    ],
    component: RangeFieldComponent
}

export const DIVIDER_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'divider',
    elementType: 'displayField',
    label: 'Divider',
    icon: 'horizontal_rule',
    defaultConfig: {
        label: 'Divider',
        required: false
    },
    elementConfig: [
        { type: 'text', label: 'Label (Reference)', key: 'label' }
    ],
    component: DividerFieldComponent
}

export const ICON_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'icon',
    elementType: 'displayField',
    label: 'UI Icon',
    icon: 'sentiment_satisfied',
    defaultConfig: {
        icon: 'face',
        size: 24,
        color: 'primary',
        textAlign: 'left',
        required: false
    },
    elementConfig: [
        { type: 'text', label: 'Icon Name (Material)', key: 'icon' },
        { type: 'number', label: 'Size (px)', key: 'size' },
        {
            type: 'select', key: 'color', label: 'Color',
            options: [
                { label: 'Primary (Gold)', value: 'primary' },
                { label: 'Secondary (Slate)', value: 'secondary' },
                { label: 'Inherit', value: 'inherit' },
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
    component: IconFieldComponent
}

export const BADGE_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'badge',
    elementType: 'displayField',
    label: 'Status Badge',
    icon: 'label',
    defaultConfig: {
        label: 'ACTIVE',
        placeholder: 'Status',
        color: 'primary',
        required: false
    },
    elementConfig: [
        { type: 'text', label: 'Badge Text', key: 'label' },
        {
            type: 'select', key: 'color', label: 'Color',
            options: [
                { label: 'Primary (Gold)', value: 'primary' },
                { label: 'Secondary (Slate)', value: 'secondary' },
            ]
        }
    ],
    component: BadgeFieldComponent
}

export const TOGGLE_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'toggle',
    elementType: 'formField',
    label: 'Switch Toggle',
    icon: 'toggle_on',
    defaultConfig: {
        label: 'Enable Feature',
        required: false,
        value: false,
        onLabel: 'Enabled',
        offLabel: 'Disabled'
    },
    elementConfig: [
        { type: 'text', label: 'Label', key: 'label' },
        { type: 'text', label: 'On Label', key: 'onLabel' },
        { type: 'text', label: 'Off Label', key: 'offLabel' },
        { type: 'checkbox', label: 'Required', key: 'required' },
    ],
    component: ToggleFieldComponent
}

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

export const BUTTON_GROUP_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'buttongroup',
    elementType: 'formField',
    label: 'Button Group',
    icon: 'view_week',
    defaultConfig: {
        label: 'Select Action',
        required: false,
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
        ]
    },
    elementConfig: [
        { type: 'text', label: 'Label', key: 'label' },
        { type: 'checkbox', label: 'Required', key: 'required' },
        { type: 'dynamic-options', key: 'options', label: 'Group Options' }
    ],
    component: ButtonGroupFieldComponent
}

export const BUTTON_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'button',
    elementType: 'actionField',
    label: 'Button',
    icon: 'smart_button',
    defaultConfig: {
        label: 'Click Me',
        variant: 'primary',
        textAlign: 'left',
        required: false
    },
    elementConfig: [
        { type: 'text', label: 'Label', key: 'label' },
        {
            type: 'select', key: 'variant', label: 'Style',
            options: [
                { label: 'Primary (Gold)', value: 'primary' },
                { label: 'Secondary (Slate)', value: 'secondary' },
                { label: 'Outline', value: 'outline' },
                { label: 'Ghost', value: 'ghost' },
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
    component: ButtonFieldComponent
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
