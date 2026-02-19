import { ElementTypeDefinition } from "../models/element"
import { CheckboxFieldComponent } from "../shared/element-types/checkbox-field/checkbox-field"
import { SelectFieldComponent } from "../shared/element-types/select-field/select-field"
import { TextFieldComponent } from "../shared/element-types/text-field/text-field"
import { TextareaFieldComponent } from "../shared/element-types/textarea-field/textarea-field"
import { RadioGroupFieldComponent } from "../shared/element-types/radio-group-field/radio-group-field"
import { DatepickerFieldComponent } from "../shared/element-types/datepicker-field/datepicker-field"
import { HeadingFieldComponent } from "../shared/element-types/heading-field/heading-field"
import { ButtonFieldComponent } from "../shared/element-types/button-field/button-field"
import { ButtonsGroupComponent } from "../shared/element-types/buttons-group/buttons-group"
import { CardContainerComponent } from "../shared/element-types/card-container/card-container"

export const BUTTON_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'button',
    elementType: 'actionField',
    label: 'Button (Single)',
    icon: 'smart_button',
    defaultConfig: {
        label: 'Click Me',
        textAlign: 'right',
        required: false
    },
    elementConfig: [
        { type: 'text', label: 'Button Text', key: 'label' },
        {
            type: 'select', key: 'textAlign', label: 'Alignment',
            options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
            ]
        }
    ],
    component: ButtonFieldComponent,
    getTemplate: (el, flavor, useExternal) => {
        const justify = el.textAlign === 'left' ? 'start' : (el.textAlign === 'center' ? 'center' : 'end');
        const className = `btn_${el.id.split('-')[0]}`;

        if (flavor === 'material') {
            return { html: `<div class="flex w-full justify-${justify}">\n  <button mat-flat-button color="primary">${el.label}</button>\n</div>` };
        }

        if (flavor === 'tailwind') {
            return { html: `<div class="flex w-full justify-${justify}">\n  <button type="button" class="bg-[#F1E5D1] text-black px-6 py-2 rounded-[10px] font-medium hover:opacity-90 transition-all font-['Tomorrow']">${el.label.toUpperCase()}</button>\n</div>` };
        }

        const inlineStyles = `display: flex; width: 100%; justify-content: ${el.textAlign === 'left' ? 'flex-start' : (el.textAlign === 'center' ? 'center' : 'flex-end')};`;
        const btnStyles = `padding: 10px 24px; background: #F1E5D1; color: #000; border: none; border-radius: 10px; font-family: 'Tomorrow', sans-serif; cursor: pointer; font-weight: 500;`;

        if (useExternal) {
            return {
                html: `<div class="${className}_wrapper">\n  <button type="button" class="${className}">${el.label}</button>\n</div>`,
                css: `.${className}_wrapper { ${inlineStyles} }\n.${className} { ${btnStyles} }`
            };
        }
        return { html: `<div style="${inlineStyles}">\n  <button type="button" style="${btnStyles}">${el.label}</button>\n</div>` };
    }
}

