import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchData } from 'src/app/services/basic-crud.service';
import { PermissionarioTableService } from './permissionario-table.service';

@Component({
  selector: 'app-permissionario-table',
  templateUrl: './permissionario-table.component.html',
  styleUrls: ['./permissionario-table.component.css'],
})
export class PermissionarioTableComponent implements OnInit {
  @Input() title: string = '';
  @Input() permissionarioId: string | undefined | null;
  @Input() naoPermitirSelecionarInativos: boolean = true;
  @Input() naoPermitirSelecionarFalecidos: boolean = true;
  @Input() selecionarSomenteModalidade: string = '';
  @Output() selecionarEvent = new EventEmitter<any>();

  loading: boolean = false;

  searchText: string = '';
  ativo: number = 1;
  modalidade: string = '';
  dataSearch: SearchData;

  constructor(private permissionarioService: PermissionarioTableService) {}

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      if (this.permissionarioId) {
        const permissionario = await this.permissionarioService
          .get(this.permissionarioId)
          .toPromise();

        if (permissionario) {
          this.dataSearch = {
            data: [permissionario],
            current_page: 1,
            ativo: true,
            next_page_url: '',
            prev_page_url: '',
          };
          this.selecionar(permissionario.id);

          return;
        }
      }

      this.dataSearch = await this.permissionarioService
        .searchPermissionario(
          this.searchText,
          page,
          this.ativo,
          this.modalidade
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

  public selecionar(id: number) {
    this.selecionarEvent.emit(id);
  }

  public isSelectable(permissionario: any) {
    if (this.naoPermitirSelecionarInativos && !permissionario.ativo) {
      return false;
    }

    if (this.naoPermitirSelecionarFalecidos && permissionario.data_obito) {
      return false;
    }

    if (
      this.selecionarSomenteModalidade &&
      this.selecionarSomenteModalidade != permissionario.modalidade.id
    ) {
      return false;
    }

    return true;
  }
}
