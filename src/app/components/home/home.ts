import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <!-- <nav class="fixed top-0 w-full z-50 border-b border-white/5 bg-canvas/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-brand-indigo rounded-uimolder flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
             <span class="text-white font-bold">U</span>
          </div>
          <span class="text-2xl font-extrabold text-brand-gold tracking-tight">UiMolder</span>
        </div>
        
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" class="hover:text-brand-gold transition-colors">Features</a>
          <a href="#" class="hover:text-brand-gold transition-colors">Documentation</a>
          <a href="#" class="hover:text-brand-gold transition-colors">Showcase</a>
          <button class="btn-primary px-5 py-2 text-xs uppercase tracking-widest transition-all">
            Launch App
          </button>
        </div>
      </div>
    </nav>

    <main class="relative pt-32 pb-20 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-indigo/10 blur-[120px] rounded-full -z-10"></div>
      
      <div class="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-indigo/30 bg-brand-indigo/5 text-brand-indigo text-xs font-bold mb-8 animate-fade-in">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-indigo opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-indigo"></span>
          </span>
          ANGULAR 19 READY
        </div>

        <h1 class="text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tighter">
          Mold Your UI with <br>
          <span class="text-brand-gold">Absolute Joy.</span>
        </h1>

        <p class="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          The high-end architect for Angular developers. Design visually, nest infinitely, and export production-ready Tailwind, Material, or HTML.
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
          <button class="btn-primary text-lg px-10 py-4">
            Start Architecting
          </button>
          <button class="btn-outline text-lg px-10 py-4">
            Watch Demo
          </button>
        </div>

        <div class="mt-20 w-full max-w-5xl relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-brand-indigo to-brand-gold rounded-uimolder blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div class="relative bg-surface border border-white/10 rounded-uimolder aspect-video shadow-2xl overflow-hidden">
             <div class="absolute top-0 w-full h-8 bg-black/40 border-b border-white/5 flex items-center px-4 gap-2">
                <div class="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div class="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div class="w-2 h-2 rounded-full bg-green-500/50"></div>
             </div>
             <div class="flex items-center justify-center h-full text-slate-600 font-mono text-sm italic">
                [ Interactive Builder Preview Placeholder ]
             </div>
          </div>
        </div>
      </div>
    </main> -->

    <main class="relative pt-32 pb-20 overflow-hidden bg-canvas">
      
      <div class="absolute inset-0 z-0 opacity-20" 
           style="background-image: radial-gradient(var(--color-brand-indigo) 0.5px, transparent 0.5px); background-size: 30px 30px;">
      </div>
      
      <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-indigo/20 blur-[120px] rounded-full -z-10"></div>
      <div class="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-brand-gold/10 blur-[120px] rounded-full -z-10"></div>

      <div class="max-w-7xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
        
        <div class="relative mb-5 group animate-float">
          <div class="absolute inset-0 bg-brand-gold/25 blur-3xl rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <img ngSrc="assets/images/uimolder-logo.png" 
               width="300" 
               height="300" 
               priority 
               alt="UiMolder Icon" 
               class="relative z-10 drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]" />
        </div>

        <h1 class="text-6xl md:text-7xl font-black mb-5 tracking-tighter leading-[0.85]">
          <div class="animate-reveal delay-1">
            <span class="text-indigo-100/60">Drag. Compose.</span>
          </div>

          <div class="animate-reveal delay-2">
            <span class="uimolder-gradient-text bg-gradient-to-r from-brand-gold brand-light-gold to-brand-gold">
              Mold the Export.
            </span>
          </div>
        </h1>

        <p class="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 font-light leading-relaxed animate-reveal delay-3">
          The high-fidelity drag-and-drop architect for Angular. Build complex, 
          <span class="text-indigo-200/90 font-medium">recursive layouts</span> visually and 
          export production-ready <span class="text-brand-gold/90 font-medium font-mono">Tailwind, Material (Angular), or HTML</span> code.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 items-center">
          <button class="btn-primary text-lg px-5 py-5 shadow-[0_20px_50px_rgba(241,229,209,0.15)] hover:shadow-brand-gold/20 flex items-center gap-2 group">
            Start Architecting Free
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
          
          <button class="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors py-4 px-6">
            <div class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m7 4 12 8-12 8V4z"/></svg>
            </div>
            Watch the Magic
          </button>
        </div>

        <div class="mt-24 w-full max-w-6xl relative">
          <div class="absolute -top-12 -left-12 w-24 h-24 border-t-2 border-l-2 border-brand-indigo/30 rounded-tl-3xl hidden lg:block"></div>
          <div class="absolute -bottom-12 -right-12 w-24 h-24 border-b-2 border-r-2 border-brand-gold/30 rounded-br-3xl hidden lg:block"></div>

          <div class="relative bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden group">
            <div class="h-11 bg-white/[0.03] border-b border-white/5 flex items-center justify-between px-5">
              <div class="flex gap-2">
                <div class="w-3 h-3 rounded-full bg-white/10"></div>
                <div class="w-3 h-3 rounded-full bg-white/10"></div>
                <div class="w-3 h-3 rounded-full bg-white/10"></div>
              </div>
              <div class="text-[10px] text-slate-500 font-mono tracking-widest uppercase">UiMolder Engine v1.0 — Signals Mode</div>
              <div class="w-10"></div>
            </div>

            <div class="aspect-video bg-canvas p-4 grid grid-cols-12 gap-4">
              <div class="col-span-3 space-y-3">
                <div class="h-8 w-full bg-white/5 rounded-md"></div>
                <div class="h-32 w-full bg-white/[0.02] border border-white/5 rounded-md flex items-center justify-center">
                   <div class="w-12 h-12 rounded-uimolder bg-brand-indigo/20 border border-brand-indigo/40 animate-pulse"></div>
                </div>
              </div>
              <div class="col-span-9 bg-surface rounded-lg border border-white/5 flex items-center justify-center">
                 <div class="relative w-64 h-40 border border-brand-gold/20 rounded-lg flex items-center justify-center">
                    <div class="absolute inset-2 border border-brand-indigo/20 rounded-md"></div>
                    <span class="text-brand-gold text-[10px] font-mono">RECURSIVE_CONTAINER</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: ``,
})
export class Home {

}
