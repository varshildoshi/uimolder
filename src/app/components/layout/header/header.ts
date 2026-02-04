import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="fixed top-0 w-full z-[100] border-b border-white/5 bg-canvas/60 backdrop-blur-xl transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a routerLink="/" class="flex items-center gap-3 group">
          <div class="w-9 h-9 bg-brand-indigo rounded-uimolder flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform">
             <span class="text-white font-bold text-sm">U</span>
          </div>
          <span class="text-xl font-bold text-brand-gold tracking-tight">UiMolder</span>
        </a>

        <div class="hidden md:flex items-center gap-10">
          <nav class="flex items-center gap-8 text-[13px] font-medium text-slate-400 uppercase tracking-widest">
            <a href="#features" class="hover:text-brand-gold transition-colors">Features</a>
            <a href="#showcase" class="hover:text-brand-gold transition-colors">Showcase</a>
            <a href="#docs" class="hover:text-brand-gold transition-colors">Docs</a>
            <a href="#pricing" class="hover:text-brand-gold transition-colors">Pricing</a>
          </nav>
          
          <div class="h-4 w-[1px] bg-white/10 mx-2"></div>

          <div class="flex items-center gap-4">
             <button class="text-slate-400 text-sm font-medium hover:text-white transition-colors">Sign In</button>
             <button class="bg-brand-gold text-black px-6 py-2.5 rounded-uimolder font-bold text-xs uppercase tracking-tighter hover:bg-white transition-all shadow-lg active:scale-95">
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
  styles: ``,
})
export class Header {

}
