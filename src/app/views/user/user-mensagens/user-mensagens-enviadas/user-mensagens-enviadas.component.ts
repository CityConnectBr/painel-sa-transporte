import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'src/app/services/basic-crud.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-user-mensagens-enviadas',
  templateUrl: './user-mensagens-enviadas.component.html',
  styleUrls: ['./user-mensagens-enviadas.component.css'],
})
export class UserMensagensEnviadasComponent implements OnInit {
  loading: boolean = false;

  searchText: string = '';
  dataSearch: SearchData;

  constructor(
    private service: MensagemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.service
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

}
