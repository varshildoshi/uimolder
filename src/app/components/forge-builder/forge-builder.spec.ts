import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgeBuilder } from './forge-builder';

describe('ForgeBuilder', () => {
  let component: ForgeBuilder;
  let fixture: ComponentFixture<ForgeBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgeBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgeBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