export const CARD_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'card',
    elementType: 'layoutField',
    label: 'Card Container',
    icon: 'view_quilt',
    defaultConfig: {
        label: 'Card Header',
        level: 'h4',
        textAlign: 'left',
        alignment: 'center',
        size: 'lg',
        required: false,
        nestedRows: [
            { id: crypto.randomUUID(), elements: [] }
        ]
    },
    elementConfig: [
        { type: 'text', label: 'Card Header', key: 'label' },
        {
            type: 'select', key: 'level', label: 'Header Level',
            options: [
                { label: 'H1', value: 'h1' },
                { label: 'H2', value: 'h2' },
                { label: 'H3', value: 'h3' },
                { label: 'H4', value: 'h4' },
                { label: 'H5', value: 'h5' },
                { label: 'H6', value: 'h6' },
            ]
        },
        {
            type: 'select', key: 'textAlign', label: 'Header Alignment',
            options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
            ]
        },
        {
            type: 'select', key: 'alignment', label: 'Card Alignment',
            options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
            ]
        },
        {
            type: 'select', key: 'size', label: 'Card Size',
            options: [
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large (Full)', value: 'lg' },
            ]
        }
    ],
    component: CardContainerComponent,
    getTemplate: (el, flavor, useExternal, innerHtml) => {
        const className = `card_${el.id.split('-')[0]}`;
        const cardWidth = el.size === 'sm' ? '33%' : (el.size === 'md' ? '66%' : '100%');
        const cardAlign = el.alignment === 'left' ? 'start' : (el.alignment === 'center' ? 'center' : 'end');

        if (flavor === 'material') {
            const headerAlign = el.textAlign || 'left';
            return {
                html: `<div class="flex w-full justify-${cardAlign}">\n  <mat-card class="bg-[#1e293b] border border-[#334155] ${el.size === 'lg' ? 'w-full' : (el.size === 'md' ? 'w-2/3' : 'w-1/3')}">\n    <div class="border-b border-[#334155] px-4 py-3 text-${headerAlign}">\n      <${el.level} class="m-0 text-[#fbbf24] font-bold">${el.label}</${el.level}>\n    </div>\n    <mat-card-content class="p-4">\n      ${innerHtml || ''}\n    </mat-card-content>\n  </mat-card>\n</div>`
            };
        }

        if (flavor === 'tailwind') {
            const headerAlign = el.textAlign || 'left';
            return {
                html: `<div class="flex w-full justify-${cardAlign}">\n  <div class="bg-[#1e293b] border border-[#334155] rounded-[10px] overflow-hidden shadow-xl ${el.size === 'lg' ? 'w-full' : (el.size === 'md' ? 'w-2/3' : 'w-1/3')}">\n    <div class="px-4 py-3 border-b border-[#334155] bg-white/5 text-${headerAlign}">\n      <${el.level} class="text-xl font-bold text-[#fbbf24] tracking-tight uppercase">${el.label}</${el.level}>\n    </div>\n    <div class="p-6 flex flex-col gap-4">\n      ${innerHtml || ''}\n    </div>\n  </div>\n</div>`
            };
        }

        const wrapperStyles = `display: flex; width: 100%; justify-content: ${el.alignment === 'left' ? 'flex-start' : (el.alignment === 'center' ? 'center' : 'flex-end')};`;
        const cardStyles = `width: ${cardWidth}; background: #1e293b; border: 1px solid #334155; border-radius: 10px; font-family: 'Tomorrow', sans-serif; overflow: hidden;`;
        const headerStyles = `padding: 12px 16px; border-bottom: 1px solid #334155; color: #fbbf24; text-align: ${el.textAlign || 'left'}; font-weight: bold;`;
        const contentStyles = `padding: 16px; display: flex; flex-direction: column; gap: 16px;`;

        if (useExternal) {
            return {
                html: `<div class="${className}_wrapper">\n  <div class="${className}">\n    <div class="${className}_header">${el.label}</div>\n    <div class="${className}_content">\n      ${innerHtml || ''}\n    </div>\n  </div>\n</div>`,
                css: `.${className}_wrapper { ${wrapperStyles} }\n.${className} { ${cardStyles} }\n.${className}_header { ${headerStyles} }\n.${className}_content { ${contentStyles} }`
            };
        }
        return {
            html: `<div style="${wrapperStyles}">\n  <div style="${cardStyles}">\n    <div style="${headerStyles}">${el.label}</div>\n    <div style="${contentStyles}">\n      ${innerHtml || ''}\n    </div>\n  </div>\n</div>`
        };
    }
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
    component: HeadingFieldComponent,
    getTemplate: (el, flavor, useExternal) => {
        const align = el.textAlign || 'left';
        const level = el.level || 'h2';
        const className = `heading_${el.id.split('-')[0]}`;

        if (flavor === 'material') {
            const fontClass = level === 'h1' ? 'mat-display-medium' : (level === 'h2' ? 'mat-display-small' : 'mat-headline-medium');
            return { html: `<div class="w-full text-${align}">\n  <${level} class="${fontClass} m-0 text-white">${el.label}</${level}>\n</div>` };
        }

        if (flavor === 'tailwind') {
            const sizeClass = level === 'h1' ? 'text-4xl' : (level === 'h2' ? 'text-3xl' : 'text-2xl');
            const weightClass = (level === 'h1' || level === 'h2') ? 'font-extrabold' : 'font-bold';
            return { html: `<div class="w-full text-${align}">\n  <${level} class="${sizeClass} ${weightClass} text-white tracking-tight font-['Tomorrow']">${el.label}</${level}>\n</div>` };
        }

        const size = level === 'h1' ? '36px' : (level === 'h2' ? '30px' : '24px');
        const weight = (level === 'h1' || level === 'h2') ? '800' : '700';
        const styles = `margin: 0; font-size: ${size}; font-weight: ${weight}; text-align: ${align}; color: #f1f5f9; font-family: 'Tomorrow', sans-serif;`;

        if (useExternal) {
            return {
                html: `<${level} class="${className}">${el.label}</${level}>`,
                css: `.${className} { ${styles} }`
            };
        }
        return { html: `<${level} style="${styles}">${el.label}</${level}>` };
    }
}

