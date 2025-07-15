import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    {
        path:"",
        component: Login
    },
    {
        path:"todo",
        //component: Dashboard
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path:"**",
        redirectTo: ""
    }
];
