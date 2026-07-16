import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Skills } from './components/skills/skills';
import { Error } from './components/error/error';
import { Projects } from './components/projects/projects';
import { Services } from './components/services/services';
import { Contact } from './components/contact/contact';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { isAdminGuard } from './Gaurds/is-admin-guard';

export const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'home' },
{path:"home", component:Home},
{path:"skills",component: Skills},
{path:"projects", component:Projects},
{ path:"services" ,component:Services },
{path:"contact",component:Contact},
{path:'login',component:Login},
{path:'dashboard', component:Dashboard,canActivate: [isAdminGuard]},
{ path: '**', component: Error }


];
