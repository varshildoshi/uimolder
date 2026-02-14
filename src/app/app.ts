import { Component, ViewChild, afterNextRender, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from './services/layout.service';
import { Header } from './shared/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
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
