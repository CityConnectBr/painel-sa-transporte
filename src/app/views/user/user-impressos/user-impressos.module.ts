import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared-module';
import { UserFormulario1RenovacaoPermissionarioComponent } from './user-formulario1-renovacao-permissionario/user-formulario1-renovacao-permissionario.component';
import { UserFormulario119autorizacaoadesivacaocustpermissionarioComponent } from './user-formulario119autorizacaoadesivacaocustpermissionario/user-formulario119autorizacaoadesivacaocustpermissionario.component';
import { UserFormulario120solicitacaoafericaotaximetroComponent } from './user-formulario120solicitacaoafericaotaximetro/user-formulario120solicitacaoafericaotaximetro.component';
import { UserFormulario121solicitacaoafericaoautprovisoriaComponent } from './user-formulario121solicitacaoafericaoautprovisoria/user-formulario121solicitacaoafericaoautprovisoria.component';
import { UserFormulario122solicitacaoafericaoautprovisoriaescolarComponent } from './user-formulario122solicitacaoafericaoautprovisoriaescolar/user-formulario122solicitacaoafericaoautprovisoriaescolar.component';
import { UserFormulario126declaracaoparataxistaComponent } from './user-formulario126declaracaoparataxista/user-formulario126declaracaoparataxista.component';
import { UserFormulario127declaracaoparatransporteescolarComponent } from './user-formulario127declaracaoparatransporteescolar/user-formulario127declaracaoparatransporteescolar.component';
import { UserFormulario128formulariodedeclaracaoComponent } from './user-formulario128formulariodedeclaracao/user-formulario128formulariodedeclaracao.component';
import { UserFormulario129laudovistoriatransportesespeciaisComponent } from './user-formulario129laudovistoriatransportesespeciais/user-formulario129laudovistoriatransportesespeciais.component';
import { UserFormulario130notificacaoComponent } from './user-formulario130notificacao/user-formulario130notificacao.component';
import { UserFormulario131substituicaodeveiculoComponent } from './user-formulario131substituicaodeveiculo/user-formulario131substituicaodeveiculo.component';
import { UserFormulario132termodecredenciamentoComponent } from './user-formulario132termodecredenciamento/user-formulario132termodecredenciamento.component';
import { UserFormulario133termodecredenciamentotransporteescolarComponent } from './user-formulario133termodecredenciamentotransporteescolar/user-formulario133termodecredenciamentotransporteescolar.component';
import { UserFormulario134aipComponent } from './user-formulario134aip/user-formulario134aip.component';
import { UserFormulario135alvaraPermissaoComponent } from './user-formulario135alvara-permissao/user-formulario135alvara-permissao.component';
import { UserFormulario16solressarcimentoComponent } from './user-formulario16solressarcimento/user-formulario16solressarcimento.component';
import { UserFormulario17SolicitaacaoBaixaCondutorComponent } from './user-formulario17-solicitaacao-baixa-condutor/user-formulario17-solicitaacao-baixa-condutor.component';
import { UserFormulario18soltranspensinoComponent } from './user-formulario18soltranspensino/user-formulario18soltranspensino.component';
import { UserFormulario2ReqTransferenciaComponent } from './user-formulario2-req-transferencia/user-formulario2-req-transferencia.component';
import { UserFormulario3TransfpermtranspescolarComponent } from './user-formulario3-transfpermtranspescolar/user-formulario3-transfpermtranspescolar.component';
import { UserFormulario4TransfpermtransptaxiComponent } from './user-formulario4-transfpermtransptaxi/user-formulario4-transfpermtransptaxi.component';
import { UserFormulario5ReqsubstveiculoComponent } from './user-formulario5-reqsubstveiculo/user-formulario5-reqsubstveiculo.component';
import { UserFormulario6ReqprosubveiculoComponent } from './user-formulario6-reqprosubveiculo/user-formulario6-reqprosubveiculo.component';
import { UserFormulario7DeclaracaoMonitorComponent } from './user-formulario7-declaracao-monitor/user-formulario7-declaracao-monitor.component';
import { UserFormulario8CondutorAuxiliarComponent } from './user-formulario8-condutor-auxiliar/user-formulario8-condutor-auxiliar.component';
import { UserFormulario9declaracaoatenddispostoComponent } from './user-formulario9declaracaoatenddisposto/user-formulario9declaracaoatenddisposto.component';
import { UserImpressosComponent } from './user-impressos.component';

