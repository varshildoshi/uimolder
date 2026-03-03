import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { DynamicOptions } from './dynamic-options';

describe('DynamicOptions', () => {
  let component: DynamicOptions;
  let fixture: ComponentFixture<DynamicOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicOptions],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicOptions);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
