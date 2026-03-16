import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardContainerComponent } from './card-container';
import { ElementService } from '../../../services/element.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormElement } from '../../../models/element';
import { ElementRow } from '../../../models/element-row';

describe('CardContainerComponent', () => {
  let component: CardContainerComponent;
  let fixture: ComponentFixture<CardContainerComponent>;
  let elementService: ElementService;

  beforeEach(async () => {
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

    await TestBed.configureTestingModule({
      imports: [CardContainerComponent, DragDropModule],
      providers: [
        provideZonelessChangeDetection(),
        ElementService
      ]
    }).compileComponents();

    elementService = TestBed.inject(ElementService);
    fixture = TestBed.createComponent(CardContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('element', {
      id: 'card-1',
      type: 'card',
      label: 'Card',
      required: false,
      nestedRows: []
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should correctly handle moving an element from top-level to nested row via onDropInside', () => {
    const rootRowId = 'root-row';
    const nestedRowId = 'nested-row-1';
    const elementId = 'element-1';

    const elementToMove: FormElement = {
      id: elementId,
      type: 'text',
      label: 'To Move',
      required: false
    };

    const cardElement: FormElement = {
      id: 'card-1',
      type: 'card',
      label: 'Card',
      required: false,
      nestedRows: [{ id: nestedRowId, elements: [] }]
    };

    // Initialize service state
    (elementService as any).rowsSignal.set([
      { id: rootRowId, elements: [elementToMove, cardElement] }
    ]);

    fixture.componentRef.setInput('element', cardElement);
    fixture.detectChanges();

    // Mock CdkDragDrop event
    const mockEvent: Partial<CdkDragDrop<string>> = {
      container: { id: nestedRowId, data: nestedRowId } as any,
      previousContainer: { id: rootRowId, data: rootRowId } as any,
      item: { data: elementToMove } as any,
      currentIndex: 0,
      previousIndex: 0
    };

    component.onDropInside(mockEvent as CdkDragDrop<string>, nestedRowId);

    const updatedRows = elementService.rows();
    const updatedRootRow = updatedRows.find(r => r.id === rootRowId);
    const updatedCard = updatedRootRow?.elements.find(el => el.id === 'card-1');
    
    expect(updatedRootRow?.elements.length).toBe(1);
    expect(updatedRootRow?.elements[0].id).toBe('card-1');
    expect(updatedCard?.nestedRows?.[0].elements.length).toBe(1);
    expect(updatedCard?.nestedRows?.[0].elements[0].id).toBe(elementId);
  });

  it('should correctly handle moving an element between two nested rows', () => {
    const rootRowId = 'root-row';
    const nestedRow1Id = 'nested-row-1';
    const nestedRow2Id = 'nested-row-2';
    const elementId = 'element-1';

    const elementToMove: FormElement = {
      id: elementId,
      type: 'text',
      label: 'To Move',
      required: false
    };

    const cardElement: FormElement = {
      id: 'card-1',
      type: 'card',
      label: 'Card',
      required: false,
      nestedRows: [
        { id: nestedRow1Id, elements: [elementToMove] },
        { id: nestedRow2Id, elements: [] }
      ]
    };

    // Initialize service state
    (elementService as any).rowsSignal.set([
      { id: rootRowId, elements: [cardElement] }
    ]);

    fixture.componentRef.setInput('element', cardElement);
    fixture.detectChanges();

    // Mock CdkDragDrop event: Move from row 1 to row 2
    const mockEvent: Partial<CdkDragDrop<string>> = {
      container: { id: nestedRow2Id, data: nestedRow2Id } as any,
      previousContainer: { id: nestedRow1Id, data: nestedRow1Id } as any,
      item: { data: elementToMove } as any,
      currentIndex: 0,
      previousIndex: 0
    };

    component.onDropInside(mockEvent as CdkDragDrop<string>, nestedRow2Id);

    const updatedRows = elementService.rows();
    const updatedCard = updatedRows[0].elements[0];
    
    expect(updatedCard.nestedRows?.[0].elements.length).toBe(0);
    expect(updatedCard.nestedRows?.[1].elements.length).toBe(1);
    expect(updatedCard.nestedRows?.[1].elements[0].id).toBe(elementId);
  });
});

