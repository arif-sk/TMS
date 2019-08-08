import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule, TabsModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { appRoutes } from './routes';
import { FormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LoginService } from './_services/login.service';
import { AlertifyService } from './_services/alertify.service';
import { AdminDashboardService } from './_services/admin-dashboard.service';
import { UserDashboardService } from './_services/user-dashboard.service';
import { AuthGuard } from './_guards/auth.guard';
import { AdminRoleGuard } from './_guards/adminRole.guard';
import { UserRoleGuard } from './_guards/userRole.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


export function tokenGetter() {
   return localStorage.getItem('token');
}
@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      RegistrationComponent,
      LoginComponent,
      AdminDashboardComponent,
      UserDashboardComponent,
      PageNotFoundComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      BsDatepickerModule.forRoot(),
      ModalModule.forRoot(),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000', 'localhost:12381'],
            blacklistedRoutes: ['localhost:5000/api/auth', 'localhost:12321/api/auth']
         }
      })
   ],
   providers: [
      LoginService,
      AlertifyService,
      AdminDashboardService,
      UserDashboardService,
      AuthGuard, AdminRoleGuard, UserRoleGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
