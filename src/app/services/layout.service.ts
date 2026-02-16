import { Injectable, signal } from '@angular/core';

export type FlavorName = 'html' | 'tailwind' | 'material';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public readonly headerHeight = signal(128);
  public readonly activeFlavor = signal<FlavorName>('material');
}
