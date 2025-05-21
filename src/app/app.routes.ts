import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { IssueCertComponent } from '../components/issue-cert/issue-cert.component';
import { VerifyCertComponent } from '../components/verify-cert/verify-cert.component';
import { StudentPageComponent } from '../components/student-page/student-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'auth', pathMatch: 'full'},
    {path: 'auth', component: AuthComponent},
    {path: 'issue', component: IssueCertComponent},
    {path: 'verify', component: VerifyCertComponent},
    {path: 'student', component: StudentPageComponent},
];
