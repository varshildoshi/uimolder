import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ElementEditor } from './element-editor';

describe('ElementEditor', () => {
  let component: ElementEditor;
  let fixture: ComponentFixture<ElementEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementEditor],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
