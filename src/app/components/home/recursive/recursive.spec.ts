import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recursive } from './recursive';

describe('Recursive', () => {
  let component: Recursive;
  let fixture: ComponentFixture<Recursive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recursive]
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
