import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared-module";
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserRootComponent } from './user-root/user-root.component';
import { UserUsuariosComponent } from './user-cadastros/user-usuarios/user-usuarios.component';
import { UserPerfisComponent } from './user-cadastros/user-perfis/user-perfis.component';
import { UserPermissionariosComponent } from './user-cadastros/user-permissionarios/user-permissionarios.component';
import { UserUsuarioCrudComponent } from './user-cadastros/user-usuarios/user-usuario-crud/user-usuario-crud.component';
import { UserPerfilCrudComponent } from './user-cadastros/user-perfis/user-perfil-crud/user-perfil-crud.component';
import { UserPermissionarioNovoComponent } from './user-cadastros/user-permissionarios/user-permissionario-novo/user-permissionario-novo.component';
import { UserPermissionarioAlterarComponent } from './user-cadastros/user-permissionarios/user-permissionario-alterar/user-permissionario-alterar.component';
import { NgxMaskModule } from "ngx-mask";
import { UserPermissionarioAlterarDadosComponent } from './user-cadastros/user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-dados/user-permissionario-alterar-dados.component';
import { UserPermissionarioAlterarPontosComponent } from './user-cadastros/user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-pontos/user-permissionario-alterar-pontos.component';
import { UserPermissionarioAlterarDocumentosComponent } from './user-cadastros/user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-documentos/user-permissionario-alterar-documentos.component';
import { UserPermissionarioAlterarCursosComponent } from './user-cadastros/user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-cursos/user-permissionario-alterar-cursos.component';
import { UserPermissionarioAlterarCondutoresComponent } from './user-cadastros/user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-condutores/user-permissionario-alterar-condutores.component';
import { UserPermissionarioAlterarAplicativosComponent } from './user-cadastros/user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-aplicativos/user-permissionario-alterar-aplicativos.component';
import { UserPermissionarioAlterarVeiculosComponent } from './user-cadastros/user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-veiculos/user-permissionario-alterar-veiculos.component';
import { UserPermissionarioAlterarAnexosComponent } from './user-cadastros/user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-anexos/user-permissionario-alterar-anexos.component';
import { UserPermissionarioAlterarObservacoesComponent } from './user-cadastros/user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-observacoes/user-permissionario-alterar-observacoes.component';
import { UserPermissionarioAlterarFalecimentoComponent } from './user-cadastros/user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-falecimento/user-permissionario-alterar-falecimento.component';
import { UserPermissionarioAlterarAlvaraComponent } from './user-cadastros/user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-alvara/user-permissionario-alterar-alvara.component';
import { UserEmpresasComponent } from './user-cadastros/user-empresas/user-empresas.component';
import { UserEmpresaCrudComponent } from './user-cadastros/user-empresas/user-empresa-crud/user-empresa-crud.component';
import { UserCondutoresComponent } from './user-cadastros/user-condutores/user-condutores.component';
import { UserCondutoresNovoComponent } from './user-cadastros/user-condutores/user-condutores-novo/user-condutores-novo.component';
import { UserCondutoresAlterarComponent } from './user-cadastros/user-condutores/user-condutores-alterar/user-condutores-alterar.component';
import { UserCondutoresAlterarCursosComponent } from './user-cadastros/user-condutores/user-condutores-alterar/user-condutores-alterar-cursos/user-condutores-alterar-cursos.component';
import { UserCondutoresAlterarAnexosComponent } from './user-cadastros/user-condutores/user-condutores-alterar/user-condutores-alterar-anexos/user-condutores-alterar-anexos.component';
import { UserCondutoresAlterarDadosComponent } from './user-cadastros/user-condutores/user-condutores-alterar/user-condutores-alterar-dados/user-condutores-alterar-dados.component';
import { UserMonitoresComponent } from './user-cadastros/user-monitores/user-monitores.component';
import { UserMonitoresNovoComponent } from './user-cadastros/user-monitores/user-monitores-novo/user-monitores-novo.component';
import { UserMonitoresAlterarComponent } from './user-cadastros/user-monitores/user-monitores-alterar/user-monitores-alterar.component';
import { UserMonitoresAlterarCursosComponent } from './user-cadastros/user-monitores/user-monitores-alterar/user-monitores-alterar-cursos/user-monitores-alterar-cursos.component';
import { UserMonitoresAlterarAnexosComponent } from './user-cadastros/user-monitores/user-monitores-alterar/user-monitores-alterar-anexos/user-monitores-alterar-anexos.component';
import { UserMonitoresAlterarDadosComponent } from './user-cadastros/user-monitores/user-monitores-alterar/user-monitores-alterar-dados/user-monitores-alterar-dados.component';
import { UserPontosComponent } from './user-cadastros/user-pontos/user-pontos.component';
import { UserPontosNovoComponent } from './user-cadastros/user-pontos/user-pontos-novo/user-pontos-novo.component';
import { UserPontosAlterarComponent } from './user-cadastros/user-pontos/user-pontos-alterar/user-pontos-alterar.component';
import { UserPontosAlterarDadosComponent } from './user-cadastros/user-pontos/user-pontos-alterar/user-pontos-alterar-dados/user-pontos-alterar-dados.component';
import { UserPontosAlterarCoordenadorComponent } from './user-cadastros/user-pontos/user-pontos-alterar/user-pontos-alterar-coordenador/user-pontos-alterar-coordenador.component';
import { UserEntidadeAssociativaComponent } from './user-cadastros/user-entidade-associativa/user-entidade-associativa.component';
import { UserEntidadeAssociativaCrudComponent } from './user-cadastros/user-entidade-associativa/user-entidade-associativa-crud/user-entidade-associativa-crud.component';
import { UserMarcasModelosDeVeiculosComponent } from './user-cadastros/user-marcas-modelos-de-veiculos/user-marcas-modelos-de-veiculos.component';
import { UserMarcasModelosDeVeiculosCrudComponent } from './user-cadastros/user-marcas-modelos-de-veiculos/user-marcas-modelos-de-veiculos-crud/user-marcas-modelos-de-veiculos-crud.component';
import { UserTiposDeVeiculoComponent } from './user-cadastros/user-tipos-de-veiculo/user-tipos-de-veiculo.component';
import { UserTiposDeVeiculoCrudComponent } from './user-cadastros/user-tipos-de-veiculo/user-tipos-de-veiculo-crud/user-tipos-de-veiculo-crud.component';
import { UserCoresDeVeiculoComponent } from './user-cadastros/user-cores-de-veiculo/user-cores-de-veiculo.component';
import { UserCoresDeVeiculoCrudComponent } from './user-cadastros/user-cores-de-veiculo/user-cores-de-veiculo-crud/user-cores-de-veiculo-crud.component';
import { UserTiposDeCombustivelComponent } from './user-cadastros/user-tipos-de-combustivel/user-tipos-de-combustivel.component';
import { UserTiposDeCombustivelCrudComponent } from './user-cadastros/user-tipos-de-combustivel/user-tipos-de-combustivel-crud/user-tipos-de-combustivel-crud.component';
import { UserVeiculosComponent } from './user-cadastros/user-veiculos/user-veiculos.component';
import { UserVeiculosNovoComponent } from './user-cadastros/user-veiculos/user-veiculos-novo/user-veiculos-novo.component';
import { UserVeiculosAlterarComponent } from './user-cadastros/user-veiculos/user-veiculos-alterar/user-veiculos-alterar.component';
import { UserVeiculosAlterarDadosComponent } from './user-cadastros/user-veiculos/user-veiculos-alterar/user-veiculos-alterar-dados/user-veiculos-alterar-dados.component';
import { UserVeiculosAlterarAnexosComponent } from './user-cadastros/user-veiculos/user-veiculos-alterar/user-veiculos-alterar-anexos/user-veiculos-alterar-anexos.component';
import { UserAplicativosComponent } from './user-cadastros/user-aplicativos/user-aplicativos.component';
import { UserAplicativosCrudComponent } from './user-cadastros/user-aplicativos/user-aplicativos-crud/user-aplicativos-crud.component';
import { UserEmpresasVistoriadorasComponent } from './user-cadastros/user-empresas-vistoriadoras/user-empresas-vistoriadoras.component';
import { UserEmpresasVistoriadorasCrudComponent } from './user-cadastros/user-empresas-vistoriadoras/user-empresas-vistoriadoras-crud/user-empresas-vistoriadoras-crud.component';
import { UserVistoriadoresComponent } from './user-cadastros/user-vistoriadores/user-vistoriadores.component';
import { UserVistoriadoresCrudComponent } from './user-cadastros/user-vistoriadores/user-vistoriadores-crud/user-vistoriadores-crud.component';
import { UserTiposDeCertidaoComponent } from './user-cadastros/user-tipos-de-certidao/user-tipos-de-certidao.component';
import { UserTiposDeCertidaoCrudComponent } from './user-cadastros/user-tipos-de-certidao/user-tipos-de-certidao-crud/user-tipos-de-certidao-crud.component';
import { UserEntidadeCursoComponent } from './user-cadastros/user-entidade-curso/user-entidade-curso.component';
import { UserEntidadeCursoCrudComponent } from './user-cadastros/user-entidade-curso/user-entidade-curso-crud/user-entidade-curso-crud.component';
import { UserTiposDeCursoComponent } from './user-cadastros/user-tipos-de-curso/user-tipos-de-curso.component';
import { UserTiposDeCursoCrudComponent } from './user-cadastros/user-tipos-de-curso/user-tipos-de-curso-crud/user-tipos-de-curso-crud.component';
import { UserQuadroDeInfracoesComponent } from './user-cadastros/user-quadro-de-infracoes/user-quadro-de-infracoes.component';
import { UserQuadroDeInfracoesCrudComponent } from './user-cadastros/user-quadro-de-infracoes/user-quadro-de-infracoes-crud/user-quadro-de-infracoes-crud.component';
import { UserValoresDeInfracaoComponent } from './user-cadastros/user-valores-de-infracao/user-valores-de-infracao.component';
import { UserValoresDeInfracaoCrudComponent } from './user-cadastros/user-valores-de-infracao/user-valores-de-infracao-crud/user-valores-de-infracao-crud.component';
import { UserMoedasComponent } from './user-cadastros/user-moedas/user-moedas.component';
import { UserMoedasCrudComponent } from './user-cadastros/user-moedas/user-moedas-crud/user-moedas-crud.component';
import { UserFiscaisComponent } from './user-cadastros/user-fiscais/user-fiscais.component';
import { UserFiscaisCrudComponent } from './user-cadastros/user-fiscais/user-fiscais-crud/user-fiscais-crud.component';
import { UserTaloesDoFiscalComponent } from './user-cadastros/user-taloes-do-fiscal/user-taloes-do-fiscal.component';
import { UserTaloesDoFiscalCrudComponent } from './user-cadastros/user-taloes-do-fiscal/user-taloes-do-fiscal-crud/user-taloes-do-fiscal-crud.component';
import { UserFmpComponent } from './user-cadastros/user-fmp/user-fmp.component';
import { UserFmpCrudComponent } from './user-cadastros/user-fmp/user-fmp-crud/user-fmp-crud.component';
import { NgxCurrencyModule } from "ngx-currency";
import { UserSolicitacoesComponent } from './user-cadastros/user-solicitacoes/user-solicitacoes.component';
import { UserCertidoesComponent } from './user-lancamentos/user-certidoes/user-certidoes.component';
import { UserInfracoesComponent } from './user-lancamentos/user-infracoes/user-infracoes.component';
import { UserVistoriadepontosComponent } from './user-lancamentos/user-vistoriadepontos/user-vistoriadepontos.component';
import { UserVistoriadepontosCrudComponent } from './user-lancamentos/user-vistoriadepontos/user-vistoriadepontos-crud/user-vistoriadepontos-crud.component';
import { UserInfracoesCrudComponent } from './user-lancamentos/user-infracoes/user-infracoes-crud/user-infracoes-crud.component';
import { UserCertidoesCrudComponent } from './user-lancamentos/user-certidoes/user-certidoes-crud/user-certidoes-crud.component';
import { UserMarcasModelosDeChassiComponent } from './user-cadastros/user-marcas-modelos-de-chassi/user-marcas-modelos-de-chassi.component';
import { UserMarcasModelosDeCarroceriaComponent } from './user-cadastros/user-marcas-modelos-de-carroceria/user-marcas-modelos-de-carroceria.component';
import { UserMarcasModelosDeCarroceriaCrudComponent } from './user-cadastros/user-marcas-modelos-de-carroceria/user-marcas-modelos-de-carroceria-crud/user-marcas-modelos-de-carroceria-crud.component';
import { UserMarcasModelosDeChassiCrudComponent } from './user-cadastros/user-marcas-modelos-de-chassi/user-marcas-modelos-de-chassi-crud/user-marcas-modelos-de-chassi-crud.component';
import { UserRelEntradaSaidaVeiculosComponent } from './user-relatorios/user-rel-entrada-saida-veiculos/user-rel-entrada-saida-veiculos.component';
import { UserImpressosComponent } from './user-impressos/user-impressos.component';
import { UserFormulario1RenovacaoPermissionarioComponent } from './user-impressos/user-formulario1-renovacao-permissionario/user-formulario1-renovacao-permissionario.component';
import { UserFormulario7DeclaracaoMonitorComponent } from './user-impressos/user-formulario7-declaracao-monitor/user-formulario7-declaracao-monitor.component';
import { UserFormulario8CondutorAuxiliarComponent } from './user-impressos/user-formulario8-condutor-auxiliar/user-formulario8-condutor-auxiliar.component';
import { UserFormulario17SolicitaacaoBaixaCondutorComponent } from './user-impressos/user-formulario17-solicitaacao-baixa-condutor/user-formulario17-solicitaacao-baixa-condutor.component';
import { UserInfracoesInformarPagamentoComponent } from "./user-lancamentos/user-infracoes/user-infracoes-informar-pagamento/user-infracoes-informar-pagamento.component";
import { UserSidebarComponent } from "./user-root/user-sidebar/user-sidebar.component";
import { UserWelcomeComponent } from "./user-welcome/user-welcome.component";
import { UserAlvaraPagamentoComponent } from "./user-lancamentos/user-alvara-pagamento/user-alvara-pagamento.component";
import { UserAlvaraPagamentoInformarPagamentoComponent } from "./user-lancamentos/user-alvara-pagamento/user-alvara-pagamento-informar-pagamento/user-alvara-pagamento-informar-pagamento.component";
import { UserFormulario2ReqTransferenciaComponent } from "./user-impressos/user-formulario2-req-transferencia/user-formulario2-req-transferencia.component";
import { UserFormulario3TransfpermtranspescolarComponent } from "./user-impressos/user-formulario3-transfpermtranspescolar/user-formulario3-transfpermtranspescolar.component";

