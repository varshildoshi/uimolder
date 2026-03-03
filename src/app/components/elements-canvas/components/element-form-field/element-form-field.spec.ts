import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ElementFormField } from './element-form-field';

describe('ElementFormField', () => {
  let component: ElementFormField;
  let fixture: ComponentFixture<ElementFormField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementFormField],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementFormField);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('element', {
      id: '1',
      type: 'text',
      label: 'Test',
      required: false
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
