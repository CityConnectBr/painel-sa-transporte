import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'src/app/services/basic-crud.service';
import { CorDoVeiculoService } from 'src/app/services/cor-do-veiculo.service';
import { TipoDeCombustivelService } from 'src/app/services/tipo-de-combustivel.service';

@Component({
  selector: 'app-user-tipos-de-combustivel',
  templateUrl: './user-tipos-de-combustivel.component.html',
  styleUrls: ['./user-tipos-de-combustivel.component.css']
})
export class UserTiposDeCombustivelComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  dataSearch: SearchData;

  constructor(
    private tipoDeCombustivelService: TipoDeCombustivelService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.tipoDeCombustivelService.search(this.searchText, page).toPromise();
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
