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
    value?: any;
    inputType?: string;
    placeholder?: string;
    rows?: number;
    alignment?: 'vertical' | 'horizontal' | 'left' | 'center' | 'right';
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    textAlign?: 'left' | 'center' | 'right';
    primaryLabel?: string;
    secondaryLabel?: string;
    showSecondary?: boolean;
    size?: 'sm' | 'md' | 'lg';
    children?: FormElement[];
    options?: OptionsItem[]; // For select, radio, checkbox
}
