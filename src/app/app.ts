import { Component, ViewChild, afterNextRender, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/layout/header/header';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterOutlet],
  template: `
    <app-header #appHeader />

    <main>
      <router-outlet />
    </main>
    `
})
export class App {
  protected readonly title = signal('uimolder');

  @ViewChild('appHeader')
  private appHeader!: Header;

  public layoutService = inject(LayoutService);

  public constructor() {
    afterNextRender(() => {
      if (this.appHeader) {
        this.layoutService.headerHeight.set(this.appHeader.headerHeight());
      }
    });
  }
}
