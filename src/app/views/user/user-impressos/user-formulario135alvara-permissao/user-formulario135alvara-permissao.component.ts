import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SearchData } from 'src/app/services/basic-crud.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-formulario135alvara-permissao',
  templateUrl: './user-formulario135alvara-permissao.component.html',
  styleUrls: ['./user-formulario135alvara-permissao.component.css'],
})
export class UserFormulario135alvaraPermissaoComponent implements OnInit {
  @Input() permissionarioId: string | undefined | null;

  @ViewChild('modalVisualizarVeiculos') modalVisualizarVeiculos: any;

  loading: boolean = false;

  searchText: string = '';
  dataSearch: SearchData;
  dataSearchVeiculo: SearchData;

  constructor(
    private permissionarioService: PermissionarioService,
    private veiculoService: VeiculoService,
    private formularioService: FormularioService,
    private toastr: ToastrService,
    private modal: NgbModal
  ) {}

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
          await this.selecionar(
            this.modalVisualizarVeiculos,
            permissionario.id
          );

          return;
        }
      }

      this.dataSearch = await this.permissionarioService
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

  async selecionar(modal: any, id: number) {
    this.loading = true;
    try {
      console.log('--------- 01', id);
      this.dataSearchVeiculo = await this.veiculoService
        .searchPorPermissionario(this.searchText, id.toString(), 1)
        .toPromise();
      console.log('--------- 02', this.dataSearchVeiculo);

      if (this.dataSearchVeiculo.data.length == 0) {
        this.toastr.error('Nenhum veículo encontrado para este permissionário');
        return;
      }

      if (this.dataSearchVeiculo.data.length == 1) {
        this.selecionarVeiculo(this.dataSearchVeiculo.data[0].id);
      } else {
        this.openModal(modal);
      }
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    } finally {
      this.loading = false;
    }
  }

  async selecionarVeiculo(id: number) {
    this.loading = true;
    try {
      const formulario = await this.formularioService
        .getFormulario135(id)
        .toPromise();
      const url = window.URL.createObjectURL(formulario);
      window.open(url);
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    }
    this.loading = false;
  }

  closeModal(event: any) {
    return this.modal.dismissAll();
  }

  openModal(content: any) {
    this.modal.open(content);
  }
}
