import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'src/app/services/basic-crud.service';
import { FiscalService } from 'src/app/services/fiscal.service';

@Component({
  selector: 'app-user-fiscais',
  templateUrl: './user-fiscais.component.html',
  styleUrls: ['./user-fiscais.component.css']
})
export class UserFiscaisComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  dataSearch: SearchData;

  constructor(
    private fiscalService: FiscalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.fiscalService.search(this.searchText, page).toPromise();
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
