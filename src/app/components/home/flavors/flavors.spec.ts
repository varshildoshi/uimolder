import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { Flavors } from './flavors';

describe('Flavors', () => {
  let component: Flavors;
  let fixture: ComponentFixture<Flavors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flavors],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Flavors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
