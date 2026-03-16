import { Injectable, signal } from '@angular/core';
import { FlavorName } from '../models/element';

export type ViewMode = 'editor' | 'preview';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  readonly headerHeight = signal(128);
  readonly activeFlavor = signal<FlavorName>('material');
  readonly viewMode = signal<ViewMode>('editor');
}
