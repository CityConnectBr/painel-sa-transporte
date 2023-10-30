import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared-module';
import { UserEmpresasComponent } from './user-empresas/user-empresas.component';
import { UserEmpresaCrudComponent } from './user-empresas/user-empresa-crud/user-empresa-crud.component';
import { UserPerfisComponent } from './user-perfis/user-perfis.component';
import { UserPerfilCrudComponent } from './user-perfis/user-perfil-crud/user-perfil-crud.component';
import { UserUsuariosComponent } from './user-usuarios/user-usuarios.component';
import { UserUsuarioCrudComponent } from './user-usuarios/user-usuario-crud/user-usuario-crud.component';
import { UserPermissionariosComponent } from './user-permissionarios/user-permissionarios.component';
import { UserPermissionarioNovoComponent } from './user-permissionarios/user-permissionario-novo/user-permissionario-novo.component';
import { UserPermissionarioAlterarComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-alterar.component';
import { UserPermissionarioAlterarDadosComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-dados/user-permissionario-alterar-dados.component';
import { UserPermissionarioAlterarPontosComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-pontos/user-permissionario-alterar-pontos.component';
import { UserPermissionarioAlterarDocumentosComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-documentos/user-permissionario-alterar-documentos.component';
import { UserPermissionarioAlterarCursosComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-cursos/user-permissionario-alterar-cursos.component';
import { UserPermissionarioAlterarAlunosComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-alunos/user-permissionario-alterar-alunos.component';
import { UserPermissionarioAlterarAlvaraComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-alvara/user-permissionario-alterar-alvara.component';
import { UserPermissionarioAlterarCondutoresComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-condutores/user-permissionario-alterar-condutores.component';
import { UserPermissionarioAlterarAplicativosComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-aplicativos/user-permissionario-alterar-aplicativos.component';
import { UserPermissionarioAlterarVeiculosComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-veiculos/user-permissionario-alterar-veiculos.component';
import { UserPermissionarioAlterarAnexosComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-anexos/user-permissionario-alterar-anexos.component';
import { UserPermissionarioAlterarObservacoesComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-observacoes/user-permissionario-alterar-observacoes.component';
import { UserPermissionarioAlterarFalecimentoComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-alterar-falecimento/user-permissionario-alterar-falecimento.component';
import { UserCondutoresComponent } from './user-condutores/user-condutores.component';
import { UserCondutoresNovoComponent } from './user-condutores/user-condutores-novo/user-condutores-novo.component';
import { UserCondutoresAlterarComponent } from './user-condutores/user-condutores-alterar/user-condutores-alterar.component';
import { UserAplicativosCrudComponent } from './user-aplicativos/user-aplicativos-crud/user-aplicativos-crud.component';
import { UserAplicativosComponent } from './user-aplicativos/user-aplicativos.component';
import { UserCondutoresAlterarAnexosComponent } from './user-condutores/user-condutores-alterar/user-condutores-alterar-anexos/user-condutores-alterar-anexos.component';
import { UserCondutoresAlterarCursosComponent } from './user-condutores/user-condutores-alterar/user-condutores-alterar-cursos/user-condutores-alterar-cursos.component';
import { UserCondutoresAlterarDadosComponent } from './user-condutores/user-condutores-alterar/user-condutores-alterar-dados/user-condutores-alterar-dados.component';
import { UserCoresDeVeiculoCrudComponent } from './user-cores-de-veiculo/user-cores-de-veiculo-crud/user-cores-de-veiculo-crud.component';
import { UserCoresDeVeiculoComponent } from './user-cores-de-veiculo/user-cores-de-veiculo.component';
import { UserEmpresasVistoriadorasCrudComponent } from './user-empresas-vistoriadoras/user-empresas-vistoriadoras-crud/user-empresas-vistoriadoras-crud.component';
import { UserEmpresasVistoriadorasComponent } from './user-empresas-vistoriadoras/user-empresas-vistoriadoras.component';
import { UserEntidadeAssociativaCrudComponent } from './user-entidade-associativa/user-entidade-associativa-crud/user-entidade-associativa-crud.component';
import { UserEntidadeAssociativaComponent } from './user-entidade-associativa/user-entidade-associativa.component';
import { UserEntidadeCursoCrudComponent } from './user-entidade-curso/user-entidade-curso-crud/user-entidade-curso-crud.component';
import { UserEntidadeCursoComponent } from './user-entidade-curso/user-entidade-curso.component';
import { UserFiscaisCrudComponent } from './user-fiscais/user-fiscais-crud/user-fiscais-crud.component';
import { UserFiscaisComponent } from './user-fiscais/user-fiscais.component';
import { UserFmpCrudComponent } from './user-fmp/user-fmp-crud/user-fmp-crud.component';
import { UserFmpComponent } from './user-fmp/user-fmp.component';
import { UserMarcasModelosDeCarroceriaCrudComponent } from './user-marcas-modelos-de-carroceria/user-marcas-modelos-de-carroceria-crud/user-marcas-modelos-de-carroceria-crud.component';
import { UserMarcasModelosDeCarroceriaComponent } from './user-marcas-modelos-de-carroceria/user-marcas-modelos-de-carroceria.component';
import { UserMarcasModelosDeChassiCrudComponent } from './user-marcas-modelos-de-chassi/user-marcas-modelos-de-chassi-crud/user-marcas-modelos-de-chassi-crud.component';
import { UserMarcasModelosDeChassiComponent } from './user-marcas-modelos-de-chassi/user-marcas-modelos-de-chassi.component';
import { UserMarcasModelosDeVeiculosCrudComponent } from './user-marcas-modelos-de-veiculos/user-marcas-modelos-de-veiculos-crud/user-marcas-modelos-de-veiculos-crud.component';
import { UserMarcasModelosDeVeiculosComponent } from './user-marcas-modelos-de-veiculos/user-marcas-modelos-de-veiculos.component';
import { UserMoedasCrudComponent } from './user-moedas/user-moedas-crud/user-moedas-crud.component';
import { UserMoedasComponent } from './user-moedas/user-moedas.component';
import { UserMonitoresAlterarAnexosComponent } from './user-monitores/user-monitores-alterar/user-monitores-alterar-anexos/user-monitores-alterar-anexos.component';
import { UserMonitoresAlterarCursosComponent } from './user-monitores/user-monitores-alterar/user-monitores-alterar-cursos/user-monitores-alterar-cursos.component';
import { UserMonitoresAlterarDadosComponent } from './user-monitores/user-monitores-alterar/user-monitores-alterar-dados/user-monitores-alterar-dados.component';
import { UserMonitoresAlterarComponent } from './user-monitores/user-monitores-alterar/user-monitores-alterar.component';
import { UserMonitoresNovoComponent } from './user-monitores/user-monitores-novo/user-monitores-novo.component';
import { UserMonitoresComponent } from './user-monitores/user-monitores.component';
import { UserPontosAlterarCoordenadorComponent } from './user-pontos/user-pontos-alterar/user-pontos-alterar-coordenador/user-pontos-alterar-coordenador.component';
import { UserPontosAlterarDadosComponent } from './user-pontos/user-pontos-alterar/user-pontos-alterar-dados/user-pontos-alterar-dados.component';
import { UserPontosAlterarComponent } from './user-pontos/user-pontos-alterar/user-pontos-alterar.component';
import { UserPontosNovoComponent } from './user-pontos/user-pontos-novo/user-pontos-novo.component';
import { UserPontosComponent } from './user-pontos/user-pontos.component';
import { UserQuadroDeInfracoesCrudComponent } from './user-quadro-de-infracoes/user-quadro-de-infracoes-crud/user-quadro-de-infracoes-crud.component';
import { UserQuadroDeInfracoesComponent } from './user-quadro-de-infracoes/user-quadro-de-infracoes.component';
import { UserSolicitacoesComponent } from './user-solicitacoes/user-solicitacoes.component';
import { UserTaloesDoFiscalCrudComponent } from './user-taloes-do-fiscal/user-taloes-do-fiscal-crud/user-taloes-do-fiscal-crud.component';
import { UserTaloesDoFiscalComponent } from './user-taloes-do-fiscal/user-taloes-do-fiscal.component';
import { UserTiposDeCertidaoCrudComponent } from './user-tipos-de-certidao/user-tipos-de-certidao-crud/user-tipos-de-certidao-crud.component';
import { UserTiposDeCertidaoComponent } from './user-tipos-de-certidao/user-tipos-de-certidao.component';
import { UserTiposDeCombustivelCrudComponent } from './user-tipos-de-combustivel/user-tipos-de-combustivel-crud/user-tipos-de-combustivel-crud.component';
import { UserTiposDeCombustivelComponent } from './user-tipos-de-combustivel/user-tipos-de-combustivel.component';
import { UserTiposDeCursoCrudComponent } from './user-tipos-de-curso/user-tipos-de-curso-crud/user-tipos-de-curso-crud.component';
import { UserTiposDeCursoComponent } from './user-tipos-de-curso/user-tipos-de-curso.component';
import { UserTiposDeVeiculoCrudComponent } from './user-tipos-de-veiculo/user-tipos-de-veiculo-crud/user-tipos-de-veiculo-crud.component';
import { UserTiposDeVeiculoComponent } from './user-tipos-de-veiculo/user-tipos-de-veiculo.component';
import { UserValoresDeInfracaoCrudComponent } from './user-valores-de-infracao/user-valores-de-infracao-crud/user-valores-de-infracao-crud.component';
import { UserValoresDeInfracaoComponent } from './user-valores-de-infracao/user-valores-de-infracao.component';
import { UserVeiculosAlterarAnexosComponent } from './user-veiculos/user-veiculos-alterar/user-veiculos-alterar-anexos/user-veiculos-alterar-anexos.component';
import { UserVeiculosAlterarDadosComponent } from './user-veiculos/user-veiculos-alterar/user-veiculos-alterar-dados/user-veiculos-alterar-dados.component';
import { UserVeiculosAlterarComponent } from './user-veiculos/user-veiculos-alterar/user-veiculos-alterar.component';
import { UserVeiculosNovoComponent } from './user-veiculos/user-veiculos-novo/user-veiculos-novo.component';
import { UserVeiculosComponent } from './user-veiculos/user-veiculos.component';
import { UserVistoriadoresCrudComponent } from './user-vistoriadores/user-vistoriadores-crud/user-vistoriadores-crud.component';
import { UserVistoriadoresComponent } from './user-vistoriadores/user-vistoriadores.component';
import { UserImpressosModule } from '../user-impressos/user-impressos.module';
import { UserPermissionarioFichaComponent } from './user-permissionarios/user-permissionario-alterar/user-permissionario-ficha/user-permissionario-ficha.component';

const ROUTER: Routes = [
  {
    path: '',
    children: [
      { path: 'empresas', component: UserEmpresasComponent },
      { path: 'empresas/novo', component: UserEmpresaCrudComponent },
      { path: 'empresas/alterar/:id', component: UserEmpresaCrudComponent },
      { path: 'perfis', component: UserPerfisComponent },
      { path: 'perfis/novo', component: UserPerfilCrudComponent },
      { path: 'perfis/alterar/:id', component: UserPerfilCrudComponent },
      { path: 'usuarios', component: UserUsuariosComponent },
      { path: 'usuarios/novo', component: UserUsuarioCrudComponent },
      { path: 'usuarios/alterar/:id', component: UserUsuarioCrudComponent },
      { path: 'permissionarios', component: UserPermissionariosComponent },
      {
        path: 'permissionarios/novo',
        component: UserPermissionarioNovoComponent,
      },
      {
        path: 'permissionarios/alterar/:id',
        component: UserPermissionarioAlterarComponent,
        children: [
          { path: '', component: UserPermissionarioAlterarDadosComponent },
          {
            path: 'dados',
            component: UserPermissionarioAlterarDadosComponent,
          },
          {
            path: 'pontos',
            component: UserPermissionarioAlterarPontosComponent,
          },
          {
            path: 'documentos',
            component: UserPermissionarioAlterarDocumentosComponent,
          },
          {
            path: 'cursos',
            component: UserPermissionarioAlterarCursosComponent,
          },
          {
            path: 'alunos',
            component: UserPermissionarioAlterarAlunosComponent,
          },
          {
            path: 'alvara',
            component: UserPermissionarioAlterarAlvaraComponent,
          },
          {
            path: 'condutores',
            component: UserPermissionarioAlterarCondutoresComponent,
          },
          {
            path: 'aplicativos',
            component: UserPermissionarioAlterarAplicativosComponent,
          },
          {
            path: 'veiculos',
            component: UserPermissionarioAlterarVeiculosComponent,
          },
          {
            path: 'anexos',
            component: UserPermissionarioAlterarAnexosComponent,
          },
          {
            path: 'observacoes',
            component: UserPermissionarioAlterarObservacoesComponent,
          },
          {
            path: 'falecimento',
            component: UserPermissionarioAlterarFalecimentoComponent,
          },
        ],
      },
      { path: 'condutores', component: UserCondutoresComponent },
      { path: 'condutores/novo', component: UserCondutoresNovoComponent },
      {
        path: 'condutores/alterar/:id',
        component: UserCondutoresAlterarComponent,
        children: [
          { path: 'dados', component: UserCondutoresAlterarDadosComponent },
          {
            path: 'cursos',
            component: UserCondutoresAlterarCursosComponent,
          },
          {
            path: 'anexos',
            component: UserCondutoresAlterarAnexosComponent,
          },
        ],
      },
      { path: 'monitores', component: UserMonitoresComponent },
      { path: 'monitores/novo', component: UserMonitoresNovoComponent },
      {
        path: 'monitores/alterar/:id',
        component: UserMonitoresAlterarComponent,
        children: [
          { path: 'dados', component: UserMonitoresAlterarDadosComponent },
          {
            path: 'cursos',
            component: UserMonitoresAlterarCursosComponent,
          },
          {
            path: 'anexos',
            component: UserMonitoresAlterarAnexosComponent,
          },
        ],
      },
      { path: 'pontos', component: UserPontosComponent },
      { path: 'pontos/novo', component: UserPontosNovoComponent },
      {
        path: 'pontos/alterar/:id',
        component: UserPontosAlterarComponent,
        children: [
          { path: 'dados', component: UserPontosAlterarDadosComponent },
          {
            path: 'coordenadores',
            component: UserPontosAlterarCoordenadorComponent,
          },
        ],
      },
      { path: 'coresdeveiculos', component: UserCoresDeVeiculoComponent },
      {
        path: 'coresdeveiculos/novo',
        component: UserCoresDeVeiculoCrudComponent,
      },
      {
        path: 'coresdeveiculos/alterar/:id',
        component: UserCoresDeVeiculoCrudComponent,
      },
      {
        path: 'entidadesassociativas',
        component: UserEntidadeAssociativaComponent,
      },
      {
        path: 'entidadesassociativas/novo',
        component: UserEntidadeAssociativaCrudComponent,
      },
      {
        path: 'entidadesassociativas/alterar/:id',
        component: UserEntidadeAssociativaCrudComponent,
      },
      {
        path: 'marcasmodelosdeveiculos',
        component: UserMarcasModelosDeVeiculosComponent,
      },
      {
        path: 'marcasmodelosdeveiculos/novo',
        component: UserMarcasModelosDeVeiculosCrudComponent,
      },
      {
        path: 'marcasmodelosdeveiculos/alterar/:id',
        component: UserMarcasModelosDeVeiculosCrudComponent,
      },
      {
        path: 'marcasmodelosdechassi',
        component: UserMarcasModelosDeChassiComponent,
      },
      {
        path: 'marcasmodelosdechassi/novo',
        component: UserMarcasModelosDeChassiCrudComponent,
      },
      {
        path: 'marcasmodelosdechassi/alterar/:id',
        component: UserMarcasModelosDeChassiCrudComponent,
      },
      {
        path: 'marcasmodelosdecarroceria',
        component: UserMarcasModelosDeCarroceriaComponent,
      },
      {
        path: 'marcasmodelosdecarroceria/novo',
        component: UserMarcasModelosDeCarroceriaCrudComponent,
      },
      {
        path: 'marcasmodelosdecarroceria/alterar/:id',
        component: UserMarcasModelosDeCarroceriaCrudComponent,
      },
      {
        path: 'tiposdecombustivel',
        component: UserTiposDeCombustivelComponent,
      },
      {
        path: 'tiposdecombustivel/novo',
        component: UserTiposDeCombustivelCrudComponent,
      },
      {
        path: 'tiposdecombustivel/alterar/:id',
        component: UserTiposDeCombustivelCrudComponent,
      },
      { path: 'aplicativos', component: UserAplicativosComponent },
      { path: 'aplicativos/novo', component: UserAplicativosCrudComponent },
      {
        path: 'aplicativos/alterar/:id',
        component: UserAplicativosCrudComponent,
      },
      {
        path: 'empresasvistoriadoras',
        component: UserEmpresasVistoriadorasComponent,
      },
      {
        path: 'empresasvistoriadoras/novo',
        component: UserEmpresasVistoriadorasCrudComponent,
      },
      {
        path: 'empresasvistoriadoras/alterar/:id',
        component: UserEmpresasVistoriadorasCrudComponent,
      },
      { path: 'vistoriadores', component: UserVistoriadoresComponent },
      {
        path: 'vistoriadores/novo',
        component: UserVistoriadoresCrudComponent,
      },
      {
        path: 'vistoriadores/alterar/:id',
        component: UserVistoriadoresCrudComponent,
      },
      { path: 'tiposdeveiculo', component: UserTiposDeVeiculoComponent },
      {
        path: 'tiposdeveiculo/novo',
        component: UserTiposDeVeiculoCrudComponent,
      },
      {
        path: 'tiposdeveiculo/alterar/:id',
        component: UserTiposDeVeiculoCrudComponent,
      },
      { path: 'tiposdecertidao', component: UserTiposDeCertidaoComponent },
      {
        path: 'tiposdecertidao/novo',
        component: UserTiposDeCertidaoCrudComponent,
      },
      {
        path: 'tiposdecertidao/alterar/:id',
        component: UserTiposDeCertidaoCrudComponent,
      },
      { path: 'entidadecurso', component: UserEntidadeCursoComponent },
      {
        path: 'entidadecurso/novo',
        component: UserEntidadeCursoCrudComponent,
      },
      {
        path: 'entidadecurso/alterar/:id',
        component: UserEntidadeCursoCrudComponent,
      },
      { path: 'tiposdecurso', component: UserTiposDeCursoComponent },
      {
        path: 'tiposdecurso/novo',
        component: UserTiposDeCursoCrudComponent,
      },
      {
        path: 'tiposdecurso/alterar/:id',
        component: UserTiposDeCursoCrudComponent,
      },
      {
        path: 'quadrodeinfracoes',
        component: UserQuadroDeInfracoesComponent,
      },
      {
        path: 'quadrodeinfracoes/novo',
        component: UserQuadroDeInfracoesCrudComponent,
      },
      {
        path: 'quadrodeinfracoes/alterar/:id',
        component: UserQuadroDeInfracoesCrudComponent,
      },
      {
        path: 'valoresdainfracao',
        component: UserValoresDeInfracaoComponent,
      },
      {
        path: 'valoresdainfracao/novo',
        component: UserValoresDeInfracaoCrudComponent,
      },
      {
        path: 'valoresdainfracao/alterar/:id',
        component: UserValoresDeInfracaoCrudComponent,
      },
      { path: 'tiposdemoeda', component: UserMoedasComponent },
      { path: 'tiposdemoeda/novo', component: UserMoedasCrudComponent },
      {
        path: 'tiposdemoeda/alterar/:id',
        component: UserMoedasCrudComponent,
      },
      { path: 'fiscais', component: UserFiscaisComponent },
      { path: 'fiscais/novo', component: UserFiscaisCrudComponent },
      { path: 'fiscais/alterar/:id', component: UserFiscaisCrudComponent },
      { path: 'taloesdofiscal', component: UserTaloesDoFiscalComponent },
      {
        path: 'taloesdofiscal/novo',
        component: UserTaloesDoFiscalCrudComponent,
      },
      {
        path: 'taloesdofiscal/alterar/:id',
        component: UserTaloesDoFiscalCrudComponent,
      },
      { path: 'fmp', component: UserFmpComponent },
      { path: 'fmp/novo', component: UserFmpCrudComponent },
      { path: 'fmp/alterar/:id', component: UserFmpCrudComponent },
      { path: 'veiculos', component: UserVeiculosComponent },
      { path: 'veiculos/novo', component: UserVeiculosNovoComponent },
      {
        path: 'veiculos/alterar/:id',
        component: UserVeiculosAlterarComponent,
        children: [
          { path: 'dados', component: UserVeiculosAlterarDadosComponent },
          { path: 'anexos', component: UserVeiculosAlterarAnexosComponent },
        ],
      },
      { path: 'solicitacoes', component: UserSolicitacoesComponent },
    ],
  },
];

@NgModule({
  declarations: [
    UserEmpresasComponent,
    UserEmpresaCrudComponent,
    UserPerfisComponent,
    UserPerfilCrudComponent,
    UserUsuariosComponent,
    UserUsuarioCrudComponent,
    UserPermissionariosComponent,
    UserPermissionarioNovoComponent,
    UserPermissionarioAlterarComponent,
    UserPermissionarioAlterarDadosComponent,
    UserPermissionarioAlterarPontosComponent,
    UserPermissionarioAlterarDocumentosComponent,
    UserPermissionarioAlterarCursosComponent,
    UserPermissionarioAlterarAlunosComponent,
    UserPermissionarioAlterarAlvaraComponent,
    UserPermissionarioAlterarCondutoresComponent,
    UserPermissionarioAlterarAplicativosComponent,
    UserPermissionarioAlterarVeiculosComponent,
    UserPermissionarioAlterarAnexosComponent,
    UserPermissionarioAlterarObservacoesComponent,
    UserPermissionarioAlterarFalecimentoComponent,
    UserCondutoresComponent,
    UserCondutoresNovoComponent,
    UserCondutoresAlterarComponent,
    UserCondutoresAlterarDadosComponent,
    UserCondutoresAlterarCursosComponent,
    UserCondutoresAlterarAnexosComponent,
    UserMonitoresComponent,
    UserMonitoresNovoComponent,
    UserMonitoresAlterarComponent,
    UserMonitoresAlterarDadosComponent,
    UserMonitoresAlterarCursosComponent,
    UserMonitoresAlterarAnexosComponent,
    UserPontosComponent,
    UserPontosNovoComponent,
    UserPontosAlterarComponent,
    UserPontosAlterarDadosComponent,
    UserPontosAlterarCoordenadorComponent,
    UserCoresDeVeiculoComponent,
    UserCoresDeVeiculoCrudComponent,
    UserEntidadeAssociativaComponent,
    UserEntidadeAssociativaCrudComponent,
    UserMarcasModelosDeVeiculosComponent,
    UserMarcasModelosDeVeiculosCrudComponent,
    UserMarcasModelosDeChassiComponent,
    UserMarcasModelosDeChassiCrudComponent,
    UserMarcasModelosDeCarroceriaComponent,
    UserMarcasModelosDeCarroceriaCrudComponent,
    UserTiposDeCombustivelComponent,
    UserTiposDeCombustivelCrudComponent,
    UserAplicativosComponent,
    UserAplicativosCrudComponent,
    UserEmpresasVistoriadorasComponent,
    UserEmpresasVistoriadorasCrudComponent,
    UserVistoriadoresComponent,
    UserVistoriadoresCrudComponent,
    UserTiposDeVeiculoComponent,
    UserTiposDeVeiculoCrudComponent,
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
    UserVeiculosComponent,
    UserVeiculosNovoComponent,
    UserVeiculosAlterarComponent,
    UserVeiculosAlterarDadosComponent,
    UserVeiculosAlterarAnexosComponent,
    UserSolicitacoesComponent,
    UserPermissionarioFichaComponent
  ],
  imports: [
    RouterModule.forChild(ROUTER),
    SharedModule,
    NgxMaskModule.forChild(),
    NgxCurrencyModule,
    UserImpressosModule
  ],
  exports: [],
})
export class UserCadastrosModule {}
