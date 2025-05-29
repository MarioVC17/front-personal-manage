import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard, loginGuard } from './guards/auth.guard';
import { PersonListComponent } from './components/person-list/person-list.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthLayoutComponent,
        canActivate: [loginGuard],
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            // { path: 'dashboard' },
            { path: 'persons', component: PersonListComponent },
            { path: '', redirectTo: 'persons', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'auth' }
];
