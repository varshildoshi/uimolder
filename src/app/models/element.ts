import { Type } from "@angular/core";

export interface ElementTypeDefinition {
    type: string;
    elementType: string; // 'formField' or 'layoutField'
    label: string;
    icon: string;
    defaultConfig: any;
    elementConfig?: ElementConfigDefinition[];
    component: Type<unknown>;
}

export interface ElementConfigDefinition {
    type: 'text' | 'number' | 'date' | 'select' | 'dynamic-options' | 'checkbox' | 'radio';
    key: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: OptionsItem[]; // For select, radio, checkbox
}

export interface OptionsItem {
    label: string;
    value: string;
}

export interface FormElement {
    id: string;
    type: string;
    label: string;
    required: boolean;
    inputType?: string;
    placeholder?: string;
    options?: OptionsItem[]; // For select, radio, checkbox
}