const ROUTER: Routes = [
  {
    path: '', component: UserRootComponent,
    children: [
      { path: '', component: UserWelcomeComponent },
      {
        path: 'cadastros',
        children: [
          { path: 'empresas', component: UserEmpresasComponent, },
          { path: 'empresas/novo', component: UserEmpresaCrudComponent },
          { path: 'empresas/alterar/:id', component: UserEmpresaCrudComponent },
          { path: 'perfis', component: UserPerfisComponent, },
          { path: 'perfis/novo', component: UserPerfilCrudComponent },
          { path: 'perfis/alterar/:id', component: UserPerfilCrudComponent },
          { path: 'usuarios', component: UserUsuariosComponent },
          { path: 'usuarios/novo', component: UserUsuarioCrudComponent },
          { path: 'usuarios/alterar/:id', component: UserUsuarioCrudComponent },
          { path: 'permissionarios', component: UserPermissionariosComponent },
          { path: 'permissionarios/novo', component: UserPermissionarioNovoComponent },
          {
            path: 'permissionarios/alterar/:id', component: UserPermissionarioAlterarComponent,
            children: [
              { path: '', component: UserPermissionarioAlterarDadosComponent },
              { path: 'dados', component: UserPermissionarioAlterarDadosComponent },
              { path: 'pontos', component: UserPermissionarioAlterarPontosComponent },
              { path: 'documentos', component: UserPermissionarioAlterarDocumentosComponent },
              { path: 'cursos', component: UserPermissionarioAlterarCursosComponent },
              { path: 'alvara', component: UserPermissionarioAlterarAlvaraComponent },
              { path: 'condutores', component: UserPermissionarioAlterarCondutoresComponent },
              { path: 'aplicativos', component: UserPermissionarioAlterarAplicativosComponent },
              { path: 'veiculos', component: UserPermissionarioAlterarVeiculosComponent },
              { path: 'anexos', component: UserPermissionarioAlterarAnexosComponent },
              { path: 'observacoes', component: UserPermissionarioAlterarObservacoesComponent },
              { path: 'falecimento', component: UserPermissionarioAlterarFalecimentoComponent },
            ]
          },
          { path: 'condutores', component: UserCondutoresComponent },
          { path: 'condutores/novo', component: UserCondutoresNovoComponent },
          {
            path: 'condutores/alterar/:id', component: UserCondutoresAlterarComponent,
            children: [
              { path: 'dados', component: UserCondutoresAlterarDadosComponent },
              { path: 'cursos', component: UserCondutoresAlterarCursosComponent },
              { path: 'anexos', component: UserCondutoresAlterarAnexosComponent },
            ]
          },
          { path: 'monitores', component: UserMonitoresComponent },
          { path: 'monitores/novo', component: UserMonitoresNovoComponent },
          {
            path: 'monitores/alterar/:id', component: UserMonitoresAlterarComponent,
            children: [
              { path: 'dados', component: UserMonitoresAlterarDadosComponent },
              { path: 'cursos', component: UserMonitoresAlterarCursosComponent },
              { path: 'anexos', component: UserMonitoresAlterarAnexosComponent },
            ]
          },
          { path: 'pontos', component: UserPontosComponent },
          { path: 'pontos/novo', component: UserPontosNovoComponent },
          {
            path: 'pontos/alterar/:id', component: UserPontosAlterarComponent,
            children: [
              { path: 'dados', component: UserPontosAlterarDadosComponent },
              { path: 'coordenadores', component: UserPontosAlterarCoordenadorComponent },
            ]
          },
          { path: 'coresdeveiculos', component: UserCoresDeVeiculoComponent, },
          { path: 'coresdeveiculos/novo', component: UserCoresDeVeiculoCrudComponent },
          { path: 'coresdeveiculos/alterar/:id', component: UserCoresDeVeiculoCrudComponent },
          { path: 'entidadesassociativas', component: UserEntidadeAssociativaComponent, },
          { path: 'entidadesassociativas/novo', component: UserEntidadeAssociativaCrudComponent },
          { path: 'entidadesassociativas/alterar/:id', component: UserEntidadeAssociativaCrudComponent },
          { path: 'marcasmodelosdeveiculos', component: UserMarcasModelosDeVeiculosComponent, },
          { path: 'marcasmodelosdeveiculos/novo', component: UserMarcasModelosDeVeiculosCrudComponent },
          { path: 'marcasmodelosdeveiculos/alterar/:id', component: UserMarcasModelosDeVeiculosCrudComponent },
          { path: 'marcasmodelosdechassi', component: UserMarcasModelosDeChassiComponent, },
          { path: 'marcasmodelosdechassi/novo', component: UserMarcasModelosDeChassiCrudComponent },
          { path: 'marcasmodelosdechassi/alterar/:id', component: UserMarcasModelosDeChassiCrudComponent },
          { path: 'marcasmodelosdecarroceria', component: UserMarcasModelosDeCarroceriaComponent, },
          { path: 'marcasmodelosdecarroceria/novo', component: UserMarcasModelosDeCarroceriaCrudComponent },
          { path: 'marcasmodelosdecarroceria/alterar/:id', component: UserMarcasModelosDeCarroceriaCrudComponent },
          { path: 'tiposdecombustivel', component: UserTiposDeCombustivelComponent, },
          { path: 'tiposdecombustivel/novo', component: UserTiposDeCombustivelCrudComponent },
          { path: 'tiposdecombustivel/alterar/:id', component: UserTiposDeCombustivelCrudComponent },
          { path: 'aplicativos', component: UserAplicativosComponent, },
          { path: 'aplicativos/novo', component: UserAplicativosCrudComponent },
          { path: 'aplicativos/alterar/:id', component: UserAplicativosCrudComponent },
          { path: 'empresasvistoriadoras', component: UserEmpresasVistoriadorasComponent, },
          { path: 'empresasvistoriadoras/novo', component: UserEmpresasVistoriadorasCrudComponent },
          { path: 'empresasvistoriadoras/alterar/:id', component: UserEmpresasVistoriadorasCrudComponent },
          { path: 'vistoriadores', component: UserVistoriadoresComponent, },
          { path: 'vistoriadores/novo', component: UserVistoriadoresCrudComponent },
          { path: 'vistoriadores/alterar/:id', component: UserVistoriadoresCrudComponent },
          { path: 'tiposdeveiculo', component: UserTiposDeVeiculoComponent, },
          { path: 'tiposdeveiculo/novo', component: UserTiposDeVeiculoCrudComponent },
          { path: 'tiposdeveiculo/alterar/:id', component: UserTiposDeVeiculoCrudComponent },
          { path: 'tiposdecertidao', component: UserTiposDeCertidaoComponent, },
          { path: 'tiposdecertidao/novo', component: UserTiposDeCertidaoCrudComponent },
          { path: 'tiposdecertidao/alterar/:id', component: UserTiposDeCertidaoCrudComponent },
          { path: 'entidadecurso', component: UserEntidadeCursoComponent, },
          { path: 'entidadecurso/novo', component: UserEntidadeCursoCrudComponent },
          { path: 'entidadecurso/alterar/:id', component: UserEntidadeCursoCrudComponent },
          { path: 'tiposdecurso', component: UserTiposDeCursoComponent, },
          { path: 'tiposdecurso/novo', component: UserTiposDeCursoCrudComponent },
          { path: 'tiposdecurso/alterar/:id', component: UserTiposDeCursoCrudComponent },
          { path: 'quadrodeinfracoes', component: UserQuadroDeInfracoesComponent, },
          { path: 'quadrodeinfracoes/novo', component: UserQuadroDeInfracoesCrudComponent },
          { path: 'quadrodeinfracoes/alterar/:id', component: UserQuadroDeInfracoesCrudComponent },
          { path: 'valoresdainfracao', component: UserValoresDeInfracaoComponent, },
          { path: 'valoresdainfracao/novo', component: UserValoresDeInfracaoCrudComponent },
          { path: 'valoresdainfracao/alterar/:id', component: UserValoresDeInfracaoCrudComponent },
          { path: 'tiposdemoeda', component: UserMoedasComponent, },
          { path: 'tiposdemoeda/novo', component: UserMoedasCrudComponent },
          { path: 'tiposdemoeda/alterar/:id', component: UserMoedasCrudComponent },
          { path: 'fiscais', component: UserFiscaisComponent, },
          { path: 'fiscais/novo', component: UserFiscaisCrudComponent },
          { path: 'fiscais/alterar/:id', component: UserFiscaisCrudComponent },
          { path: 'taloesdofiscal', component: UserTaloesDoFiscalComponent, },
          { path: 'taloesdofiscal/novo', component: UserTaloesDoFiscalCrudComponent },
          { path: 'taloesdofiscal/alterar/:id', component: UserTaloesDoFiscalCrudComponent },
          { path: 'fmp', component: UserFmpComponent, },
          { path: 'fmp/novo', component: UserFmpCrudComponent },
          { path: 'fmp/alterar/:id', component: UserFmpCrudComponent },
          { path: 'veiculos', component: UserVeiculosComponent },
          { path: 'veiculos/novo', component: UserVeiculosNovoComponent },
          {
            path: 'veiculos/alterar/:id', component: UserVeiculosAlterarComponent,
            children: [
              { path: 'dados', component: UserVeiculosAlterarDadosComponent },
              { path: 'anexos', component: UserVeiculosAlterarAnexosComponent },
            ]
          },
          { path: 'solicitacoes', component: UserSolicitacoesComponent },
        ]
      },
      {
        path: 'lancamentos',
        children: [
          { path: 'certidoes', component: UserCertidoesComponent, },
          { path: 'certidoes/novo', component: UserCertidoesCrudComponent },
          { path: 'certidoes/alterar/:id', component: UserCertidoesCrudComponent },
          { path: 'infracoes', component: UserInfracoesComponent, },
          { path: 'infracoes/novo', component: UserInfracoesCrudComponent },
          { path: 'infracoes/alterar/:id', component: UserInfracoesCrudComponent },
          { path: 'vistoriasdepontos', component: UserVistoriadepontosComponent, },
          { path: 'vistoriasdepontos/novo', component: UserVistoriadepontosCrudComponent },
          { path: 'vistoriasdepontos/alterar/:id', component: UserVistoriadepontosCrudComponent },
          { path: 'alvarapagamento', component: UserAlvaraPagamentoComponent, },
        ]
      },
      {
        path: 'impressos', component: UserImpressosComponent,
        children: [
          //formulario 1
          { path: 'formulariorenovacaopermissao', component: UserFormulario1RenovacaoPermissionarioComponent, },
          //formulario 2
          { path: 'formulariotransferencia', component: UserFormulario2ReqTransferenciaComponent, },
          //formulario 3
          { path: 'transferenciadepermissaodetransporte', component: UserFormulario3TransfpermtranspescolarComponent, },


          { path: 'formulariodeclaracaomonitor', component: UserFormulario7DeclaracaoMonitorComponent, },
          { path: 'condutorauxiliar', component: UserFormulario8CondutorAuxiliarComponent, },
          { path: 'solicitacaodebaixadecondutorauxiliar', component: UserFormulario17SolicitaacaoBaixaCondutorComponent, },
        ]
      },
      {
        path: 'relatorios',
        children: [
          { path: 'entradasaidadeveiculos', component: UserRelEntradaSaidaVeiculosComponent, },
        ]
      }

    ]
  },
]

