import { Injectable } from '@angular/core';
import { ElementTypeDefinition } from '../models/element';
import { CHECKBOX_ELEMENT_DEFINITION, SELECT_ELEMENT_DEFINITION, TEXT_ELEMENT_DEFINITION } from '../consts/elements-consts';

@Injectable({
  providedIn: 'root',
})
export class ElementTypesService {

  elementTypes = new Map<string, ElementTypeDefinition>([
    ['text', TEXT_ELEMENT_DEFINITION],
    ['checkbox', CHECKBOX_ELEMENT_DEFINITION],
    ['select', SELECT_ELEMENT_DEFINITION],
  ]);

  getElementType(type: string): ElementTypeDefinition | undefined {
    return this.elementTypes.get(type);
  }

  getAllElementsTypes(): ElementTypeDefinition[] {
    return Array.from(this.elementTypes.values());
  }
}
