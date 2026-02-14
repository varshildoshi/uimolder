import { NgOptimizedImage } from '@angular/common';
import { Component, ViewChild, ElementRef, afterNextRender, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <header #headerElement class="fixed top-0 w-full z-[100] border-b border-white/5 bg-canvas/60 backdrop-blur-xl transition-all duration-300">
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

        <div class="hidden md:flex items-center gap-10">
          <nav class="flex items-center gap-8 text-[13px] font-medium text-slate-400 uppercase tracking-widest">
            <a href="#features" class="hover:text-brand-gold transition-colors">Features</a>
            <a href="#showcase" class="hover:text-brand-gold transition-colors">Showcase</a>
            <a href="#docs" class="hover:text-brand-gold transition-colors">Docs</a>
            <a href="#pricing" class="hover:text-brand-gold transition-colors">Pricing</a>
          </nav>
          
          <div class="h-4 w-[1px] bg-brand-dark-gold/50"></div>

          <div class="flex items-center gap-4">
             <button class="text-slate-400 text-sm font-medium hover:text-brand-gold transition-colors">Sign In</button>
             <button routerLink="/builder1" class="btn-primary px-6 py-2.5 font-semibold text-xs uppercase tracking-tight transition-all shadow-lg">
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
