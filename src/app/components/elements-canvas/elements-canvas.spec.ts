import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ElementsCanvas } from './elements-canvas';

describe('ElementsCanvas', () => {
  let component: ElementsCanvas;
  let fixture: ComponentFixture<ElementsCanvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementsCanvas],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementsCanvas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
