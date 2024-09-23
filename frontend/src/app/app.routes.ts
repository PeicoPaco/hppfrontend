import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OperationsComponent } from './operations/operations.component';
import { RequestsComponent } from './requests/requests.component';
import { CreaterequestComponent } from './requests/createrequest/createrequest.component';
import { EditrequestComponent } from './requests/editrequest/editrequest.component';
import { StaffComponent } from './staff/staff.component';
import { CreatestaffComponent } from './staff/createstaff/createstaff.component';
import { EditstaffComponent } from './staff/editstaff/editstaff.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'operations', component: OperationsComponent, canActivate: [authGuard], data: { role: ['superadmin', 'admin', 'doctor'] } },
  { path: 'requests', component: RequestsComponent, canActivate: [authGuard], data: { role: ['superadmin', 'admin', 'doctor'] } },
  { path: 'requests/create', component: CreaterequestComponent, canActivate: [authGuard], data: { role: ['superadmin', 'admin', 'doctor'] } },
  { path: 'requests/:id', component: EditrequestComponent, canActivate: [authGuard], data: { role: ['superadmin', 'admin', 'doctor'] }  },
  { path: 'staff', component: StaffComponent, canActivate: [authGuard], data: { role: ['superadmin', 'admin'] } },
  { path: 'staff/create', component: CreatestaffComponent, canActivate: [authGuard], data: { role: ['superadmin'] } },
  { path: 'staff/:id', component: EditstaffComponent, canActivate: [authGuard], data: { role: ['superadmin', 'admin'] } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
