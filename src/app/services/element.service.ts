import { ApplicationRef, computed, inject, Injectable, signal } from '@angular/core';
import { ElementRow } from '../models/element-row';
import { FormElement } from '../models/element';
import { startViewTransition } from '../utils/view-transition';

@Injectable({
  providedIn: 'root',
})
export class ElementService {

  private _rows = signal<ElementRow[]>([]);
  private _selectedElementId = signal<string | null>(null);
  public readonly rows = this._rows.asReadonly();

  private appRef = inject(ApplicationRef);

  public readonly allContainerIds = computed(() => {
    const rows = this._rows() || [];
    const ids: string[] = rows.filter(r => !!r).map(r => r.id);
    rows.forEach(row => {
      if (row && row.elements) {
        this.getDeepContainerIds(row.elements, ids);
      }
    });
    return ids;
  });

  private getDeepContainerIds(elements: FormElement[] | undefined, ids: string[]) {
    if (!elements) return;
    elements.forEach(el => {
      if (!el) return;
      if (el.nestedRows) {
        el.nestedRows.forEach(r => {
          if (r) {
            ids.push(r.id);
            this.getDeepContainerIds(r.elements, ids);
          }
        });
      }
      if (el.children) {
        this.getDeepContainerIds(el.children, ids);
      }
    });
  }

