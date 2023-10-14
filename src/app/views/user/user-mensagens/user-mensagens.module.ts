import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared-module';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { UserMensagensEnvioComponent } from './user-mensagens-envio/user-mensagens-envio.component';
import { UserMensagensEnviadasComponent } from './user-mensagens-enviadas/user-mensagens-enviadas.component';
import { UserMensagensEnvioPermissionarioComponent } from './user-mensagens-envio/user-mensagens-envio-permissionario/user-mensagens-envio-permissionario.component';
import { UserMensagensEnvioCondutorComponent } from './user-mensagens-envio/user-mensagens-envio-condutor/user-mensagens-envio-condutor.component';
import { UserMensagensEnvioMonitorComponent } from './user-mensagens-envio/user-mensagens-envio-monitor/user-mensagens-envio-monitor.component';
import { UserMensagensEnvioFiscalComponent } from './user-mensagens-envio/user-mensagens-envio-fiscal/user-mensagens-envio-fiscal.component';

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
  declarations: [
    UserMensagensEnvioComponent,
    UserMensagensEnvioPermissionarioComponent,
    UserMensagensEnvioCondutorComponent,
    UserMensagensEnvioMonitorComponent,
    UserMensagensEnvioFiscalComponent,
    UserMensagensEnviadasComponent,
  ],
})
export class UserMensagensModule {}
