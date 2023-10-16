import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared-module';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { UserCertidoesComponent } from './user-certidoes/user-certidoes.component';
import { UserCertidoesCrudComponent } from './user-certidoes/user-certidoes-crud/user-certidoes-crud.component';
import { UserInfracoesComponent } from './user-infracoes/user-infracoes.component';
import { UserInfracoesCrudComponent } from './user-infracoes/user-infracoes-crud/user-infracoes-crud.component';
import { UserVistoriadepontosComponent } from './user-vistoriadepontos/user-vistoriadepontos.component';
import { UserVistoriadepontosCrudComponent } from './user-vistoriadepontos/user-vistoriadepontos-crud/user-vistoriadepontos-crud.component';
import { UserAlvaraPagamentoComponent } from './user-alvara-pagamento/user-alvara-pagamento.component';
import { UserInfracoesInformarPagamentoComponent } from './user-infracoes/user-infracoes-informar-pagamento/user-infracoes-informar-pagamento.component';
import { UserAlvaraPagamentoInformarPagamentoComponent } from './user-alvara-pagamento/user-alvara-pagamento-informar-pagamento/user-alvara-pagamento-informar-pagamento.component';

const ROUTER: Routes = [
  {
    path: '',
    children: [
      { path: 'certidoes', component: UserCertidoesComponent },
      { path: 'certidoes/novo', component: UserCertidoesCrudComponent },
      {
        path: 'certidoes/alterar/:id',
        component: UserCertidoesCrudComponent,
      },
      { path: 'infracoes', component: UserInfracoesComponent },
      { path: 'infracoes/novo', component: UserInfracoesCrudComponent },
      {
        path: 'infracoes/alterar/:id',
        component: UserInfracoesCrudComponent,
      },
      {
        path: 'vistoriasdepontos',
        component: UserVistoriadepontosComponent,
      },
      {
        path: 'vistoriasdepontos/novo',
        component: UserVistoriadepontosCrudComponent,
      },
      {
        path: 'vistoriasdepontos/alterar/:id',
        component: UserVistoriadepontosCrudComponent,
      },
      { path: 'alvarapagamento', component: UserAlvaraPagamentoComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTER),
    SharedModule,
    NgxMaskModule.forChild(),
    NgxCurrencyModule,
  ],
  declarations: [
    UserCertidoesComponent,
    UserInfracoesComponent,
    UserVistoriadepontosComponent,
    UserVistoriadepontosCrudComponent,
    UserInfracoesCrudComponent,
    UserCertidoesCrudComponent,
    UserInfracoesInformarPagamentoComponent,
    UserAlvaraPagamentoComponent,
    UserAlvaraPagamentoInformarPagamentoComponent,
  ],
})
export class UserLancamentosModule {}
