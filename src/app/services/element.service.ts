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

  public readonly allContainerIds = computed(() => {
    const ids: string[] = this._rows().map(r => r.id);
    this._rows().forEach(row => {
      this.getDeepContainerIds(row.elements, ids);
    });
    return ids;
  });

  private getDeepContainerIds(elements: FormElement[], ids: string[]) {
    elements.forEach(el => {
      if (el.nestedRows) {
        el.nestedRows.forEach(r => ids.push(r.id));
        el.nestedRows.forEach(r => this.getDeepContainerIds(r.elements, ids));
      }
      if (el.children) {
        this.getDeepContainerIds(el.children, ids);
      }
    });
  }

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
      if (el.nestedRows) {
        for (const row of el.nestedRows) {
          const found = this.findDeep(row.elements, id);
          if (found) return found;
        }
      }
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

  addRowToElement(elementId: string) {
    this._rows.update(rows => rows.map(row => ({
      ...row,
      elements: this.updateDeepAddRow(row.elements, elementId)
    })));
  }

  private updateDeepAddRow(elements: FormElement[], targetId: string): FormElement[] {
    return elements.map(el => {
      if (el.id === targetId) {
        const newRow: ElementRow = { id: crypto.randomUUID(), elements: [] };
        const updatedRows = el.nestedRows ? [...el.nestedRows, newRow] : [newRow];
        return { ...el, nestedRows: updatedRows };
      }
      if (el.nestedRows) {
        return { ...el, nestedRows: el.nestedRows.map(r => ({ ...r, elements: this.updateDeepAddRow(r.elements, targetId) })) };
      }
      return el;
    });
  }

  deleteRow(rowId: string) {
    if (this._rows().some(r => r.id === rowId)) {
      if (this._rows().length === 1) return;
      this._rows.set(this._rows().filter(row => row.id !== rowId));
      return;
    }

    this._rows.update(rows => rows.map(row => ({
      ...row,
      elements: this.deleteDeepRow(row.elements, rowId)
    })));
  }

  private deleteDeepRow(elements: FormElement[], rowId: string): FormElement[] {
    return elements.map(el => {
      if (el.nestedRows) {
        if (el.nestedRows.some(r => r.id === rowId)) {
          if (el.nestedRows.length > 1) {
            return { ...el, nestedRows: el.nestedRows.filter(r => r.id !== rowId) };
          }
          return el;
        }
        return { ...el, nestedRows: el.nestedRows.map(r => ({ ...r, elements: this.deleteDeepRow(r.elements, rowId) })) };
      }
      return el;
    });
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
      return { ...row, elements: this.updateDeepAddElementToRow(row.elements, rowId, element, index) };
    }));
  }

  private updateDeepAddElementToRow(elements: FormElement[], rowId: string, newEl: FormElement, index?: number): FormElement[] {
    return elements.map(el => {
      if (el.nestedRows) {
        const updatedRows = el.nestedRows.map(r => {
          if (r.id === rowId) {
            const updatedEls = [...r.elements];
            if (index !== undefined) updatedEls.splice(index, 0, newEl);
            else updatedEls.push(newEl);
            return { ...r, elements: updatedEls };
          }
          return { ...r, elements: this.updateDeepAddElementToRow(r.elements, rowId, newEl, index) };
        });
        return { ...el, nestedRows: updatedRows };
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
        if (el.nestedRows) {
          return { ...el, nestedRows: el.nestedRows.map(r => ({ ...r, elements: this.deleteDeep(r.elements, id) })) };
        }
        if (el.children) {
          return { ...el, children: this.deleteDeep(el.children, id) };
        }
        return el;
      });
  }

  moveElement(elementId: string, sourceContainerId: string, targetContainerId: string, targetIndex: number = -1) {
    let elementToMove: FormElement | undefined;

    this._rows.update(rows => {
      const newRows = rows.map(row => {
        if (row.id === sourceContainerId) {
          const idx = row.elements.findIndex(e => e.id === elementId);
          if (idx !== -1) {
            elementToMove = row.elements[idx];
            const updated = [...row.elements];
            updated.splice(idx, 1);
            return { ...row, elements: updated };
          }
        }
        return { ...row, elements: this.removeDeep(row.elements, elementId, (found) => elementToMove = found) };
      });
      return newRows;
    });

    if (!elementToMove) return;

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
      if (el.nestedRows) {
        const updatedRows = el.nestedRows.map(r => ({ ...r, elements: this.removeDeep(r.elements, id, onFound) }));
        acc.push({ ...el, nestedRows: updatedRows });
      } else if (el.children) {
        acc.push({ ...el, children: this.removeDeep(el.children, id, onFound) });
      } else {
        acc.push(el);
      }
      return acc;
    }, [] as FormElement[]);
  }

  private insertDeep(elements: FormElement[], targetId: string, newEl: FormElement, index: number): FormElement[] {
    return elements.map(el => {
      if (el.nestedRows) {
        const updatedRows = el.nestedRows.map(r => {
          if (r.id === targetId) {
            const updated = [...r.elements];
            if (index === -1) updated.push(newEl);
            else updated.splice(index, 0, newEl);
            return { ...r, elements: updated };
          }
          return { ...r, elements: this.insertDeep(r.elements, targetId, newEl, index) };
        });
        return { ...el, nestedRows: updatedRows };
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
      if (el.nestedRows) {
        return { ...el, nestedRows: el.nestedRows.map(r => ({ ...r, elements: this.updateDeepProps(r.elements, id, data) })) };
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
