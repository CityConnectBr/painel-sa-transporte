import { SharedModule } from 'src/app/shared/shared-module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'src/app/services/basic-crud.service';
import { CertidaoService } from 'src/app/services/certidao.service';
import { ImpressoesService } from 'src/app/services/impressoes.service';

@Component({
  selector: 'app-user-certidoes',
  templateUrl: './user-certidoes.component.html',
  styleUrls: ['./user-certidoes.component.css'],
})
export class UserCertidoesComponent implements OnInit {
  loading: boolean = false;

  searchText: string = '';
  dataSearch: SearchData;

  constructor(
    private certidaoService: CertidaoService,
    private impressoesService: ImpressoesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.certidaoService
        .search(this.searchText, page)
        .toPromise();
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

  async imprimir(id: number) {
    this.loading = true;
    const impressao = await this.impressoesService
      .getImpressao1Certificado(id)
      .toPromise();

    const url = window.URL.createObjectURL(impressao);
    window.open(url);
  }

  isMoreThan2Years(date: string) {
    const dateToCompare = SharedModule.convertAPITimeToDate(date);
    const date2Years = new Date();
    date2Years.setFullYear(date2Years.getFullYear() - 2);
    return dateToCompare < date2Years;
  }
}
