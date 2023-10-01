import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared-module';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserRootComponent } from './user-root/user-root.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { UserSidebarComponent } from './user-root/user-sidebar/user-sidebar.component';
import { UserWelcomeComponent } from './user-welcome/user-welcome.component';

const ROUTER: Routes = [
  {
    path: '',
    component: UserRootComponent,
    children: [
      { path: '', component: UserWelcomeComponent },
      {
        path: 'cadastros',
        loadChildren: () =>
          import('./user-cadastros/user-cadastros.module').then(
            (m) => m.UserCadastrosModule
          ),
      },
      {
        path: 'lancamentos',
        loadChildren: () =>
          import('./user-lancamentos/user-lancamentos.module').then(
            (m) => m.UserLancamentosModule
          ),
      },
      {
        path: 'impressos',
        loadChildren: () =>
          import('./user-impressos/user-impressos.module').then(
            (m) => m.UserImpressosModule
          ),
      },
      {
        path: 'relatorios',
        loadChildren: () =>
          import('./user-relatorios/user-relatorios.module').then(
            (m) => m.UserRelatoriosModule
          ),
      },
      {
        path: 'mensagens',
        loadChildren: () =>
          import('./user-mensagens/user-mensagens.module').then(
            (m) => m.UserMensagensModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [
    UserHeaderComponent,
    UserRootComponent,
    UserSidebarComponent,
    UserWelcomeComponent,
  ],
  imports: [
    RouterModule.forChild(ROUTER),
    SharedModule,
    NgxMaskModule.forChild(),
    NgxCurrencyModule,
  ],
  exports: [],
})
export class UserModule {}
