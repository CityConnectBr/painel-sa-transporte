import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Destinatario } from 'src/app/models/mensagem';
import { Permissionario } from 'src/app/models/permissionario';
import { SearchData } from 'src/app/services/basic-crud.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';

@Component({
  selector: 'app-user-mensagens-envio-permissionario',
  templateUrl: './user-mensagens-envio-permissionario.component.html',
  styleUrls: ['./user-mensagens-envio-permissionario.component.css'],
})
export class UserMensagensEnvioPermissionarioComponent implements OnInit {
  @Input() selecionados: Destinatario[] = [];
  @Output() selecionadosChange = new EventEmitter<Destinatario[]>();

  loading: boolean = false;

  selectAll: boolean = false;

  searchText: string = '';
  ativo: number = 1;
  modalidade: string = '';
  dataSearch: SearchData;

  constructor(private permissionarioService: PermissionarioService) {}

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.permissionarioService
        .searchPermissionario(
          this.searchText,
          page,
          this.ativo,
          this.modalidade,
          true,
          true
        )
        .toPromise();
    } catch (e) {
      this.dataSearch = null;
    }
    this.loading = false;
  }

  public search(search: any) {
    this.searchText = search.text;
    this.ativo = search.ativo;
    this.modalidade = search.modalidade;
    this.loadList(1);
  }

  public changePos(page: number) {
    this.loadList(page && page > 0 ? page : 1);
  }

  public selecionar(obj: Permissionario) {
    const index = this.selecionados.findIndex(
      (item) => item.id === obj.id && item.tipo === 'permissionario'
    );

    if (index > -1) {
      this.selecionados.splice(index, 1);
    } else {
      this.selecionados.push({
        id: obj.id,
        nome: obj.nome_razao_social,
        tipo: 'permissionario', // permissionario, condutor, monitor, fiscal
        email: obj.email,
        fmc_token: obj.usuario?.token_fcm,
      } as Destinatario);
    }
    this.selecionadosChange.emit(this.selecionados);
  }

  public select(id: string): boolean {
    return (
      this.selecionados.findIndex(
        (item) => item.id == id && item.tipo === 'permissionario'
      ) > -1
    );
  }

  public async selecionarTodos() {
    if (this.selectAll) {
      this.loading = true;
      let todosPermissionarios = await this.permissionarioService
        .searchAllPermissionario(
          this.searchText,
          1,
          this.ativo,
          this.modalidade,
          true,
          true
        )
        .toPromise();

      todosPermissionarios = todosPermissionarios.map(
        (item) =>
          ({
            id: item.id,
            nome: item.nome_razao_social,
            tipo: 'permissionario', // permissionario, condutor, monitor, fiscal
            email: item.email,
            fmc_token: item.usuario?.token_fcm,
          } as Destinatario)
      );

      this.selecionados = [
        ...this.selecionados,
        ...(todosPermissionarios as Destinatario[]),
      ];
      this.loading = false;
    } else {
      this.selecionados = this.selecionados.filter(
        (item) => item.tipo !== 'permissionario'
      );
    }

    this.selecionadosChange.emit(this.selecionados);
  }
}
