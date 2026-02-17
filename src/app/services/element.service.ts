import { computed, Injectable, signal } from '@angular/core';
import { ElementRow } from '../models/element-row';
import { FormElement } from '../models/element';

@Injectable({
  providedIn: 'root',
})
export class ElementService {

  private _rows = signal<ElementRow[]>([]);
  private _selectedElementId = signal<string | null>(null);
  public readonly rows = this._rows.asReadonly();

  public readonly selectedElement = computed(() =>
    this._rows()
      .flatMap(row => row.elements)
      .find((el) => el.id === this._selectedElementId()));

  constructor() {
    this._rows.set([
      {
        id: crypto.randomUUID(),
        elements: []
      }
    ]);
  }

  addRow() {
    const newRow: ElementRow = {
      id: crypto.randomUUID(),
      elements: []
    };
    const rows = this._rows();
    this._rows.set([...rows, newRow]);
  }

  deleteRow(rowId: string) {
    if (this._rows().length === 1) {
      return; // Prevent deleting the last row
    }

    const rows = this._rows();
    const newRows = rows.filter(row => row.id !== rowId);
    this._rows.set(newRows);
  }

  addElementToRow(element: FormElement, rowId: string, index?: number) {
    const rows = this._rows();

    const newRows = rows.map(row => {
      if (row.id === rowId) {
        const updatedElements = [...row.elements];
        if (index !== undefined) {
          updatedElements.splice(index, 0, element);
        } else {
          updatedElements.push(element);
        }
        return { ...row, elements: updatedElements };
      }
      return row;
    });
    this._rows.set(newRows);
  }

  deleteElementFromRow(elementId: string) {
    const rows = this._rows();
    const newRows = rows.map(row => ({
      ...row,
      elements: row.elements.filter(el => el.id !== elementId)
    }));
    this._rows.set(newRows);
  }

  moveElement(elementId: string, sourceRowId: string, targetRowId: string, targetIndex: number = -1) {
    const rows = this._rows();
    let elementToMove: FormElement | undefined;
    let sourceRowIndex = -1;
    let sourceElementIndex = -1;

    // Find the element and its source row
    rows.forEach((row, rowIndex) => {
      if (row.id === sourceRowId) {
        sourceRowIndex = rowIndex;
        sourceElementIndex = row.elements.findIndex(el => el.id === elementId);
        if (sourceElementIndex >= 0) {
          elementToMove = row.elements[sourceElementIndex];
        }
      }
    });

    if (!elementToMove) return; // Element not found

    const newRows = [...rows];
    const elementsWithRemovedElement = newRows[sourceRowIndex].elements.filter(el => el.id !== elementId);
    newRows[sourceRowIndex].elements = elementsWithRemovedElement;

    const targetRowIndex = newRows.findIndex(row => row.id === targetRowId);
    if (targetRowIndex >= 0) {
      const targetElements = [...newRows[targetRowIndex].elements];
      targetElements.splice(targetIndex, 0, elementToMove);
      newRows[targetRowIndex].elements = targetElements;
    }

    this._rows.set(newRows);
  }

  setSelectedElement(elementId: string | null) {
    this._selectedElementId.set(elementId);
  }

  updateElement(elementId: string, data: Partial<FormElement>) {
    const rows = this._rows();
    const newRows = rows.map(row => ({
      ...row,
      elements: row.elements.map(el => el.id === elementId ? { ...el, ...data } : el)
    }));
    this._rows.set(newRows);
  }

  clearLayout() {
    this._rows.set([{
      id: crypto.randomUUID(),
      elements: []
    }]);
    this._selectedElementId.set(null);
  }

}
