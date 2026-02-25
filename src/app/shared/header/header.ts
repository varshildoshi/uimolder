import { NgOptimizedImage } from '@angular/common';
import { Component, ViewChild, ElementRef, afterNextRender, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <header #headerElement class="fixed top-0 w-full z-100 border-b border-white/5 bg-canvas/60 backdrop-blur-2xl transition-all duration-300 [view-transition-name:main-header]">
      <div class="max-w-7xl mx-auto px-6 h-32 flex items-center justify-between">
        <a routerLink="/" class="flex items-center group py-4">
          <img 
            ngSrc="assets/images/uimolder-logo-text-2.png" 
            width="300" 
            height="54" 
            priority
            alt="UiMolder Logo"
            class="transition-all duration-300" />
        </a>

        <div class="hidden md:flex items-center gap-5">
          <nav class="flex items-center gap-8 text-[13px] font-medium text-slate-400 uppercase tracking-widest">
            <a href="#features" class="hover:text-brand-gold transition-colors">Features</a>
            <a href="#showcase" class="hover:text-brand-gold transition-colors">Showcase</a>
            <a href="#docs" class="hover:text-brand-gold transition-colors">Docs</a>
            <a href="#pricing" class="hover:text-brand-gold transition-colors">Pricing</a>
          </nav>
          
          <div class="h-4 w-px bg-brand-dark-gold/50"></div>

          <div class="flex items-center gap-3">
             <button class="text-slate-400 text-sm font-medium hover:text-brand-gold transition-colors">Sign In</button>
             <button class="flex items-center gap-2 btn btn-primary btn-md" routerLink="/builder">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-puzzle">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                      d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
              </svg>
              Launch Builder
            </button>
          </div>
        </div>

        <button class="md:hidden text-brand-gold">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
           </svg>
        </button>
      </div>
    </header>
  `,
  styles: `
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
  `,
})
export class Header {
  @ViewChild('headerElement', { read: ElementRef })
  private headerElement!: ElementRef<HTMLElement>;

  public readonly headerHeight = signal(0);

  public constructor() {
    afterNextRender(() => {
      if (this.headerElement?.nativeElement) {
        this.headerHeight.set(this.headerElement.nativeElement.offsetHeight);
      }
    });
  }
}
