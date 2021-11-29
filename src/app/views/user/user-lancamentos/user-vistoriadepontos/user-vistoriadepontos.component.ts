import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'src/app/services/basic-crud.service';
import { VistoriaDePontoService } from 'src/app/services/vistoria-de-ponto.service';

@Component({
  selector: 'app-user-vistoriadepontos',
  templateUrl: './user-vistoriadepontos.component.html',
  styleUrls: ['./user-vistoriadepontos.component.css']
})
export class UserVistoriadepontosComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  dataSearch: SearchData;

  constructor(
    private vistoriaPontoService: VistoriaDePontoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.vistoriaPontoService.search(this.searchText, page).toPromise();
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
