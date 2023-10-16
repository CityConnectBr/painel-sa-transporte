import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Condutor } from 'src/app/models/condutores';
import { Destinatario } from 'src/app/models/mensagem';
import { SearchData } from 'src/app/services/basic-crud.service';
import { CondutorService } from 'src/app/services/condutor.service';

@Component({
  selector: 'app-user-mensagens-envio-condutor',
  templateUrl: './user-mensagens-envio-condutor.component.html',
  styleUrls: ['./user-mensagens-envio-condutor.component.css'],
})
export class UserMensagensEnvioCondutorComponent implements OnInit {
  @Input() selecionados: Destinatario[] = [];
  @Output() selecionadosChange = new EventEmitter<Destinatario[]>();

  loading: boolean = false;

  selectAll: boolean = false;

  searchText: string = '';
  ativo: number = 1;
  dataSearch: SearchData;

  constructor(private service: CondutorService) {}

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

  public selecionar(obj: Condutor) {
    const index = this.selecionados.findIndex(
      (item) => item.id === obj.id && item.tipo === 'condutor'
    );

    if (index > -1) {
      this.selecionados.splice(index, 1);
    } else {
      this.selecionados.push({
        id: obj.id,
        nome: obj.nome,
        tipo: 'condutor', // permissionario, condutor, monitor, fiscal
        email: obj.email,
        fmc_token: obj.usuario?.token_fcm,
      } as Destinatario);
    }
    this.selecionadosChange.emit(this.selecionados);
  }

  public isSelectable(id: string): boolean {
    return (
      this.selecionados.findIndex(
        (item) => item.id == id && item.tipo === 'condutor'
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
            tipo: 'condutor', // permissionario, condutor, monitor, fiscal
            email: item.email,
            fmc_token: item.usuario?.token_fcm,
          } as Destinatario)
      );

      this.selecionados = [...this.selecionados, ...todos];
      this.loading = false;
    } else {
      this.selecionados = this.selecionados.filter(
        (item) => item.tipo !== 'condutor'
      );
    }

    this.selecionadosChange.emit(this.selecionados);
  }
}
