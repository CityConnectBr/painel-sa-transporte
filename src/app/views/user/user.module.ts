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

const ROUTER: Routes = [
  {
    path: '', component: UserRootComponent,
    children: [
      { path: '', component: UserHomeComponent },
      {
        path: 'cadastros', component: UserCadastrosComponent,
        children: [
          { path: 'perfis', component: UserPerfisComponent, },
          { path: 'perfis/novo', component: UserPerfilCrudComponent },
          { path: 'perfis/alterar/:id', component: UserPerfilCrudComponent },
          { path: 'usuarios', component: UserUsuariosComponent },
          { path: 'usuarios/novo', component: UserUsuarioCrudComponent },
          { path: 'usuarios/alterar/:id', component: UserUsuarioCrudComponent },
          { path: 'permissionarios', component: UserPermissionariosComponent },
          { path: 'permissionarios/novo', component: UserPermissionarioNovoComponent },
          { path: 'permissionarios/alterar/:id', component: UserPermissionarioAlterarComponent },
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
  ],
  imports: [
    RouterModule.forChild(ROUTER),
    SharedModule,
    NgxMaskModule.forChild()
  ],
  exports: [
  ]
})
export class UserModule { }
