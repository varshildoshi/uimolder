import { Routes } from '@angular/router';
import { Home } from './components/home/home';
// import { ForgeBuilder } from './components/forge-builder/forge-builder';
import { ForgeBuilderV2 } from './components/forge-builder-v2/forge-builder-v2';
import { ForgeBuilder } from './components/forge-builder/forge-builder';
import { LayoutBuilder } from './components/layout-builder/layout-builder';
import { PageNotFoundComponent } from './components/404/404';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'UiMolder | Architecting High-End UI'
    },
    { path: 'builder', component: LayoutBuilder }, // The New Builder
    { path: 'builder-v1', component: ForgeBuilder },
    { path: 'builder-v2', component: ForgeBuilderV2 },
    { path: '**', component: PageNotFoundComponent }
];
