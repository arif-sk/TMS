import {Routes} from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminRoleGuard } from './_guards/adminRole.guard';
import { UserRoleGuard } from './_guards/userRole.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Routes = [
    {path: '', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'pageNotFount', component: PageNotFoundComponent},
    {path: 'admindashboard', component: AdminDashboardComponent, canActivate: [AdminRoleGuard]},
    {path: 'userdashboard', component: UserDashboardComponent, canActivate: [UserRoleGuard]},
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
