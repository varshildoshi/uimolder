import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ElementsMenu } from './elements-menu';

describe('ElementsMenu', () => {
  let component: ElementsMenu;
  let fixture: ComponentFixture<ElementsMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementsMenu],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementsMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
