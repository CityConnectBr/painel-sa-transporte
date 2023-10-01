import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared-module';
import { UserImpressosModule } from '../user-impressos/user-impressos.module';
import { UserRelEntradaSaidaVeiculosComponent } from './user-rel-entrada-saida-veiculos/user-rel-entrada-saida-veiculos.component';
import { UserRelAlvarasExpiradosComponent } from './user-rel-alvaras-expirados/user-rel-alvaras-expirados.component';
import { UserRelCursosPermissionarioVencidosComponent } from './user-rel-cursos-permissionario-vencidos/user-rel-cursos-permissionario-vencidos.component';
import { UserRelCursosMonitorVencidosComponent } from './user-rel-cursos-monitor-vencidos/user-rel-cursos-monitor-vencidos.component';
import { UserRelCursosCondutorVencidosComponent } from './user-rel-cursos-condutor-vencidos/user-rel-cursos-condutor-vencidos.component';
import { UserRelDocumentosPermissionarioExpiradosComponent } from './user-rel-documentos-permissionario-expirados/user-rel-documentos-permissionario-expirados.component';

const ROUTER: Routes = [
  {
    path: '',
    children: [
      {
        path: 'entradasaidadeveiculos',
        component: UserRelEntradaSaidaVeiculosComponent,
      },
      {
        path: 'relatoriodealvarasexpirados',
        component: UserRelAlvarasExpiradosComponent,
      },
      {
        path: 'relatoriodecursospermissionariovencidos',
        component: UserRelCursosPermissionarioVencidosComponent,
      },
      {
        path: 'relatoriodecursosmonitorvencidos',
        component: UserRelCursosMonitorVencidosComponent,
      },
      {
        path: 'relatoriodecursoscondutorvencidos',
        component: UserRelCursosCondutorVencidosComponent,
      },
      {
        path: 'relatoriodocumentospermissionarioexpirados',
        component: UserRelDocumentosPermissionarioExpiradosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTER),
    SharedModule,
    NgxMaskModule.forChild(),
    NgxCurrencyModule,
    UserImpressosModule,
  ],
  declarations: [
    UserRelEntradaSaidaVeiculosComponent,
    UserRelAlvarasExpiradosComponent,
    UserRelCursosPermissionarioVencidosComponent,
    UserRelCursosMonitorVencidosComponent,
    UserRelCursosCondutorVencidosComponent,
    UserRelDocumentosPermissionarioExpiradosComponent,
  ],
})
export class UserRelatoriosModule {}
