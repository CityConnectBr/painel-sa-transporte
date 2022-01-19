import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './security/loggedin.guard';
import { UserLoginComponent } from './views/user/user-login/user-login.component';
import { UserRecuperarSenhaComponent } from './views/user/user-recuperar-senha/user-recuperar-senha.component';

const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'recuperarsenha', component: UserRecuperarSenhaComponent },
  {
    path: 'user',
    loadChildren: () => import('./views/user/user.module').then(mod => mod.UserModule),
    canLoad: [LoggedInGuard],
    canActivate: [LoggedInGuard]
  },
  { path: '**', component: UserLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
