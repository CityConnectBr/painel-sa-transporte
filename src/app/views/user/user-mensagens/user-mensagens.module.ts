import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared-module';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { UserMensagensEnvioComponent } from './user-mensagens-envio/user-mensagens-envio.component';
import { UserMensagensEnviadasComponent } from './user-mensagens-enviadas/user-mensagens-enviadas.component';

const ROUTER: Routes = [
  {
    path: '',
    children: [
      { path: 'enviadas', component: UserMensagensEnviadasComponent },
      { path: 'envio', component: UserMensagensEnvioComponent },
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
  declarations: [UserMensagensEnvioComponent, UserMensagensEnviadasComponent],
})
export class UserMensagensModule {}
