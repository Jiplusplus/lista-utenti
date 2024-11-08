import { Routes } from '@angular/router';
import { FormEditingComponent } from './form-editing/form-editing.component';
import { ListaComponent } from './lista/lista.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/editing'},
    {path: 'editing', component: FormEditingComponent, canActivate: [authGuard]},
    {path: 'form', component: FormComponent, canActivate: [authGuard]},
    {path: 'lista', component: ListaComponent, canActivate: [authGuard]},
    {path:'login', component: LoginComponent},
];
