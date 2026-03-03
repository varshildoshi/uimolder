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
});
