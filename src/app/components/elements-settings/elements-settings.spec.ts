import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsSettings } from './elements-settings';

describe('ElementsSettings', () => {
  let component: ElementsSettings;
  let fixture: ComponentFixture<ElementsSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementsSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementsSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
