import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared-module";
import { UserHomeComponent } from './user-home/user-home.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserRootComponent } from './user-root/user-root.component';
import { UserCadastrosComponent } from './user-cadastros/user-cadastros.component';
import { UserUsuariosComponent } from './user-cadastros/user-usuarios/user-usuarios.component';
import { UserPerfisComponent } from './user-cadastros/user-perfis/user-perfis.component';
import { UserPermissionariosComponent } from './user-cadastros/user-permissionarios/user-permissionarios.component';
import { UserUsuarioCrudComponent } from './user-cadastros/user-usuarios/user-usuario-crud/user-usuario-crud.component';
import { UserPerfilCrudComponent } from './user-cadastros/user-perfis/user-perfil-crud/user-perfil-crud.component';
import { UserPermissionarioNovoComponent } from './user-cadastros/user-permissionarios/user-permissionario-novo/user-permissionario-novo.component';
import { UserPermissionarioAlterarComponent } from './user-cadastros/user-permissionarios/user-permissionario-alterar/user-permissionario-alterar.component';
import { NgxMaskModule } from "ngx-mask";
import { TextMaskModule } from "angular2-text-mask";
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

const ROUTER: Routes = [
  {
    path: '', component: UserRootComponent,
    children: [
      { path: '', component: UserHomeComponent },
      {
        path: 'cadastros', component: UserCadastrosComponent,
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
              { path: '', component: UserCondutoresAlterarComponent },
              { path: 'dados', component: UserCondutoresAlterarDadosComponent },
              { path: 'cursos', component: UserCondutoresAlterarCursosComponent },
              { path: 'anexos', component: UserCondutoresAlterarAnexosComponent },
            ]
          },
        ]
      },
    ]
  },
]

@NgModule({
  declarations: [
    UserHomeComponent,
    UserHeaderComponent,
    UserRootComponent,
    UserCadastrosComponent,
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
  ],
  imports: [
    RouterModule.forChild(ROUTER),
    SharedModule,
    NgxMaskModule.forChild(),
    TextMaskModule,
  ],
  exports: [
  ]
})
export class UserModule { }
