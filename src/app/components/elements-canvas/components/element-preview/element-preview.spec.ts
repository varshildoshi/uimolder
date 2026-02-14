import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementPreview } from './element-preview';

describe('ElementPreview', () => {
  let component: ElementPreview;
  let fixture: ComponentFixture<ElementPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
