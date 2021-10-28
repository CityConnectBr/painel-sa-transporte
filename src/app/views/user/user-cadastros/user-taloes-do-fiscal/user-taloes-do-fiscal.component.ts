import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TalaoDoFiscal } from 'src/app/models/talao-do-fiscal';
import { SearchData } from 'src/app/services/basic-crud.service';
import { TalaoDoFiscalService } from 'src/app/services/talao-do-fiscal.service';

@Component({
  selector: 'app-user-taloes-do-fiscal',
  templateUrl: './user-taloes-do-fiscal.component.html',
  styleUrls: ['./user-taloes-do-fiscal.component.css']
})
export class UserTaloesDoFiscalComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  dataSearch: SearchData;

  constructor(
    private talaoDoFiscalService: TalaoDoFiscalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.talaoDoFiscalService.search(this.searchText, page).toPromise();
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
