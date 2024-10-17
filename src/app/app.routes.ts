import { Routes } from '@angular/router';
import { FormEditingComponent } from './form-editing/form-editing.component';
import { ListaComponent } from './lista/lista.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/editing'},
    {path: 'editing', component: FormEditingComponent},
    {path: 'form', component: FormComponent},
    {path: 'lista', component: ListaComponent},
];
