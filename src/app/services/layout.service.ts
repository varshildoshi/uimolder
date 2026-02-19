import { Injectable, signal } from '@angular/core';

export type FlavorName = 'html' | 'tailwind' | 'material';
export type ViewMode = 'editor' | 'preview';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public readonly headerHeight = signal(128);
  public readonly activeFlavor = signal<FlavorName>('material');
  public readonly viewMode = signal<ViewMode>('editor');
}
