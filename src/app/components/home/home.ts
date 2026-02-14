import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Flavors } from './flavors/flavors';
import { Recursive } from './recursive/recursive';
import { FaqComponent } from '../../shared/faq/faq';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Hero,
    Flavors,
    Recursive,
    FaqComponent,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
