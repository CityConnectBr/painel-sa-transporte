import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'src/app/services/basic-crud.service';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-user-veiculos',
  templateUrl: './user-veiculos.component.html',
  styleUrls: ['./user-veiculos.component.css']
})
export class UserVeiculosComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  ativo: number = 1;
  dataSearch: SearchData;

  constructor(
    private veiculosService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.veiculosService.search(this.searchText, page, this.ativo).toPromise();
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

  getNomeTipoVeiculo(tipo: number) {
    switch (tipo) {
      case 1:
        return "Veículo";
      case 2:
        return "Ônibus";
      default:
        return "Não Informado";
    }
  }

}
