import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'src/app/services/basic-crud.service';
import { MarcaModeloDeVeiculoService } from 'src/app/services/marca-modelo-de-veiculo.service';

@Component({
  selector: 'app-user-marcas-modelos-de-veiculos',
  templateUrl: './user-marcas-modelos-de-veiculos.component.html',
  styleUrls: ['./user-marcas-modelos-de-veiculos.component.css']
})
export class UserMarcasModelosDeVeiculosComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  dataSearch: SearchData;

  constructor(
    private marcaModeloVeiculoService: MarcaModeloDeVeiculoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.marcaModeloVeiculoService.search(this.searchText, page).toPromise();
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