const ROUTER: Routes = [
  {
    path: '',
    children: [
      //formulario 1
      {
        path: 'formulariorenovacaopermissao',
        component: UserFormulario1RenovacaoPermissionarioComponent,
      },
      //formulario 2
      {
        path: 'formulariotransferencia',
        component: UserFormulario2ReqTransferenciaComponent,
      },
      //formulario 3
      {
        path: 'transferenciadepermissaodetransporte',
        component: UserFormulario3TransfpermtranspescolarComponent,
      },
      //formulario 4
      {
        path: 'transferenciadepermissaodetaxi',
        component: UserFormulario4TransfpermtransptaxiComponent,
      },
      //formulario 5
      {
        path: 'requerimentoparasubstituicaodeveiculo',
        component: UserFormulario5ReqsubstveiculoComponent,
      },
      //formulario 6
      {
        path: 'requerimentoparaprorrogacaodesubstituicaodeveiculo',
        component: UserFormulario6ReqprosubveiculoComponent,
      },
      //formulario 7
      {
        path: 'formulariodeclaracaomonitor',
        component: UserFormulario7DeclaracaoMonitorComponent,
      },
      //formulario 8
      {
        path: 'condutorauxiliar',
        component: UserFormulario8CondutorAuxiliarComponent,
      },
      //formulario 9
      {
        path: 'declaracaoatendimentodisposto',
        component: UserFormulario9declaracaoatenddispostoComponent,
      },
      //formulario 16
      {
        path: 'solicitacaoderessarcimento',
        component: UserFormulario16solressarcimentoComponent,
      },
      //formulario 17
      {
        path: 'solicitacaodebaixadecondutorauxiliar',
        component: UserFormulario17SolicitaacaoBaixaCondutorComponent,
      },
      //formulario 18
      {
        path: 'solicitacaotransporteescolar',
        component: UserFormulario18soltranspensinoComponent,
      },
      //formulario 119
      {
        path: 'autorizacaoadesivacaocusteada',
        component:
          UserFormulario119autorizacaoadesivacaocustpermissionarioComponent,
      },
      //formulario 120
      {
        path: 'solicitacaoafericaotaximetro',
        component: UserFormulario120solicitacaoafericaotaximetroComponent,
      },
      //formulario 121
      {
        path: 'solicitacaodeautorizacaoprovisoria',
        component:
          UserFormulario121solicitacaoafericaoautprovisoriaComponent,
      },
      //formulario 122
      {
        path: 'solicitacaodeautorizacaoprovisoriaescolar',
        component:
          UserFormulario122solicitacaoafericaoautprovisoriaescolarComponent,
      },
      //formulario 123
      //formulario 124
      //formulario 125
      //formulario 126
      {
        path: 'declaracaoparataxista',
        component: UserFormulario126declaracaoparataxistaComponent,
      },
      //formulario 127
      {
        path: 'declaracaoparatransporteescolar',
        component:
          UserFormulario127declaracaoparatransporteescolarComponent,
      },
      //formulario 128
      {
        path: 'formularioderequerimento',
        component: UserFormulario128formulariodedeclaracaoComponent,
      },
      //formulario 129
      {
        path: 'laudodevistoriatransportesespeciais',
        component:
          UserFormulario129laudovistoriatransportesespeciaisComponent,
      },
      //formulario 130
      {
        path: 'notificacao',
        component: UserFormulario130notificacaoComponent,
      },
      //formulario 131
      {
        path: 'substituicaodeveiculo',
        component: UserFormulario131substituicaodeveiculoComponent,
      },
      //formulario 132
      {
        path: 'termodecredenciamento',
        component: UserFormulario132termodecredenciamentoComponent,
      },
      //formulario 133
      {
        path: 'termodecredenciamentotransporteescolar',
        component:
          UserFormulario133termodecredenciamentotransporteescolarComponent,
      },
      //formulario 134
      { path: 'aip', component: UserFormulario134aipComponent },
      //formulario 135
      {
        path: 'alvarapermissao',
        component: UserFormulario135alvaraPermissaoComponent,
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
  ],
  declarations: [
    UserImpressosComponent,
    UserFormulario1RenovacaoPermissionarioComponent,
    UserFormulario7DeclaracaoMonitorComponent,
    UserFormulario8CondutorAuxiliarComponent,
    UserFormulario17SolicitaacaoBaixaCondutorComponent,
    UserFormulario2ReqTransferenciaComponent,
    UserFormulario3TransfpermtranspescolarComponent,
    UserFormulario4TransfpermtransptaxiComponent,
    UserFormulario5ReqsubstveiculoComponent,
    UserFormulario6ReqprosubveiculoComponent,
    UserFormulario9declaracaoatenddispostoComponent,
    UserFormulario16solressarcimentoComponent,
    UserFormulario18soltranspensinoComponent,
    UserFormulario119autorizacaoadesivacaocustpermissionarioComponent,
    UserFormulario120solicitacaoafericaotaximetroComponent,
    UserFormulario121solicitacaoafericaoautprovisoriaComponent,
    UserFormulario122solicitacaoafericaoautprovisoriaescolarComponent,
    UserFormulario126declaracaoparataxistaComponent,
    UserFormulario127declaracaoparatransporteescolarComponent,
    UserFormulario128formulariodedeclaracaoComponent,
    UserFormulario129laudovistoriatransportesespeciaisComponent,
    UserFormulario130notificacaoComponent,
    UserFormulario131substituicaodeveiculoComponent,
    UserFormulario132termodecredenciamentoComponent,
    UserFormulario133termodecredenciamentotransporteescolarComponent,
    UserFormulario134aipComponent,
    UserFormulario135alvaraPermissaoComponent,
  ],
  exports: [
    UserFormulario135alvaraPermissaoComponent
  ],
})
export class UserImpressosModule {}
