import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OperationsComponent } from './operations/operations.component';
import { RequestsComponent } from './requests/requests.component';
import { CreaterequestComponent } from './requests/createrequest/createrequest.component';
import { EditrequestComponent } from './requests/editrequest/editrequest.component';
import { StaffComponent } from './staff/staff.component';
import { CreatestaffComponent } from './staff/createstaff/createstaff.component';
import { EditstaffComponent } from './staff/editstaff/editstaff.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'operations', component: OperationsComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'requests/create', component: CreaterequestComponent },
  { path: 'requests/:id', component: EditrequestComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'staff/create', component: CreatestaffComponent },
  { path: 'staff/:id', component: EditstaffComponent },
  { path: 'login', component: LoginComponent },
];
