import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './components/home/home';
import { Header } from './components/layout/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterOutlet],
  template: `
    <app-header />

    <main>
      <router-outlet />
    </main>
    `
})
export class App {
  protected readonly title = signal('uimolder');
}
