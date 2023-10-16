import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fiscal } from 'src/app/models/fiscal';
import { Destinatario } from 'src/app/models/mensagem';
import { SearchData } from 'src/app/services/basic-crud.service';
import { FiscalService } from 'src/app/services/fiscal.service';

@Component({
  selector: 'app-user-mensagens-envio-fiscal',
  templateUrl: './user-mensagens-envio-fiscal.component.html',
  styleUrls: ['./user-mensagens-envio-fiscal.component.css']
})
export class UserMensagensEnvioFiscalComponent implements OnInit {
  @Input() selecionados: Destinatario[] = [];
  @Output() selecionadosChange = new EventEmitter<Destinatario[]>();

  loading: boolean = false;

  selectAll: boolean = false;

  searchText: string = '';
  ativo: number = 1;
  dataSearch: SearchData;

  constructor(private service: FiscalService) {}

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.service
        .searchAdvanced(this.searchText, page, this.ativo, true, true)
        .toPromise();
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

  public changePos(page: number) {
    this.loadList(page && page > 0 ? page : 1);
  }

  public selecionar(obj: Fiscal) {
    const index = this.selecionados.findIndex(
      (item) => item.id === obj.id && item.tipo === 'fiscal'
    );

    if (index > -1) {
      this.selecionados.splice(index, 1);
    } else {
      this.selecionados.push({
        id: obj.id,
        nome: obj.nome,
        tipo: 'fiscal', // permissionario, condutor, monitor, fiscal
        email: obj.email,
        fmc_token: obj.usuario?.token_fcm,
      } as Destinatario);
    }
    this.selecionadosChange.emit(this.selecionados);
  }

  public select(id: string): boolean {
    return (
      this.selecionados.findIndex(
        (item) => item.id == id && item.tipo === 'fiscal'
      ) > -1
    );
  }

  public async selecionarTodos() {
    if (this.selectAll) {
      this.loading = true;
      let todos: any = await this.service
        .searchAllAdvanced(this.searchText, 1, this.ativo, true, true)
        .toPromise();

      todos = todos.map(
        (item) =>
          ({
            id: item.id,
            nome: item.nome,
            tipo: 'fiscal', // permissionario, condutor, monitor, fiscal
            email: item.email,
            fmc_token: item.usuario?.token_fcm,
          } as Destinatario)
      );

      this.selecionados = [...this.selecionados, ...todos];
      this.loading = false;
    } else {
      this.selecionados = this.selecionados.filter(
        (item) => item.tipo !== 'fiscal'
      );
    }

    this.selecionadosChange.emit(this.selecionados);
  }
}
