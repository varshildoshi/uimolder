import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutBuilder } from './layout-builder';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ElementService } from '../../services/element.service';

describe('LayoutBuilder', () => {
  let component: LayoutBuilder;
  let fixture: ComponentFixture<LayoutBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutBuilder],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        ElementService
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

  it('should render main components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-elements-menu')).toBeTruthy();
    expect(compiled.querySelector('app-elements-canvas')).toBeTruthy();
    expect(compiled.querySelector('app-elements-settings')).toBeTruthy();
  });
});
