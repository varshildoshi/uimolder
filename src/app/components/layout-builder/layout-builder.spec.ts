import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutBuilder } from './layout-builder';
import { provideZonelessChangeDetection } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutService } from '../../services/layout.service';

describe('LayoutBuilder', () => {
  let component: LayoutBuilder;
  let fixture: ComponentFixture<LayoutBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutBuilder, DragDropModule],
      providers: [
        provideZonelessChangeDetection(),
        LayoutService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a header, sidebar, and canvas', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header')).toBeTruthy();
    expect(compiled.querySelector('aside')).toBeTruthy(); // Sidebar
    expect(compiled.querySelector('section')).toBeTruthy(); // Canvas area
  });

  it('should have state management signals initialized', () => {
    // @ts-ignore
    expect(component.formRows).toBeDefined();
    // @ts-ignore
    expect(component.selectedElementId).toBeDefined();
    // @ts-ignore
    expect(component.viewMode).toBeDefined();
    // @ts-ignore
    expect(component.activeFlavor).toBeDefined();
  });

  it('should add an item to formRows when dropped from toolbox', () => {
    const toolboxItem = { type: 'input', label: 'Text Field', props: {} };
    const rowId = component.formRows()[0].id;
    // @ts-ignore
    component.onDrop({
      previousContainer: { id: 'toolbox-list', data: [toolboxItem] } as any,
      container: { data: component.formRows()[0].fields } as any,
      previousIndex: 0,
      currentIndex: 0
    } as any, rowId);

    expect(component.formRows()[0].fields.length).toBe(1);
    expect(component.formRows()[0].fields[0].type).toBe('input');
  });

  it('should reorder items in formRows when dropped within same container', () => {
    const item1 = { id: '1', type: 'input', label: 'Field 1', props: {} };
    const item2 = { id: '2', type: 'button', label: 'Button 2', props: {} };
    const rowId = component.formRows()[0].id;
    
    component.formRows.update(rows => rows.map(r => r.id === rowId ? { ...r, fields: [item1, item2] } : r));

    const fields = component.formRows()[0].fields;
    const container = { data: fields };
    // @ts-ignore
    component.onDrop({
      previousContainer: container as any,
      container: container as any,
      previousIndex: 0,
      currentIndex: 1
    } as any, rowId);

    expect(component.formRows()[0].fields[0].id).toBe('2');
    expect(component.formRows()[0].fields[1].id).toBe('1');
  });
});