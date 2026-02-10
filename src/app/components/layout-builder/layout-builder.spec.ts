import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutBuilder } from './layout-builder';
import { provideZonelessChangeDetection } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('LayoutBuilder', () => {
  let component: LayoutBuilder;
  let fixture: ComponentFixture<LayoutBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutBuilder, DragDropModule],
      providers: [provideZonelessChangeDetection()]
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
    expect(compiled.querySelector('main')).toBeTruthy(); // Canvas area
  });

  it('should have state management signals initialized', () => {
    // @ts-ignore - access protected/private for testing if needed, or make them public
    expect(component.canvasItems).toBeDefined();
    // @ts-ignore
    expect(component.selectedElementId).toBeDefined();
    // @ts-ignore
    expect(component.viewMode).toBeDefined();
    // @ts-ignore
    expect(component.activeFlavor).toBeDefined();
  });

  it('should add an item to canvasItems when dropped from toolbox', () => {
    const toolboxItem = { type: 'input', label: 'Text Field', props: {} };
    // @ts-ignore
    component.onDrop({
      previousContainer: { data: [toolboxItem] } as any,
      container: { data: component.canvasItems() } as any,
      previousIndex: 0,
      currentIndex: 0
    } as any);

    expect(component.canvasItems().length).toBe(1);
    expect(component.canvasItems()[0].type).toBe('input');
  });

  it('should reorder items in canvasItems when dropped within same container', () => {
    const item1 = { id: '1', type: 'input', label: 'Field 1', props: {} };
    const item2 = { id: '2', type: 'button', label: 'Button 2', props: {} };
    component.canvasItems.set([item1, item2]);

    const container = { data: component.canvasItems() };
    // @ts-ignore
    component.onDrop({
      previousContainer: container as any,
      container: container as any,
      previousIndex: 0,
      currentIndex: 1
    } as any);

    expect(component.canvasItems()[0].id).toBe('2');
    expect(component.canvasItems()[1].id).toBe('1');
  });
});