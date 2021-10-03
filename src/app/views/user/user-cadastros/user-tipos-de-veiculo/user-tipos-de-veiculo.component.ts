import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'src/app/services/basic-crud.service';
import { TipoDeVeiculoService } from 'src/app/services/tipo-de-veiculo.service';

@Component({
  selector: 'app-user-tipos-de-veiculo',
  templateUrl: './user-tipos-de-veiculo.component.html',
  styleUrls: ['./user-tipos-de-veiculo.component.css']
})
export class UserTiposDeVeiculoComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  dataSearch: SearchData;

  constructor(
    private tipoDeVeiculoService: TipoDeVeiculoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.tipoDeVeiculoService.search(this.searchText, page).toPromise();
    } catch (e) {
      this.dataSearch = null;
    }
    this.loading = false;
  }

  public search(text: string = '') {
    this.searchText = text;
    this.loadList(1);
  }

  public changePos(page: number) {
    this.loadList(page && page > 0 ? page : 1);
  }

  alterar(id: number) {
    this.router.navigate(['alterar/' + id], { relativeTo: this.route });
  }

  findDescModalidade(modalidade: string) {
    if (modalidade) {
      return TipoDeVeiculoService.modalidades.find(m => m.id == modalidade)
    }
  }

}
