import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from 'src/app/models/perfil';
import { SearchData } from 'src/app/services/basic-crud.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';

@Component({
  selector: 'app-user-permissionarios',
  templateUrl: './user-permissionarios.component.html',
  styleUrls: ['./user-permissionarios.component.css']
})
export class UserPermissionariosComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  ativo: number = 1;
  dataSearch: SearchData;

  constructor(
    private permissionarioService: PermissionarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadList(1);
  }

  private async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.permissionarioService.search(this.searchText, page, this.ativo).toPromise();
    } catch (e) {
      this.dataSearch = null;
    }
    this.loading = false;
  }

  public search(search: any) {
    this.searchText = search.text;
    this.ativo = search.ativo;
    this.loadList(1);
  }

  public changePos(page: number){
    this.loadList(page && page>0?page:1);
  }

  alterar(id: number) {
    this.router.navigate(['alterar/' + id + '/dados'], {relativeTo:this.route});
  }

}
