import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Destinatario } from 'src/app/models/mensagem';
import { Monitor } from 'src/app/models/monitor';
import { SearchData } from 'src/app/services/basic-crud.service';
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-user-mensagens-envio-monitor',
  templateUrl: './user-mensagens-envio-monitor.component.html',
  styleUrls: ['./user-mensagens-envio-monitor.component.css'],
})
export class UserMensagensEnvioMonitorComponent implements OnInit {
  @Input() selecionados: Destinatario[] = [];
  @Output() selecionadosChange = new EventEmitter<Destinatario[]>();

  loading: boolean = false;

  selectAll: boolean = false;

  searchText: string = '';
  ativo: number = 1;
  dataSearch: SearchData;

  constructor(private service: MonitorService) {}

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.service
        .searchAdvanced(this.searchText, page, this.ativo, true)
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

  public selecionar(obj: Monitor) {
    const index = this.selecionados.findIndex(
      (item) => item.id === obj.id && item.tipo === 'monitor'
    );

    if (index > -1) {
      this.selecionados.splice(index, 1);
    } else {
      this.selecionados.push({
        id: obj.id,
        nome: obj.nome,
        tipo: 'monitor', // permissionario, condutor, monitor, fiscal
        email: obj.email,
      } as Destinatario);
    }
    this.selecionadosChange.emit(this.selecionados);
  }

  public select(id: string): boolean {
    return (
      this.selecionados.findIndex(
        (item) => item.id == id && item.tipo === 'monitor'
      ) > -1
    );
  }

  public async selecionarTodos() {
    if (this.selectAll) {
      this.loading = true;
      let todos: any = await this.service
        .searchAllAdvanced(this.searchText, 1, this.ativo, true)
        .toPromise();

      todos = todos.map(
        (item) =>
          ({
            id: item.id,
            nome: item.nome,
            tipo: 'monitor', // permissionario, condutor, monitor, fiscal
            email: item.email,
          } as Destinatario)
      );

      this.selecionados = [...this.selecionados, ...todos];
      this.loading = false;
    } else {
      this.selecionados = this.selecionados.filter(
        (item) => item.tipo !== 'monitor'
      );
    }

    this.selecionadosChange.emit(this.selecionados);
  }
}
