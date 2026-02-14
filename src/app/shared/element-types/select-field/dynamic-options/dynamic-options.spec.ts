import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicOptions } from './dynamic-options';

describe('DynamicOptions', () => {
  let component: DynamicOptions;
  let fixture: ComponentFixture<DynamicOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicOptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicOptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
