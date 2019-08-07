import {Routes} from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';





export const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'register', component: RegistrationComponent},
    {path: 'admindashboard', component: AdminDashboardComponent},
    {path: 'userdashboard', component: UserDashboardComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
