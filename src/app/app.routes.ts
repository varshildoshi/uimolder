import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LayoutBuilder } from './components/layout-builder/layout-builder';
import { PageNotFoundComponent } from './components/404/404';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'UiMolder | Architecting High-End UI'
    },
    { path: 'builder', component: LayoutBuilder }, // The Layout Builder
    { path: '**', component: PageNotFoundComponent }
];
