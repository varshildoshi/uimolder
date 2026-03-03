import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ElementButton } from './element-button';

describe('ElementButton', () => {
  let component: ElementButton;
  let fixture: ComponentFixture<ElementButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementButton],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementButton);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('element', {
      type: 'text',
      label: 'Test',
      icon: ''
    } as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
