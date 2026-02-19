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

  public readonly selectedElement = computed(() => {
    const rows = this._rows();
    const id = this._selectedElementId();
    if (!id) return null;

    for (const row of rows) {
      const found = this.findDeep(row.elements, id);
      if (found) return found;
    }
    return null;
  });

  constructor() {
    this._rows.set([
      {
        id: crypto.randomUUID(),
        elements: []
      }
    ]);
  }

  private findDeep(elements: FormElement[], id: string): FormElement | undefined {
    for (const el of elements) {
      if (el.id === id) return el;
      if (el.children) {
        const found = this.findDeep(el.children, id);
        if (found) return found;
      }
    }
    return undefined;
  }

  addRow() {
    const newRow: ElementRow = {
      id: crypto.randomUUID(),
      elements: []
    };
    this._rows.set([...this._rows(), newRow]);
  }

  deleteRow(rowId: string) {
    if (this._rows().length === 1) {
      return;
    }
    this._rows.set(this._rows().filter(row => row.id !== rowId));
  }

  addElementToRow(element: FormElement, rowId: string, index?: number) {
    this._rows.update(rows => rows.map(row => {
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
    }));
  }

  addElementToContainer(element: FormElement, containerId: string, index?: number) {
    this._rows.update(rows => rows.map(row => ({
      ...row,
      elements: this.updateDeepAdd(row.elements, containerId, element, index)
    })));
  }

  private updateDeepAdd(elements: FormElement[], targetId: string, newEl: FormElement, index?: number): FormElement[] {
    return elements.map(el => {
      if (el.id === targetId) {
        const updatedChildren = el.children ? [...el.children] : [];
        if (index !== undefined) {
          updatedChildren.splice(index, 0, newEl);
        } else {
          updatedChildren.push(newEl);
        }
        return { ...el, children: updatedChildren };
      }
      if (el.children) {
        return { ...el, children: this.updateDeepAdd(el.children, targetId, newEl, index) };
      }
      return el;
    });
  }

  deleteElementFromRow(elementId: string) {
    this._rows.update(rows => rows.map(row => ({
      ...row,
      elements: this.deleteDeep(row.elements, elementId)
    })));
  }

  private deleteDeep(elements: FormElement[], id: string): FormElement[] {
    return elements
      .filter(el => el.id !== id)
      .map(el => {
        if (el.children) {
          return { ...el, children: this.deleteDeep(el.children, id) };
        }
        return el;
      });
  }

  moveElement(elementId: string, sourceContainerId: string, targetContainerId: string, targetIndex: number = -1) {
    let elementToMove: FormElement | undefined;

    // 1. Find and Remove
    this._rows.update(rows => {
      const newRows = rows.map(row => {
        // Search in row level
        if (row.id === sourceContainerId) {
          const idx = row.elements.findIndex(e => e.id === elementId);
          if (idx !== -1) {
            elementToMove = row.elements[idx];
            const updated = [...row.elements];
            updated.splice(idx, 1);
            return { ...row, elements: updated };
          }
        }
        // Search deep
        return { ...row, elements: this.removeDeep(row.elements, elementId, (found) => elementToMove = found) };
      });
      return newRows;
    });

    if (!elementToMove) return;

    // 2. Insert into target
    this._rows.update(rows => {
      return rows.map(row => {
        if (row.id === targetContainerId) {
          const updated = [...row.elements];
          if (targetIndex === -1) updated.push(elementToMove!);
          else updated.splice(targetIndex, 0, elementToMove!);
          return { ...row, elements: updated };
        }
        return { ...row, elements: this.insertDeep(row.elements, targetContainerId, elementToMove!, targetIndex) };
      });
    });
  }

  private removeDeep(elements: FormElement[], id: string, onFound: (el: FormElement) => void): FormElement[] {
    return elements.reduce((acc, el) => {
      if (el.id === id) {
        onFound(el);
        return acc;
      }
      if (el.children) {
        acc.push({ ...el, children: this.removeDeep(el.children, id, onFound) });
      } else {
        acc.push(el);
      }
      return acc;
    }, [] as FormElement[]);
  }

  private insertDeep(elements: FormElement[], targetId: string, newEl: FormElement, index: number): FormElement[] {
    return elements.map(el => {
      if (el.id === targetId) {
        const updated = el.children ? [...el.children] : [];
        if (index === -1) updated.push(newEl);
        else updated.splice(index, 0, newEl);
        return { ...el, children: updated };
      }
      if (el.children) {
        return { ...el, children: this.insertDeep(el.children, targetId, newEl, index) };
      }
      return el;
    });
  }

  setSelectedElement(elementId: string | null) {
    this._selectedElementId.set(elementId);
  }

  updateElement(elementId: string, data: Partial<FormElement>) {
    this._rows.update(rows => rows.map(row => ({
      ...row,
      elements: this.updateDeepProps(row.elements, elementId, data)
    })));
  }

  private updateDeepProps(elements: FormElement[], id: string, data: Partial<FormElement>): FormElement[] {
    return elements.map(el => {
      if (el.id === id) {
        return { ...el, ...data };
      }
      if (el.children) {
        return { ...el, children: this.updateDeepProps(el.children, id, data) };
      }
      return el;
    });
  }

  clearLayout() {
    this._rows.set([{
      id: crypto.randomUUID(),
      elements: []
    }]);
    this._selectedElementId.set(null);
  }

}
