import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { Recursive } from './recursive';

describe('Recursive', () => {
  let component: Recursive;
  let fixture: ComponentFixture<Recursive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recursive],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recursive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