@NgModule({
  declarations: [
    UserHeaderComponent,
    UserRootComponent,
    UserUsuariosComponent,
    UserPerfisComponent,
    UserPermissionariosComponent,
    UserUsuarioCrudComponent,
    UserPerfilCrudComponent,
    UserPermissionarioNovoComponent,
    UserPermissionarioAlterarComponent,
    UserPermissionarioAlterarDadosComponent,
    UserPermissionarioAlterarPontosComponent,
    UserPermissionarioAlterarDocumentosComponent,
    UserPermissionarioAlterarCursosComponent,
    UserPermissionarioAlterarCondutoresComponent,
    UserPermissionarioAlterarAplicativosComponent,
    UserPermissionarioAlterarVeiculosComponent,
    UserPermissionarioAlterarAnexosComponent,
    UserPermissionarioAlterarObservacoesComponent,
    UserPermissionarioAlterarFalecimentoComponent,
    UserPermissionarioAlterarAlvaraComponent,
    UserEmpresasComponent,
    UserEmpresaCrudComponent,
    UserCondutoresComponent,
    UserCondutoresNovoComponent,
    UserCondutoresAlterarComponent,
    UserCondutoresAlterarCursosComponent,
    UserCondutoresAlterarAnexosComponent,
    UserCondutoresAlterarDadosComponent,
    UserMonitoresComponent,
    UserMonitoresNovoComponent,
    UserMonitoresAlterarComponent,
    UserMonitoresAlterarCursosComponent,
    UserMonitoresAlterarAnexosComponent,
    UserMonitoresAlterarDadosComponent,
    UserPontosComponent,
    UserPontosNovoComponent,
    UserPontosAlterarComponent,
    UserPontosAlterarDadosComponent,
    UserPontosAlterarCoordenadorComponent,
    UserEntidadeAssociativaComponent,
    UserEntidadeAssociativaCrudComponent,
    UserMarcasModelosDeVeiculosComponent,
    UserMarcasModelosDeVeiculosCrudComponent,
    UserTiposDeVeiculoComponent,
    UserTiposDeVeiculoCrudComponent,
    UserCoresDeVeiculoComponent,
    UserCoresDeVeiculoCrudComponent,
    UserTiposDeCombustivelComponent,
    UserTiposDeCombustivelCrudComponent,
    UserVeiculosComponent,
    UserVeiculosNovoComponent,
    UserVeiculosAlterarComponent,
    UserVeiculosAlterarDadosComponent,
    UserVeiculosAlterarAnexosComponent,
    UserAplicativosComponent,
    UserAplicativosCrudComponent,
    UserEmpresasVistoriadorasComponent,
    UserEmpresasVistoriadorasCrudComponent,
    UserVistoriadoresComponent,
    UserVistoriadoresCrudComponent,
    UserTiposDeCertidaoComponent,
    UserTiposDeCertidaoCrudComponent,
    UserEntidadeCursoComponent,
    UserEntidadeCursoCrudComponent,
    UserTiposDeCursoComponent,
    UserTiposDeCursoCrudComponent,
    UserQuadroDeInfracoesComponent,
    UserQuadroDeInfracoesCrudComponent,
    UserValoresDeInfracaoComponent,
    UserValoresDeInfracaoCrudComponent,
    UserMoedasComponent,
    UserMoedasCrudComponent,
    UserFiscaisComponent,
    UserFiscaisCrudComponent,
    UserTaloesDoFiscalComponent,
    UserTaloesDoFiscalCrudComponent,
    UserFmpComponent,
    UserFmpCrudComponent,
    UserSolicitacoesComponent,
    UserCertidoesComponent,
    UserInfracoesComponent,
    UserVistoriadepontosComponent,
    UserVistoriadepontosCrudComponent,
    UserInfracoesCrudComponent,
    UserCertidoesCrudComponent,
    UserMarcasModelosDeChassiComponent,
    UserMarcasModelosDeCarroceriaComponent,
    UserMarcasModelosDeCarroceriaCrudComponent,
    UserMarcasModelosDeChassiCrudComponent,
    UserRelEntradaSaidaVeiculosComponent,
    UserImpressosComponent,
    UserFormulario1RenovacaoPermissionarioComponent,
    UserFormulario7DeclaracaoMonitorComponent,
    UserFormulario8CondutorAuxiliarComponent,
    UserFormulario17SolicitaacaoBaixaCondutorComponent,
    UserInfracoesInformarPagamentoComponent,
    UserSidebarComponent,
    UserWelcomeComponent,
    UserAlvaraPagamentoComponent,
    UserAlvaraPagamentoInformarPagamentoComponent,
    UserFormulario2ReqTransferenciaComponent,
    UserFormulario3TransfpermtranspescolarComponent
  ],
  imports: [
    RouterModule.forChild(ROUTER),
    SharedModule,
    NgxMaskModule.forChild(),
    NgxCurrencyModule,
  ],
  exports: [
  ]
})
export class UserModule { }
