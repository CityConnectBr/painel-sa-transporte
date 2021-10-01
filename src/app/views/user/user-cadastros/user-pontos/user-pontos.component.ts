import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'src/app/services/basic-crud.service';
import { PontoService } from 'src/app/services/ponto.service';

@Component({
  selector: 'app-user-pontos',
  templateUrl: './user-pontos.component.html',
  styleUrls: ['./user-pontos.component.css']
})
export class UserPontosComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  dataSearch: SearchData;

  constructor(
    private pontoService: PontoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.pontoService.search(this.searchText, page).toPromise();
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
    this.router.navigate(['alterar/' + id + '/dados'], {relativeTo:this.route});
  }

}
