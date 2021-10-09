import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'src/app/services/basic-crud.service';
import { EmpresaVistoriadoraService } from 'src/app/services/empresa_vistoriadora.service';

@Component({
  selector: 'app-user-empresas-vistoriadoras',
  templateUrl: './user-empresas-vistoriadoras.component.html',
  styleUrls: ['./user-empresas-vistoriadoras.component.css']
})
export class UserEmpresasVistoriadorasComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  dataSearch: SearchData;

  constructor(
    private empresaVistoriadoraService: EmpresaVistoriadoraService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.empresaVistoriadoraService.search(this.searchText, page).toPromise();
    } catch (e) {
      this.dataSearch = null;
    }
    this.loading = false;
  }

  public search(text: string = ''){
    this.searchText = text;
    this.loadList(1);
  }

  public changePos(page: number){
    this.loadList(page && page>0?page:1);
  }

  alterar(id: number) {
    this.router.navigate(['alterar/' + id], {relativeTo:this.route});
  }

}
