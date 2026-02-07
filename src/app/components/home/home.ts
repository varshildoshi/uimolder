import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Flavors } from './flavors/flavors';
import { Recursive } from './recursive/recursive';
import { Faq } from "../faq/faq";
import { Footer } from "../layout/footer/footer";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Hero,
    Flavors,
    Recursive,
    Faq,
    Footer
  ],
  template: `
    <main class="relative pt-32 pb-20 overflow-hidden bg-canvas">
      <app-hero />
      <app-flavors />
      <app-recursive />
      <app-faq />
      <app-footer />
    </main>
  `,
  styles: ``,
})
export class Home {

}
