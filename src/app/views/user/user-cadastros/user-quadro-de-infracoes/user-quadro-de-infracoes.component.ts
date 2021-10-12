import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'src/app/services/basic-crud.service';
import { QuadroDeInfracoesService } from 'src/app/services/quadro-de-infracoes.service';

@Component({
  selector: 'app-user-quadro-de-infracoes',
  templateUrl: './user-quadro-de-infracoes.component.html',
  styleUrls: ['./user-quadro-de-infracoes.component.css']
})
export class UserQuadroDeInfracoesComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  dataSearch: SearchData;

  constructor(
    private quadroDeInfracoesService: QuadroDeInfracoesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.quadroDeInfracoesService.search(this.searchText, page).toPromise();
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
