import {Routes} from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';




export const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'register', component: RegistrationComponent},
    {path: 'admindashboard', component: AdminDashboardComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
