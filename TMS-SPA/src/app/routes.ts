import {Routes} from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from './_guards/auth.guard';





export const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'register', component: RegistrationComponent},
    {path: 'admindashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
    {path: 'userdashboard', component: UserDashboardComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
