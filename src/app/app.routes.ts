import { Routes } from '@angular/router';
import { Home } from './components/home/home';
// import { ForgeBuilder } from './components/forge-builder/forge-builder';
import { ForgeBuilderV2 } from './components/forge-builder-v2/forge-builder-v2';
import { ForgeBuilder } from './components/forge-builder/forge-builder';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'UiMolder | Architecting High-End UI'
    },
    { path: 'builder', component: ForgeBuilder }, // The Builder
    { path: 'builder1', component: ForgeBuilderV2 },
    { path: '**', redirectTo: '' }
];
