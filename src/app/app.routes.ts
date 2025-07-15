import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { AuthGuard } from './services/auth-guard';

export const routes: Routes = [
    {
        path:"",
        component: Login
    },
    {
        path:"todo",
        //component: Dashboard
        loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard),
        canActivate: [AuthGuard]
    },
    {
        path:"**",
        redirectTo: ""
    }
];
