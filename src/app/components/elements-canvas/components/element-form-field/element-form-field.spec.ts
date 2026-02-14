import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementFormField } from './element-form-field';

describe('ElementFormField', () => {
  let component: ElementFormField;
  let fixture: ComponentFixture<ElementFormField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementFormField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementFormField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
