import { Injectable } from '@angular/core';
import { ElementTypeDefinition } from '../models/element';
import {
  CHECKBOX_ELEMENT_DEFINITION,
  SELECT_ELEMENT_DEFINITION,
  TEXT_ELEMENT_DEFINITION,
  TEXTAREA_ELEMENT_DEFINITION,
  RADIO_ELEMENT_DEFINITION,
  DATEPICKER_ELEMENT_DEFINITION,
  HEADING_ELEMENT_DEFINITION,
  BUTTONS_GROUP_ELEMENT_DEFINITION,
  CARD_ELEMENT_DEFINITION
} from '../consts/elements-consts';

@Injectable({
  providedIn: 'root',
})
export class ElementTypesService {

  elementTypes = new Map<string, ElementTypeDefinition>([
    ['card', CARD_ELEMENT_DEFINITION],
    ['heading', HEADING_ELEMENT_DEFINITION],
    ['text', TEXT_ELEMENT_DEFINITION],
    ['textarea', TEXTAREA_ELEMENT_DEFINITION],
    ['checkbox', CHECKBOX_ELEMENT_DEFINITION],
    ['radio', RADIO_ELEMENT_DEFINITION],
    ['select', SELECT_ELEMENT_DEFINITION],
    ['datepicker', DATEPICKER_ELEMENT_DEFINITION],
    ['buttonsgroup', BUTTONS_GROUP_ELEMENT_DEFINITION],
  ]);

  getElementType(type: string): ElementTypeDefinition | undefined {
    return this.elementTypes.get(type);
  }

  getAllElementsTypes(): ElementTypeDefinition[] {
    return Array.from(this.elementTypes.values());
  }
}
