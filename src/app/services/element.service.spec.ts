import { TestBed } from '@angular/core/testing';
import { ElementService } from './element.service';
import { FormElement } from '../models/element';
import { ElementRow } from '../models/element-row';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ElementService', () => {
  let service: ElementService;

  beforeEach(() => {
    // Mock startViewTransition to be synchronous
    (window as any).document.startViewTransition = (callback: () => void) => {
      callback();
      return {
        finished: Promise.resolve(),
        ready: Promise.resolve(),
        updateCallbackDone: Promise.resolve(),
        skipTransition: () => {}
      };
    };

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(ElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should support infinite nesting for findDeep', () => {
    const rootRowId = 'root-row';
    const card1Id = 'card-1';
    const nestedRowId = 'nested-row-1';
    const card2Id = 'card-2';
    const deepNestedRowId = 'deep-nested-row-2';
    const leafElementId = 'leaf-element';

    const leafElement: FormElement = {
      id: leafElementId,
      type: 'text',
      label: 'Leaf',
      required: false
    };

    const deepNestedRow: ElementRow = {
      id: deepNestedRowId,
      elements: [leafElement]
    };

    const card2: FormElement = {
      id: card2Id,
      type: 'card',
      label: 'Card 2',
      required: false,
      nestedRows: [deepNestedRow]
    };

    const nestedRow: ElementRow = {
      id: nestedRowId,
      elements: [card2]
    };

    const card1: FormElement = {
      id: card1Id,
      type: 'card',
      label: 'Card 1',
      required: false,
      nestedRows: [nestedRow]
    };

    // Manually set rows for testing findDeep
    (service as any)._rows.set([{
      id: rootRowId,
      elements: [card1]
    }]);

    // Test findDeep through selectedElement or private findDeep if we can
    service.setSelectedElement(leafElementId);
    expect(service.selectedElement()?.id).toBe(leafElementId);
    
    service.setSelectedElement(card2Id);
    expect(service.selectedElement()?.id).toBe(card2Id);
  });

  it('should correctly remove element from deep nesting', () => {
    const rootRowId = 'root-row';
    const cardId = 'card-1';
    const nestedRowId = 'nested-row-1';
    const elementId = 'target-element';

    const element: FormElement = { id: elementId, type: 'text', label: 'Target', required: false };
    const nestedRow: ElementRow = { id: nestedRowId, elements: [element] };
    const card: FormElement = { id: cardId, type: 'card', label: 'Card', required: false, nestedRows: [nestedRow] };

    (service as any)._rows.set([{ id: rootRowId, elements: [card] }]);

    service.deleteElementFromRow(elementId);

    const updatedRows = service.rows();
    const updatedCard = updatedRows[0].elements[0];
    expect(updatedCard.nestedRows![0].elements.length).toBe(0);
  });

  it('should correctly insert element into deep nesting', () => {
    const rootRowId = 'root-row';
    const cardId = 'card-1';
    const nestedRowId = 'nested-row-1';
    const newElementId = 'new-element';

    const nestedRow: ElementRow = { id: nestedRowId, elements: [] };
    const card: FormElement = { id: cardId, type: 'card', label: 'Card', required: false, nestedRows: [nestedRow] };

    (service as any)._rows.set([{ id: rootRowId, elements: [card] }]);

    const newElement: FormElement = { id: newElementId, type: 'text', label: 'New', required: false };
    service.addElementToRow(newElement, nestedRowId);

    const updatedRows = service.rows();
    const updatedCard = updatedRows[0].elements[0];
    expect(updatedCard.nestedRows![0].elements[0].id).toBe(newElementId);
  });

  it('should generate nested IDs with priority (deeper first)', () => {
    const rootRowId = 'root-row';
    const card1Id = 'card-1';
    const nestedRow1Id = 'nested-row-1';
    const card2Id = 'card-2';
    const nestedRow2Id = 'nested-row-2';

    const nestedRow2: ElementRow = { id: nestedRow2Id, elements: [] };
    const card2: FormElement = { id: card2Id, type: 'card', label: 'Card 2', required: false, nestedRows: [nestedRow2] };
    const nestedRow1: ElementRow = { id: nestedRow1Id, elements: [card2] };
    const card1: FormElement = { id: card1Id, type: 'card', label: 'Card 1', required: false, nestedRows: [nestedRow1] };

    (service as any)._rows.set([{ id: rootRowId, elements: [card1] }]);

    const containerIds = service.allContainerIds();

    // Deeper nested (nestedRow2Id) should be before its parent (nestedRow1Id)
    // and both should be before top-level (rootRowId)
    const idxRoot = containerIds.indexOf(rootRowId);
    const idxRow1 = containerIds.indexOf(nestedRow1Id);
    const idxRow2 = containerIds.indexOf(nestedRow2Id);

    expect(idxRow2).toBeLessThan(idxRow1);
    expect(idxRow1).toBeLessThan(idxRoot);
  });

  it('should correctly move element from top level to deep nested row', () => {
    const rootRowId = 'root-row';
    const elementId = 'target-element';
    const cardId = 'card-1';
    const nestedRowId = 'nested-row-1';

    const element: FormElement = { id: elementId, type: 'text', label: 'Target', required: false };
    const nestedRow: ElementRow = { id: nestedRowId, elements: [] };
    const card: FormElement = { id: cardId, type: 'card', label: 'Card', required: false, nestedRows: [nestedRow] };

    (service as any)._rows.set([{ 
      id: rootRowId, 
      elements: [element, card] 
    }]);

    service.moveElement(elementId, rootRowId, nestedRowId, 0);

    const updatedRows = service.rows();
    expect(updatedRows[0].elements.length).toBe(1); // Only card left
    expect(updatedRows[0].elements[0].id).toBe(cardId);
    expect(updatedRows[0].elements[0].nestedRows![0].elements[0].id).toBe(elementId);
  });

  it('should correctly move element between different nested rows', () => {
    const rootRowId = 'root-row';
    const card1Id = 'card-1';
    const nestedRow1Id = 'nested-row-1';
    const card2Id = 'card-2';
    const nestedRow2Id = 'nested-row-2';
    const elementId = 'target-element';

    const element: FormElement = { id: elementId, type: 'text', label: 'Target', required: false };
    const nestedRow1: ElementRow = { id: nestedRow1Id, elements: [element] };
    const nestedRow2: ElementRow = { id: nestedRow2Id, elements: [] };
    
    const card1: FormElement = { id: card1Id, type: 'card', label: 'Card 1', required: false, nestedRows: [nestedRow1] };
    const card2: FormElement = { id: card2Id, type: 'card', label: 'Card 2', required: false, nestedRows: [nestedRow2] };

    (service as any)._rows.set([{ 
      id: rootRowId, 
      elements: [card1, card2] 
    }]);

    service.moveElement(elementId, nestedRow1Id, nestedRow2Id, 0);

    const updatedRows = service.rows();
    const updatedCard1 = updatedRows[0].elements[0];
    const updatedCard2 = updatedRows[0].elements[1];
    
    expect(updatedCard1.nestedRows![0].elements.length).toBe(0);
    expect(updatedCard2.nestedRows![0].elements[0].id).toBe(elementId);
  });

  it('should correctly identify descendants with isDescendantOf', () => {
    const card1Id = 'card-1';
    const row1Id = 'row-1';
    const card2Id = 'card-2';
    const row2Id = 'row-2';
    const leafId = 'leaf-1';

    const leaf: FormElement = { id: leafId, type: 'text', label: 'Leaf', required: false };
    const row2: ElementRow = { id: row2Id, elements: [leaf] };
    const card2: FormElement = { id: card2Id, type: 'card', label: 'Card 2', required: false, nestedRows: [row2] };
    const row1: ElementRow = { id: row1Id, elements: [card2] };
    const card1: FormElement = { id: card1Id, type: 'card', label: 'Card 1', required: false, nestedRows: [row1] };

    (service as any)._rows.set([{ id: 'root', elements: [card1] }]);

    expect(service.isDescendantOf(card1Id, card2Id)).toBeTrue();
    expect(service.isDescendantOf(card1Id, leafId)).toBeTrue();
    expect(service.isDescendantOf(card2Id, leafId)).toBeTrue();
    
    // Row ID tests
    expect(service.isDescendantOf(card1Id, row1Id)).toBeTrue();
    expect(service.isDescendantOf(card1Id, row2Id)).toBeTrue();
    expect(service.isDescendantOf(card2Id, row2Id)).toBeTrue();
    
    expect(service.isDescendantOf(card2Id, card1Id)).toBeFalse();
    expect(service.isDescendantOf(leafId, card1Id)).toBeFalse();
    expect(service.isDescendantOf(card2Id, row1Id)).toBeFalse();
  });
});





