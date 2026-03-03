import { ApplicationRef, computed, inject, Injectable, signal } from '@angular/core';
import { ElementRow } from '../models/element-row';
import { FormElement } from '../models/element';
import { startViewTransition } from '../utils/view-transition';

@Injectable({
  providedIn: 'root',
})
export class ElementService {

  private rowsSignal = signal<ElementRow[]>([]);
  private selectedElementIdSignal = signal<string | null>(null);
  readonly currentlyDraggedItem = signal<any | null>(null);
  readonly currentlyHoveredRowId = signal<string | null>(null);
  readonly rows = this.rowsSignal.asReadonly();

  private appRef = inject(ApplicationRef);

  readonly allContainerIds = computed(() => {
    const nestedIds: string[] = [];
    const topLevelIds: string[] = [];
    const rows = this.rowsSignal() || [];

    const getDeepIds = (elements: FormElement[] | undefined) => {
      if (!elements) return;
      elements.forEach(el => {
        if (!el) return;
        if (el.nestedRows) {
          el.nestedRows.forEach(r => {
            if (r) {
              // Recurse first (deeper children first)
              getDeepIds(r.elements);
              // Then push the row ID (post-order)
              nestedIds.push(r.id);
            }
          });
        }
        if (el.children) {
          getDeepIds(el.children);
        }
      });
    };

    rows.forEach(row => {
      if (row) {
        topLevelIds.push(row.id);
        getDeepIds(row.elements);
      }
    });

    // Return nested IDs first so CDK hit testing prioritizes them over top-level containers
    return [...nestedIds, ...topLevelIds];
  });

  readonly selectedElement = computed(() => {
    const rows = this.rowsSignal() || [];
    const id = this.selectedElementIdSignal();
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
    this.rowsSignal.set([
      {
        id: crypto.randomUUID(),
        elements: []
      }
    ]);
  }

  isDescendantOf(parentId: string, targetId: string): boolean {
    const rows = this.rowsSignal() || [];
    // 1. Find the parent element globally
    let parentElement: FormElement | undefined;
    for (const row of rows) {
      parentElement = this.findDeep(row.elements, parentId);
      if (parentElement) break;
    }

    if (!parentElement) return false;

    // 2. Check if targetId (element or row) is a descendant of parentElement
    return this.isInside(parentElement, targetId);
  }

  isAnyChildHovered(parentId: string): boolean {
    const hoveredId = this.currentlyHoveredRowId();
    if (!hoveredId || hoveredId === parentId) return false;
    return this.isDescendantOfRow(parentId, hoveredId);
  }

  private isDescendantOfRow(rowId: string, targetId: string): boolean {
    const rows = this.rowsSignal() || [];
    const row = this.findRowDeep(rows, rowId);
    if (!row) return false;

    for (const el of row.elements) {
      if (this.isInside(el, targetId)) return true;
    }
    return false;
  }

  private findRowDeep(rows: ElementRow[], id: string): ElementRow | undefined {
    for (const row of rows) {
      if (row.id === id) return row;
      for (const el of row.elements) {
        if (el.nestedRows) {
          const found = this.findRowDeep(el.nestedRows, id);
          if (found) return found;
        }
      }
    }
    return undefined;
  }

  private isInside(parent: FormElement, targetId: string): boolean {
    if (parent.nestedRows) {
      for (const row of parent.nestedRows) {
        if (row.id === targetId) return true;
        if (row.elements) {
          for (const el of row.elements) {
            if (el.id === targetId) return true;
            if (this.isInside(el, targetId)) return true;
          }
        }
      }
    }
    if (parent.children) {
      for (const child of parent.children) {
        if (child.id === targetId) return true;
        if (this.isInside(child, targetId)) return true;
      }
    }
    return false;
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
      this.appRef.tick();
    });

