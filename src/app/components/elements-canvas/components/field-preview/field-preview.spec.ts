import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { FieldPreview } from './field-preview';

describe('FieldPreview', () => {
  let component: FieldPreview;
  let fixture: ComponentFixture<FieldPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldPreview],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldPreview);
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
