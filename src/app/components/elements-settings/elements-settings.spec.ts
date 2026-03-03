import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ElementsSettings } from './elements-settings';

describe('ElementsSettings', () => {
  let component: ElementsSettings;
  let fixture: ComponentFixture<ElementsSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementsSettings],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementsSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