    const newRow: ElementRow = {
      id: crypto.randomUUID(),
      elements: []
    };
    this.rowsSignal.set([...this.rowsSignal(), newRow]);
    this.appRef.tick();
  }

  addRowToElement(elementId: string) {
    let changed = false;
    const rows = this.rowsSignal() || [];
    const newRows = rows.map(row => {
      if (!row || !row.elements) return row;
      const updatedChildren = this.updateDeepAddRow(row.elements, elementId);
      if (updatedChildren !== row.elements) {
        changed = true;
        return { ...row, elements: updatedChildren };
      }
      return row;
    });

    if (changed) {
      startViewTransition(() => {
        this.rowsSignal.set(newRows);
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
      // Add recursion for children if needed
      if (el.children) {
        const updatedChildren = this.updateDeepAddRow(el.children, targetId);
        if (updatedChildren !== el.children) {
          anyChanged = true;
          return { ...el, children: updatedChildren };
        }
      }
      return el;
    });
    return anyChanged ? newElements : elements;
  }

  deleteRow(rowId: string) {
    const rows = this.rowsSignal() || [];
    if (rows.some(r => r && r.id === rowId)) {
      if (rows.length === 1) return;
      startViewTransition(() => {
        this.rowsSignal.set(rows.filter(row => row && row.id !== rowId));
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
        this.rowsSignal.set(newRows);
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
      if (el.children) {
        const updatedChildren = this.deleteDeepRow(el.children, rowId);
        if (updatedChildren !== el.children) {
          anyChanged = true;
          return { ...el, children: updatedChildren };
        }
      }
      return el;
    });
    return anyChanged ? newElements : elements;
  }

  addElementToRow(element: FormElement, rowId: string, index?: number) {
    let changed = false;
    const rows = this.rowsSignal() || [];
    const newRows = rows.map(row => {
      if (!row) return row;
      if (row.id === rowId) {
        const updatedElements = row.elements ? [...row.elements] : [];
        if (index !== undefined && index !== -1) {
          updatedElements.splice(index, 0, element);
        } else {
          updatedElements.push(element);
        }
        changed = true;
        return { ...row, elements: updatedElements };
      }

      const updatedElements = this.updateDeepAddElementToRow(row.elements, rowId, element, index);
      if (updatedElements !== row.elements) {
        changed = true;
        return { ...row, elements: updatedElements };
      }
      return row;
    });

    if (changed) {
      startViewTransition(() => {
        this.rowsSignal.set(newRows);
        this.appRef.tick();
      });
    }
  }

  private updateDeepAddElementToRow(elements: FormElement[] | undefined, rowId: string, newEl: FormElement, index?: number): FormElement[] {
    if (!elements) return [];
    let anyChanged = false;
    const newElements = elements.map(el => {
      if (!el) return el;

      let elChanged = false;
      let newNestedRows = el.nestedRows;
      let newChildren = el.children;

      if (el.nestedRows) {
        newNestedRows = el.nestedRows.map(r => {
          if (!r) return r;
          if (r.id === rowId) {
            const updatedEls = r.elements ? [...r.elements] : [];
            if (index !== undefined && index !== -1) updatedEls.splice(index, 0, newEl);
            else updatedEls.push(newEl);
            elChanged = true;
            return { ...r, elements: updatedEls };
          }

          const updatedElements = this.updateDeepAddElementToRow(r.elements, rowId, newEl, index);
          if (updatedElements !== r.elements) {
            elChanged = true;
            return { ...r, elements: updatedElements };
          }
          return r;
        });
      }

      if (el.children) {
        const updatedChildren = this.updateDeepAddElementToRow(el.children, rowId, newEl, index);
        if (updatedChildren !== el.children) {
          newChildren = updatedChildren;
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

  deleteElementFromRow(elementId: string) {
    let changed = false;
    const rows = this.rowsSignal() || [];
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
        this.rowsSignal.set(newRows);
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
        const updatedElements = this.deleteDeep(el.children, id);
        if (updatedElements !== el.children) {
          newChildren = updatedElements;
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
    const rows = this.rowsSignal() || [];

    // 1. Globally find and remove the element (ignore sourceContainerId if not found there)
    const rowsAfterRemoval = rows.map(row => {
      if (!row || !row.elements) return row;
      const updatedElements = this.removeDeep(row.elements, elementId, (found) => {
        elementToMove = found;
      });
      if (updatedElements !== row.elements) {
        return { ...row, elements: updatedElements };
      }
      return row;
    });

    if (!elementToMove) return;

    // 2. Globally find the target container and insert
    const finalRows = rowsAfterRemoval.map(row => {
      if (!row) return row;
      if (row.id === targetContainerId) {
        const updated = row.elements ? [...row.elements] : [];
        if (targetIndex === -1) updated.push(elementToMove!);
        else updated.splice(targetIndex, 0, elementToMove!);
        return { ...row, elements: updated };
      }

      const updatedElements = this.insertDeep(row.elements, targetContainerId, elementToMove!, targetIndex);
      if (updatedElements !== row.elements) {
        return { ...row, elements: updatedElements };
      }
      return row;
    });

    startViewTransition(() => {
      this.appRef.tick();
    });

    this.rowsSignal.set(finalRows);
    this.appRef.tick();
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
        const updatedElements = this.removeDeep(el.children, id, onFound);
        if (updatedElements !== el.children) {
          newChildren = updatedElements;
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
      if (!el) return el;

      let elChanged = false;
      let newNestedRows = el.nestedRows;
      let newChildren = el.children;

      if (el.nestedRows) {
        newNestedRows = el.nestedRows.map(r => {
          if (!r) return r;
          if (r.id === targetId) {
            const updated = r.elements ? [...r.elements] : [];
            if (index === -1) updated.push(newEl);
            else updated.splice(index, 0, newEl);
            elChanged = true;
            return { ...r, elements: updated };
          }

          if (!r.elements) return r;
          const updatedElements = this.insertDeep(r.elements, targetId, newEl, index);
          if (updatedElements !== r.elements) {
            elChanged = true;
            return { ...r, elements: updatedElements };
          }
          return r;
        });
      }

      if (el.children) {
        const updatedChildren = this.insertDeep(el.children, targetId, newEl, index);
        if (updatedChildren !== el.children) {
          newChildren = updatedChildren;
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

  setSelectedElement(elementId: string | null) {
    if (this.selectedElementIdSignal() === elementId) return;
    startViewTransition(() => {
      this.selectedElementIdSignal.set(elementId);
      this.appRef.tick();
    });
  }

  updateElement(elementId: string, data: Partial<FormElement>) {
    let changed = false;
    const rows = this.rowsSignal() || [];
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
        this.rowsSignal.set(newRows);
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
        const updatedElements = this.updateDeepProps(el.children, id, data);
        if (updatedElements !== el.children) {
          newChildren = updatedElements;
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
    const rows = this.rowsSignal() || [];
    const index = rows.findIndex(r => r && r.id === rowId);

    if (index > 0) {
      startViewTransition(() => {
        const newRows = [...rows];
        [newRows[index - 1], newRows[index]] = [newRows[index], newRows[index - 1]];
        this.rowsSignal.set(newRows);
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
        this.rowsSignal.set(newRows);
        this.appRef.tick();
      });
    }
  }

  moveRowDown(rowId: string) {
    const rows = this.rowsSignal() || [];
    const index = rows.findIndex(r => r && r.id === rowId);

    if (index !== -1 && index < rows.length - 1) {
      startViewTransition(() => {
        const newRows = [...rows];
        [newRows[index], newRows[index + 1]] = [newRows[index + 1], newRows[index]];
        this.rowsSignal.set(newRows);
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
        this.rowsSignal.set(newRows);
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
