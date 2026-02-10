import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgeBuilderV2 } from './forge-builder-v2';

describe('ForgeBuilderV2', () => {
  let component: ForgeBuilderV2;
  let fixture: ComponentFixture<ForgeBuilderV2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgeBuilderV2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgeBuilderV2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