  public readonly selectedElement = computed(() => {
    const rows = this._rows() || [];
    const id = this._selectedElementId();
    if (!id) return null;

    for (const row of rows) {
      if (row && row.elements) {
        const found = this.findDeep(row.elements, id);
        if (found) return found;
      }
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

  private findDeep(elements: FormElement[] | undefined, id: string): FormElement | undefined {
    if (!elements) return undefined;
    for (const el of elements) {
      if (!el) continue;
      if (el.id === id) return el;
      if (el.nestedRows) {
        for (const row of el.nestedRows) {
          if (row && row.elements) {
            const found = this.findDeep(row.elements, id);
            if (found) return found;
          }
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
    startViewTransition(() => {
      const newRow: ElementRow = {
        id: crypto.randomUUID(),
        elements: []
      };
      this._rows.set([...this._rows(), newRow]);
      this.appRef.tick();
    });
  }

  addRowToElement(elementId: string) {
    let changed = false;
    const rows = this._rows() || [];
    const newRows = rows.map(row => {
      if (!row || !row.elements) return row;
      const updatedElements = this.updateDeepAddRow(row.elements, elementId);
      if (updatedElements !== row.elements) {
        changed = true;
        return { ...row, elements: updatedElements };
      }
      return row;
    });

    if (changed) {
      startViewTransition(() => {
        this._rows.set(newRows);
        this.appRef.tick();
      });
    }
  }

  private updateDeepAddRow(elements: FormElement[] | undefined, targetId: string): FormElement[] {
    if (!elements) return [];
    let anyChanged = false;
    const newElements = elements.map(el => {
      if (!el) return el;
      if (el.id === targetId) {
        const newRow: ElementRow = { id: crypto.randomUUID(), elements: [] };
        const updatedRows = el.nestedRows ? [...el.nestedRows, newRow] : [newRow];
        anyChanged = true;
        return { ...el, nestedRows: updatedRows };
      }
      if (el.nestedRows) {
        let nestedChanged = false;
        const newNestedRows = el.nestedRows.map(r => {
          if (!r || !r.elements) return r;
          const updatedElements = this.updateDeepAddRow(r.elements, targetId);
          if (updatedElements !== r.elements) {
            nestedChanged = true;
            return { ...r, elements: updatedElements };
          }
          return r;
        });
        if (nestedChanged) {
          anyChanged = true;
          return { ...el, nestedRows: newNestedRows };
        }
      }
      return el;
    });
    return anyChanged ? newElements : elements;
  }

  deleteRow(rowId: string) {
    const rows = this._rows() || [];
    if (rows.some(r => r && r.id === rowId)) {
      if (rows.length === 1) return;
      startViewTransition(() => {
        this._rows.set(rows.filter(row => row && row.id !== rowId));
        this.appRef.tick();
      });
      return;
    }

    let changed = false;
    const newRows = rows.map(row => {
      if (!row || !row.elements) return row;
      const updatedElements = this.deleteDeepRow(row.elements, rowId);
      if (updatedElements !== row.elements) {
        changed = true;
        return { ...row, elements: updatedElements };
      }
      return row;
    });

    if (changed) {
      startViewTransition(() => {
        this._rows.set(newRows);
        this.appRef.tick();
      });
    }
  }

  private deleteDeepRow(elements: FormElement[] | undefined, rowId: string): FormElement[] {
    if (!elements) return [];
    let anyChanged = false;
    const newElements = elements.map(el => {
      if (!el) return el;
      if (el.nestedRows) {
        if (el.nestedRows.some(r => r && r.id === rowId)) {
          if (el.nestedRows.length > 1) {
            anyChanged = true;
            return { ...el, nestedRows: el.nestedRows.filter(r => r && r.id !== rowId) };
          }
          return el;
        }
        let nestedChanged = false;
        const newNestedRows = el.nestedRows.map(r => {
          if (!r || !r.elements) return r;
          const updatedElements = this.deleteDeepRow(r.elements, rowId);
          if (updatedElements !== r.elements) {
            nestedChanged = true;
            return { ...r, elements: updatedElements };
          }
          return r;
        });
        if (nestedChanged) {
          anyChanged = true;
          return { ...el, nestedRows: newNestedRows };
        }
      }
      return el;
    });
    return anyChanged ? newElements : elements;
  }

  addElementToRow(element: FormElement, rowId: string, index?: number) {
    let changed = false;
    const rows = this._rows() || [];
    const newRows = rows.map(row => {
      if (!row) return row;
      if (row.id === rowId) {
        const updatedElements = row.elements ? [...row.elements] : [];
        if (index !== undefined) {
          updatedElements.splice(index, 0, element);
        } else {
          updatedElements.push(element);
        }
        changed = true;
        return { ...row, elements: updatedElements };
      }
      if (!row.elements) return row;
      const updatedElements = this.updateDeepAddElementToRow(row.elements, rowId, element, index);
      if (updatedElements !== row.elements) {
        changed = true;
        return { ...row, elements: updatedElements };
      }
      return row;
    });

    if (changed) {
      startViewTransition(() => {
        this._rows.set(newRows);
        this.appRef.tick();
      });
    }
  }

  private updateDeepAddElementToRow(elements: FormElement[] | undefined, rowId: string, newEl: FormElement, index?: number): FormElement[] {
    if (!elements) return [];
    let anyChanged = false;
    const newElements = elements.map(el => {
      if (!el || !el.nestedRows) return el;
      let nestedChanged = false;
      const newNestedRows = el.nestedRows.map(r => {
        if (!r) return r;
        if (r.id === rowId) {
          const updatedEls = r.elements ? [...r.elements] : [];
          if (index !== undefined) updatedEls.splice(index, 0, newEl);
          else updatedEls.push(newEl);
          nestedChanged = true;
          return { ...r, elements: updatedEls };
        }
        if (!r.elements) return r;
        const updatedElements = this.updateDeepAddElementToRow(r.elements, rowId, newEl, index);
        if (updatedElements !== r.elements) {
          nestedChanged = true;
          return { ...r, elements: updatedElements };
        }
        return r;
      });
      if (nestedChanged) {
        anyChanged = true;
        return { ...el, nestedRows: newNestedRows };
      }
      return el;
    });
    return anyChanged ? newElements : elements;
  }

  deleteElementFromRow(elementId: string) {
    let changed = false;
    const rows = this._rows() || [];
    const newRows = rows.map(row => {
      if (!row || !row.elements) return row;
      const updatedElements = this.deleteDeep(row.elements, elementId);
      if (updatedElements !== row.elements) {
        changed = true;
        return { ...row, elements: updatedElements };
      }
      return row;
    });

    if (changed) {
      startViewTransition(() => {
        this._rows.set(newRows);
        this.appRef.tick();
      });
    }
  }

  private deleteDeep(elements: FormElement[] | undefined, id: string): FormElement[] {
    if (!elements) return [];
    let anyChanged = false;

    // First, check if any element at this level should be filtered out
    const filteredElements = elements.filter(el => el && el.id !== id);
    if (filteredElements.length !== elements.length) {
      anyChanged = true;
    }

    const newElements = filteredElements.map(el => {
      if (!el) return el;
      let elChanged = false;
      let newNestedRows = el.nestedRows;
      let newChildren = el.children;

      if (el.nestedRows) {
        newNestedRows = el.nestedRows.map(r => {
          if (!r || !r.elements) return r;
          const updatedElements = this.deleteDeep(r.elements, id);
          if (updatedElements !== r.elements) {
            elChanged = true;
            return { ...r, elements: updatedElements };
          }
          return r;
        });
      }

      if (el.children) {
        newChildren = this.deleteDeep(el.children, id);
        if (newChildren !== el.children) {
          elChanged = true;
        }
      }

      if (elChanged) {
        anyChanged = true;
        return { ...el, nestedRows: newNestedRows, children: newChildren };
      }
      return el;
    });

    return anyChanged ? newElements : elements;
  }

  moveElement(elementId: string, sourceContainerId: string, targetContainerId: string, targetIndex: number = -1) {
    let elementToMove: FormElement | undefined;
    const rows = this._rows() || [];

    // First: remove from source
    let sourceChanged = false;
    const rowsAfterRemoval = rows.map(row => {
      if (!row || !row.elements) return row;
      if (row.id === sourceContainerId) {
        const idx = row.elements.findIndex(e => e && e.id === elementId);
        if (idx !== -1) {
          elementToMove = row.elements[idx];
          const updated = [...row.elements];
          updated.splice(idx, 1);
          sourceChanged = true;
          return { ...row, elements: updated };
        }
      }
      const updatedElements = this.removeDeep(row.elements, elementId, (found) => elementToMove = found);
      if (updatedElements !== row.elements) {
        sourceChanged = true;
        return { ...row, elements: updatedElements };
      }
      return row;
    });

    if (!sourceChanged || !elementToMove) return;

    // Second: insert into target
    let targetChanged = false;
    const finalRows = rowsAfterRemoval.map(row => {
      if (!row) return row;
      if (row.id === targetContainerId) {
        const updated = row.elements ? [...row.elements] : [];
        if (targetIndex === -1) updated.push(elementToMove!);
        else updated.splice(targetIndex, 0, elementToMove!);
        targetChanged = true;
        return { ...row, elements: updated };
      }
      if (!row.elements) return row;
      const updatedElements = this.insertDeep(row.elements, targetContainerId, elementToMove!, targetIndex);
      if (updatedElements !== row.elements) {
        targetChanged = true;
        return { ...row, elements: updatedElements };
      }
      return row;
    });

    if (targetChanged) {
      startViewTransition(() => {
        this._rows.set(finalRows);
        this.appRef.tick();
      });
    }
  }

  private removeDeep(elements: FormElement[] | undefined, id: string, onFound: (el: FormElement) => void): FormElement[] {
    if (!elements) return [];
    let anyChanged = false;

    // Check if element is at this level
    const idx = elements.findIndex(el => el && el.id === id);
    if (idx !== -1) {
      onFound(elements[idx]);
      anyChanged = true;
      return elements.filter((_, i) => i !== idx);
    }

    const newElements = elements.map(el => {
      if (!el) return el;
      let elChanged = false;
      let newNestedRows = el.nestedRows;
      let newChildren = el.children;

      if (el.nestedRows) {
        newNestedRows = el.nestedRows.map(r => {
          if (!r || !r.elements) return r;
          const updatedElements = this.removeDeep(r.elements, id, onFound);
          if (updatedElements !== r.elements) {
            elChanged = true;
            return { ...r, elements: updatedElements };
          }
          return r;
        });
      }

      if (el.children) {
        newChildren = this.removeDeep(el.children, id, onFound);
        if (newChildren !== el.children) {
          elChanged = true;
        }
      }

      if (elChanged) {
        anyChanged = true;
        return { ...el, nestedRows: newNestedRows, children: newChildren };
      }
      return el;
    });

    return anyChanged ? newElements : elements;
  }

  private insertDeep(elements: FormElement[] | undefined, targetId: string, newEl: FormElement, index: number): FormElement[] {
    if (!elements) return [];
    let anyChanged = false;

    const newElements = elements.map(el => {
      if (!el || !el.nestedRows) return el;
      let nestedChanged = false;
      const newNestedRows = el.nestedRows.map(r => {
        if (!r) return r;
        if (r.id === targetId) {
          const updated = r.elements ? [...r.elements] : [];
          if (index === -1) updated.push(newEl);
          else updated.splice(index, 0, newEl);
          nestedChanged = true;
          return { ...r, elements: updated };
        }
        if (!r.elements) return r;
        const updatedElements = this.insertDeep(r.elements, targetId, newEl, index);
        if (updatedElements !== r.elements) {
          nestedChanged = true;
          return { ...r, elements: updatedElements };
        }
        return r;
      });
      if (nestedChanged) {
        anyChanged = true;
        return { ...el, nestedRows: newNestedRows };
      }
      return el;
    });

    return anyChanged ? newElements : elements;
  }

  setSelectedElement(elementId: string | null) {
    if (this._selectedElementId() === elementId) return;
    startViewTransition(() => {
      this._selectedElementId.set(elementId);
      this.appRef.tick();
    });
  }

  updateElement(elementId: string, data: Partial<FormElement>) {
    let changed = false;
    const rows = this._rows() || [];
    const newRows = rows.map(row => {
      if (!row || !row.elements) return row;
      const updatedElements = this.updateDeepProps(row.elements, elementId, data);
      if (updatedElements !== row.elements) {
        changed = true;
        return { ...row, elements: updatedElements };
      }
      return row;
    });

    if (changed) {
      startViewTransition(() => {
        this._rows.set(newRows);
        this.appRef.tick();
      });
    }
  }

  private updateDeepProps(elements: FormElement[] | undefined, id: string, data: Partial<FormElement>): FormElement[] {
    if (!elements) return [];
    let anyChanged = false;
    const newElements = elements.map(el => {
      if (!el) return el;
      if (el.id === id) {
        anyChanged = true;
        return { ...el, ...data };
      }

      let elChanged = false;
      let newNestedRows = el.nestedRows;
      let newChildren = el.children;

      if (el.nestedRows) {
        newNestedRows = el.nestedRows.map(r => {
          if (!r || !r.elements) return r;
          const updatedElements = this.updateDeepProps(r.elements, id, data);
          if (updatedElements !== r.elements) {
            elChanged = true;
            return { ...r, elements: updatedElements };
          }
          return r;
        });
      }

      if (el.children) {
        newChildren = this.updateDeepProps(el.children, id, data);
        if (newChildren !== el.children) {
          elChanged = true;
        }
      }

      if (elChanged) {
        anyChanged = true;
        return { ...el, nestedRows: newNestedRows, children: newChildren };
      }
      return el;
    });

    return anyChanged ? newElements : elements;
  }

  moveRowUp(rowId: string) {
    const rows = this._rows() || [];
    const index = rows.findIndex(r => r && r.id === rowId);

    if (index > 0) {
      startViewTransition(() => {
        const newRows = [...rows];
        [newRows[index - 1], newRows[index]] = [newRows[index], newRows[index - 1]];
        this._rows.set(newRows);
        this.appRef.tick();
      });
      return;
    }

    let changed = false;
    const newRows = rows.map(row => {
      if (!row || !row.elements) return row;
      const updatedElements = this.moveDeepRow(row.elements, rowId, -1);
      if (updatedElements !== row.elements) {
        changed = true;
        return { ...row, elements: updatedElements };
      }
      return row;
    });

    if (changed) {
      startViewTransition(() => {
        this._rows.set(newRows);
        this.appRef.tick();
      });
    }
  }

  moveRowDown(rowId: string) {
    const rows = this._rows() || [];
    const index = rows.findIndex(r => r && r.id === rowId);

    if (index !== -1 && index < rows.length - 1) {
      startViewTransition(() => {
        const newRows = [...rows];
        [newRows[index], newRows[index + 1]] = [newRows[index + 1], newRows[index]];
        this._rows.set(newRows);
        this.appRef.tick();
      });
      return;
    }

    let changed = false;
    const newRows = rows.map(row => {
      if (!row || !row.elements) return row;
      const updatedElements = this.moveDeepRow(row.elements, rowId, 1);
      if (updatedElements !== row.elements) {
        changed = true;
        return { ...row, elements: updatedElements };
      }
      return row;
    });

    if (changed) {
      startViewTransition(() => {
        this._rows.set(newRows);
        this.appRef.tick();
      });
    }
  }

  private moveDeepRow(elements: FormElement[] | undefined, rowId: string, direction: number): FormElement[] {
    if (!elements) return [];

    let anyElementChanged = false;
    const newElements = elements.map(el => {
      if (!el) return el;

      if (el.nestedRows) {
        const idx = el.nestedRows.findIndex(r => r && r.id === rowId);
        if (idx !== -1) {
          const targetIdx = idx + direction;
          if (targetIdx >= 0 && targetIdx < el.nestedRows.length) {
            const updatedRows = [...el.nestedRows];
            [updatedRows[idx], updatedRows[targetIdx]] = [updatedRows[targetIdx], updatedRows[idx]];
            anyElementChanged = true;
            return { ...el, nestedRows: updatedRows };
          }
          return el;
        }

        let nestedRowsChanged = false;
        const newNestedRows = el.nestedRows.map(row => {
          if (!row || !row.elements) return row;
          const updatedElements = this.moveDeepRow(row.elements, rowId, direction);
          if (updatedElements !== row.elements) {
            nestedRowsChanged = true;
            return { ...row, elements: updatedElements };
          }
          return row;
        });

        if (nestedRowsChanged) {
          anyElementChanged = true;
          return { ...el, nestedRows: newNestedRows };
        }
      }

      if (el.children) {
        const updatedChildren = this.moveDeepRow(el.children, rowId, direction);
        if (updatedChildren !== el.children) {
          anyElementChanged = true;
          return { ...el, children: updatedChildren };
        }
      }

      return el;
    });

    return anyElementChanged ? newElements : elements;
  }

}
