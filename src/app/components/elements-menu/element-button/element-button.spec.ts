import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementButton } from './element-button';

describe('ElementButton', () => {
  let component: ElementButton;
  let fixture: ComponentFixture<ElementButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
