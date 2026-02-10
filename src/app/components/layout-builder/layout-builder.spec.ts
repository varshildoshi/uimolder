import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutBuilder } from './layout-builder';
import { provideZonelessChangeDetection } from '@angular/core';

describe('LayoutBuilder', () => {
  let component: LayoutBuilder;
  let fixture: ComponentFixture<LayoutBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutBuilder],
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
});