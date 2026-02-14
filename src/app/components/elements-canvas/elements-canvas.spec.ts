import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsCanvas } from './elements-canvas';

describe('ElementsCanvas', () => {
  let component: ElementsCanvas;
  let fixture: ComponentFixture<ElementsCanvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementsCanvas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementsCanvas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
