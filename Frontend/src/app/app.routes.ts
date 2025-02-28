import { Routes } from '@angular/router';
import { AddressPage } from './address/address';
import { LoginPage } from './login/login';

export const routes: Routes = [
    {path: 'address', component: AddressPage},    
    {path: 'login', component: LoginPage},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
];