export const BUTTONS_GROUP_ELEMENT_DEFINITION: ElementTypeDefinition = {
    type: 'buttons-group',
    elementType: 'actionField',
    label: 'Buttons (Group)',
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
    component: ButtonsGroupComponent,
    getTemplate: (el, flavor, useExternal) => {
        const justify = el.textAlign === 'left' ? 'start' : (el.textAlign === 'center' ? 'center' : 'end');
        const className = `btn_group_${el.id.split('-')[0]}`;

        if (flavor === 'material') {
            return {
                html: `<div class="flex w-full justify-${justify} gap-4">\n  ${el.showSecondary ? `<button mat-stroked-button>${el.secondaryLabel || 'Cancel'}</button>\n  ` : ''}<button mat-flat-button color="primary">${el.primaryLabel || 'Submit'}</button>\n</div>`
            };
        }

        if (flavor === 'tailwind') {
            const btnBase = "px-6 py-2 rounded-[10px] font-medium transition-all font-['Tomorrow']";
            return {
                html: `<div class="flex w-full justify-${justify} gap-4">\n  ${el.showSecondary ? `<button type="button" class="${btnBase} bg-transparent border border-white/20 text-white hover:bg-white/5">${(el.secondaryLabel || 'Cancel').toUpperCase()}</button>\n  ` : ''}<button type="submit" class="${btnBase} bg-[#F1E5D1] text-black hover:opacity-90">${(el.primaryLabel || 'Submit').toUpperCase()}</button>\n</div>`
            };
        }

        const wrapperStyles = `display: flex; width: 100%; gap: 16px; justify-content: ${el.textAlign === 'left' ? 'flex-start' : (el.textAlign === 'center' ? 'center' : 'flex-end')};`;
        const primaryStyles = `padding: 10px 24px; background: #F1E5D1; color: #000; border: none; border-radius: 10px; font-family: 'Tomorrow', sans-serif; font-weight: 500; cursor: pointer;`;
        const secondaryStyles = `padding: 10px 24px; background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; font-family: 'Tomorrow', sans-serif; font-weight: 500; cursor: pointer;`;

        if (useExternal) {
            return {
                html: `<div class="${className}">\n  ${el.showSecondary ? `<button type="button" class="${className}_secondary">${el.secondaryLabel || 'Cancel'}</button>\n  ` : ''}<button type="submit" class="${className}_primary">${el.primaryLabel || 'Submit'}</button>\n</div>`,
                css: `.${className} { ${wrapperStyles} }\n.${className}_primary { ${primaryStyles} }\n.${className}_secondary { ${secondaryStyles} }`
            };
        }
        return {
            html: `<div style="${wrapperStyles}">\n  ${el.showSecondary ? `<button type="button" style="${secondaryStyles}">${el.secondaryLabel || 'Cancel'}</button>\n  ` : ''}<button type="submit" style="${primaryStyles}">${el.primaryLabel || 'Submit'}</button>\n</div>`
        };
    }
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
    getTemplate: (el, flavor, useExternal) => {
        const type = el.inputType || 'text';
        const className = `field_${el.id.split('-')[0]}`;

        if (flavor === 'material') {
            return {
                html: `<mat-form-field class="w-full" appearance="fill">\n  <mat-label>${el.label}</mat-label>\n  <input matInput type="${type}" placeholder="${el.placeholder || ''}" ${el.required ? 'required' : ''}>\n</mat-form-field>`
            };
        }

        if (flavor === 'tailwind') {
            return {
                html: `<div class="flex flex-col gap-2 w-full font-['Tomorrow']">\n  <label class="text-sm font-medium text-slate-400">${el.label}</label>\n  <input type="${type}" placeholder="${el.placeholder || ''}" ${el.required ? 'required' : ''} class="w-full px-4 py-2 bg-[#1e293b]/50 border border-[#334155] rounded-[10px] text-white focus:border-[#fbbf24] outline-none transition-all">\n</div>`
            };
        }

        const containerStyles = `display: flex; flex-direction: column; gap: 8px; width: 100%; font-family: 'Tomorrow', sans-serif;`;
        const labelStyles = `font-size: 14px; font-weight: 500; color: #94a3b8;`;
        const inputStyles = `padding: 10px 16px; background: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 10px; color: #f1f5f9; outline: none; font-size: 14px;`;

        if (useExternal) {
            return {
                html: `<div class="${className}_container">\n  <label class="${className}_label">${el.label}</label>\n  <input class="${className}_input" type="${type}" placeholder="${el.placeholder || ''}" ${el.required ? 'required' : ''}>\n</div>`,
                css: `.${className}_container { ${containerStyles} }\n.${className}_label { ${labelStyles} }\n.${className}_input { ${inputStyles} }`
            };
        }
        return {
            html: `<div style="${containerStyles}">\n  <label style="${labelStyles}">${el.label}</label>\n  <input style="${inputStyles}" type="${type}" placeholder="${el.placeholder || ''}" ${el.required ? 'required' : ''}>\n</div>`
        };
    }
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
    getTemplate: (el, flavor, useExternal) => {
        const className = `textarea_${el.id.split('-')[0]}`;
        const rows = el.rows || 3;

        if (flavor === 'material') {
            return {
                html: `<mat-form-field class="w-full" appearance="fill">\n  <mat-label>${el.label}</mat-label>\n  <textarea matInput rows="${rows}" placeholder="${el.placeholder || ''}" ${el.required ? 'required' : ''}></textarea>\n</mat-form-field>`
            };
        }

        if (flavor === 'tailwind') {
            return {
                html: `<div class="flex flex-col gap-2 w-full font-['Tomorrow']">\n  <label class="text-sm font-medium text-slate-400">${el.label}</label>\n  <textarea rows="${rows}" placeholder="${el.placeholder || ''}" ${el.required ? 'required' : ''} class="w-full px-4 py-2 bg-[#1e293b]/50 border border-[#334155] rounded-[10px] text-white focus:border-[#fbbf24] outline-none transition-all resize-y"></textarea>\n</div>`
            };
        }

        const containerStyles = `display: flex; flex-direction: column; gap: 8px; width: 100%; font-family: 'Tomorrow', sans-serif;`;
        const labelStyles = `font-size: 14px; font-weight: 500; color: #94a3b8;`;
        const inputStyles = `padding: 10px 16px; background: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 10px; color: #f1f5f9; outline: none; font-size: 14px; resize: vertical; min-height: 80px;`;

        if (useExternal) {
            return {
                html: `<div class="${className}_container">\n  <label class="${className}_label">${el.label}</label>\n  <textarea class="${className}_input" rows="${rows}" placeholder="${el.placeholder || ''}" ${el.required ? 'required' : ''}></textarea>\n</div>`,
                css: `.${className}_container { ${containerStyles} }\n.${className}_label { ${labelStyles} }\n.${className}_input { ${inputStyles} }`
            };
        }
        return {
            html: `<div style="${containerStyles}">\n  <label style="${labelStyles}">${el.label}</label>\n  <textarea style="${inputStyles}" rows="${rows}" placeholder="${el.placeholder || ''}" ${el.required ? 'required' : ''}></textarea>\n</div>`
        };
    }
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
    component: CheckboxFieldComponent,
    getTemplate: (el, flavor, useExternal) => {
        const className = `checkbox_${el.id.split('-')[0]}`;
        const direction = el.alignment === 'horizontal' ? 'row' : 'column';
        const optionsHtml = (el.options || []).map(opt => {
            if (flavor === 'material') return `<mat-checkbox value="${opt.value}">${opt.label}</mat-checkbox>`;
            if (flavor === 'tailwind') return `<label class="flex items-center gap-3 cursor-pointer group w-fit">\n      <input type="checkbox" class="w-5 h-5 accent-[#fbbf24] bg-[#1e293b] border-[#334155] rounded">\n      <span class="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">${opt.label}</span>\n    </label>`;
            const optStyles = `display: flex; align-items: center; gap: 10px; cursor: pointer; color: #94a3b8; font-size: 14px;`;
            if (useExternal) return `<label class="${className}_option">\n      <input type="checkbox" style="accent-color: #fbbf24;">\n      <span>${opt.label}</span>\n    </label>`;
            return `<label style="${optStyles}">\n      <input type="checkbox" style="accent-color: #fbbf24; width: 18px; height: 18px;">\n      <span>${opt.label}</span>\n    </label>`;
        }).join('\n    ');

        if (flavor === 'material') {
            return {
                html: `<div class="flex flex-col gap-2 w-full">\n  <label class="text-sm font-medium text-slate-400 mb-1">${el.label}</label>\n  <div class="flex flex-wrap gap-x-6 gap-y-2 flex-${direction}">\n    ${optionsHtml}\n  </div>\n</div>`
            };
        }

        if (flavor === 'tailwind') {
            return {
                html: `<div class="flex flex-col gap-3 w-full font-['Tomorrow']">\n  <label class="text-sm font-medium text-slate-400">${el.label}</label>\n  <div class="flex flex-wrap gap-x-8 gap-y-4 flex-${direction}">\n    ${optionsHtml}\n  </div>\n</div>`
            };
        }

        const containerStyles = `display: flex; flex-direction: column; gap: 8px; width: 100%; font-family: 'Tomorrow', sans-serif;`;
        const labelStyles = `font-size: 14px; font-weight: 500; color: #94a3b8;`;
        const listStyles = `display: flex; flex-wrap: wrap; gap: 16px; flex-direction: ${direction};`;

        if (useExternal) {
            return {
                html: `<div class="${className}_container">\n  <label class="${className}_label">${el.label}</label>\n  <div class="${className}_list">\n    ${optionsHtml}\n  </div>\n</div>`,
                css: `.${className}_container { ${containerStyles} }\n.${className}_label { ${labelStyles} }\n.${className}_list { ${listStyles} }\n.${className}_option { display: flex; align-items: center; gap: 10px; cursor: pointer; color: #94a3b8; font-size: 14px; }`
            };
        }
        return {
            html: `<div style="${containerStyles}">\n  <label style="${labelStyles}">${el.label}</label>\n  <div style="${listStyles}">\n    ${optionsHtml}\n  </div>\n</div>`
        };
    }
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
    component: RadioGroupFieldComponent,
    getTemplate: (el, flavor, useExternal) => {
        const className = `radio_${el.id.split('-')[0]}`;
        const direction = el.alignment === 'horizontal' ? 'row' : 'column';
        const optionsHtml = (el.options || []).map(opt => {
            if (flavor === 'material') return `<mat-radio-button value="${opt.value}">${opt.label}</mat-radio-button>`;
            if (flavor === 'tailwind') return `<label class="flex items-center gap-3 cursor-pointer group w-fit">\n      <input type="radio" name="${className}" class="w-5 h-5 accent-[#fbbf24] bg-[#1e293b] border-[#334155] rounded-full">\n      <span class="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">${opt.label}</span>\n    </label>`;
            const optStyles = `display: flex; align-items: center; gap: 10px; cursor: pointer; color: #94a3b8; font-size: 14px;`;
            if (useExternal) return `<label class="${className}_option">\n      <input type="radio" name="${className}" style="accent-color: #fbbf24;">\n      <span>${opt.label}</span>\n    </label>`;
            return `<label style="${optStyles}">\n      <input type="radio" name="${className}" style="accent-color: #fbbf24; width: 18px; height: 18px;">\n      <span>${opt.label}</span>\n    </label>`;
        }).join('\n    ');

        if (flavor === 'material') {
            return {
                html: `<div class="flex flex-col gap-2 w-full">\n  <label class="text-sm font-medium text-slate-400 mb-1">${el.label}</label>\n  <mat-radio-group class="flex flex-wrap gap-x-6 gap-y-2 flex-${direction}">\n    ${optionsHtml}\n  </mat-radio-group>\n</div>`
            };
        }

        if (flavor === 'tailwind') {
            return {
                html: `<div class="flex flex-col gap-3 w-full font-['Tomorrow']">\n  <label class="text-sm font-medium text-slate-400">${el.label}</label>\n  <div class="flex flex-wrap gap-x-8 gap-y-4 flex-${direction}">\n    ${optionsHtml}\n  </div>\n</div>`
            };
        }

        const containerStyles = `display: flex; flex-direction: column; gap: 8px; width: 100%; font-family: 'Tomorrow', sans-serif;`;
        const labelStyles = `font-size: 14px; font-weight: 500; color: #94a3b8;`;
        const listStyles = `display: flex; flex-wrap: wrap; gap: 16px; flex-direction: ${direction};`;

        if (useExternal) {
            return {
                html: `<div class="${className}_container">\n  <label class="${className}_label">${el.label}</label>\n  <div class="${className}_list">\n    ${optionsHtml}\n  </div>\n</div>`,
                css: `.${className}_container { ${containerStyles} }\n.${className}_label { ${labelStyles} }\n.${className}_list { ${listStyles} }\n.${className}_option { display: flex; align-items: center; gap: 10px; cursor: pointer; color: #94a3b8; font-size: 14px; }`
            };
        }
        return {
            html: `<div style="${containerStyles}">\n  <label style="${labelStyles}">${el.label}</label>\n  <div style="${listStyles}">\n    ${optionsHtml}\n  </div>\n</div>`
        };
    }
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
    getTemplate: (el, flavor, useExternal) => {
        const className = `select_${el.id.split('-')[0]}`;
        const optionsHtml = (el.options || []).map(opt => {
            if (flavor === 'material') return `<mat-option value="${opt.value}">${opt.label}</mat-option>`;
            return `<option value="${opt.value}">${opt.label}</option>`;
        }).join('\n    ');

        if (flavor === 'material') {
            return {
                html: `<mat-form-field class="w-full" appearance="fill">\n  <mat-label>${el.label}</mat-label>\n  <mat-select ${el.required ? 'required' : ''}>\n    ${optionsHtml}\n  </mat-select>\n</mat-form-field>`
            };
        }

        if (flavor === 'tailwind') {
            return {
                html: `<div class="flex flex-col gap-2 w-full font-['Tomorrow']">\n  <label class="text-sm font-medium text-slate-400">${el.label}</label>\n  <select ${el.required ? 'required' : ''} class="w-full px-4 py-2 bg-[#1e293b]/50 border border-[#334155] rounded-[10px] text-white focus:border-[#fbbf24] outline-none transition-all appearance-none">\n    <option value="" disabled selected>${el.placeholder || 'Select option'}</option>\n    ${optionsHtml}\n  </select>\n</div>`
            };
        }

        const containerStyles = `display: flex; flex-direction: column; gap: 8px; width: 100%; font-family: 'Tomorrow', sans-serif;`;
        const labelStyles = `font-size: 14px; font-weight: 500; color: #94a3b8;`;
        const inputStyles = `padding: 10px 16px; background: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 10px; color: #f1f5f9; outline: none; font-size: 14px;`;

        if (useExternal) {
            return {
                html: `<div class="${className}_container">\n  <label class="${className}_label">${el.label}</label>\n  <select class="${className}_input">\n    <option value="" disabled selected>${el.placeholder || 'Select option'}</option>\n    ${optionsHtml}\n  </select>\n</div>`,
                css: `.${className}_container { ${containerStyles} }\n.${className}_label { ${labelStyles} }\n.${className}_input { ${inputStyles} }`
            };
        }
        return {
            html: `<div style="${containerStyles}">\n  <label style="${labelStyles}">${el.label}</label>\n  <select style="${inputStyles}">\n    <option value="" disabled selected>${el.placeholder || 'Select option'}</option>\n    ${optionsHtml}\n  </select>\n</div>`
        };
    }
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
    getTemplate: (el, flavor, useExternal) => {
        const className = `date_${el.id.split('-')[0]}`;

        if (flavor === 'material') {
            return {
                html: `<mat-form-field class="w-full" appearance="fill">\n  <mat-label>${el.label}</mat-label>\n  <input matInput [matDatepicker]="picker" placeholder="${el.placeholder || 'MM/DD/YYYY'}" ${el.required ? 'required' : ''}>\n  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>\n  <mat-datepicker #picker></mat-datepicker>\n</mat-form-field>`
            };
        }

        if (flavor === 'tailwind') {
            return {
                html: `<div class="flex flex-col gap-2 w-full font-['Tomorrow']">\n  <label class="text-sm font-medium text-slate-400">${el.label}</label>\n  <input type="date" ${el.required ? 'required' : ''} class="w-full px-4 py-2 bg-[#1e293b]/50 border border-[#334155] rounded-[10px] text-white focus:border-[#fbbf24] outline-none transition-all">\n</div>`
            };
        }

        const containerStyles = `display: flex; flex-direction: column; gap: 8px; width: 100%; font-family: 'Tomorrow', sans-serif;`;
        const labelStyles = `font-size: 14px; font-weight: 500; color: #94a3b8;`;
        const inputStyles = `padding: 10px 16px; background: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 10px; color: #f1f5f9; outline: none; font-size: 14px;`;

        if (useExternal) {
            return {
                html: `<div class="${className}_container">\n  <label class="${className}_label">${el.label}</label>\n  <input class="${className}_input" type="date" ${el.required ? 'required' : ''}>\n</div>`,
                css: `.${className}_container { ${containerStyles} }\n.${className}_label { ${labelStyles} }\n.${className}_input { ${inputStyles} }`
            };
        }
        return {
            html: `<div style="${containerStyles}">\n  <label style="${labelStyles}">${el.label}</label>\n  <input style="${inputStyles}" type="date" ${el.required ? 'required' : ''}>\n</div>`
        };
    }
}
