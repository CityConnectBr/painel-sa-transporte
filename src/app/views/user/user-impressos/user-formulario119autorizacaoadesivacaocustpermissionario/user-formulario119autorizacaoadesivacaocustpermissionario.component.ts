import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchData } from 'src/app/services/basic-crud.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaVistoriadoraService } from 'src/app/services/empresa_vistoriadora.service';

@Component({
  selector: 'app-user-formulario119autorizacaoadesivacaocustpermissionario',
  templateUrl:
    './user-formulario119autorizacaoadesivacaocustpermissionario.component.html',
  styleUrls: [
    './user-formulario119autorizacaoadesivacaocustpermissionario.component.css',
  ],
})
export class UserFormulario119autorizacaoadesivacaocustpermissionarioComponent
  implements OnInit
{
  loading: boolean = false;

  @ViewChild('modalDataLimite') modalDataLimite;
  @ViewChild('modalEmpresas') modalEmpresas;
  @ViewChild('visualizarVeiculos') modalVisualizarVeiculos: any;

  searchText: string = '';
  dataSearch: SearchData;
  dataSearchVeiculo: SearchData;
  dataSearchEmpresas: SearchData;

  dataLimite: string;
  veiculoSelecionadoId: string;

  constructor(
    private permissionarioService: PermissionarioService,
    private empresaService: EmpresaVistoriadoraService,
    private veiculoService: VeiculoService,
    private formularioService: FormularioService,
    private toastr: ToastrService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadEmpresas();
  }

  async selecionarPermissionarioByEvent(event: any) {
    this.selecionar(this.modalVisualizarVeiculos, event);
  }

  private async loadEmpresas() {
    this.loading = true;
    try {
      this.dataSearchEmpresas = await this.empresaService
        .search('', 1)
        .toPromise();
    } catch (e) {
      this.dataSearchEmpresas = null;
    }
    this.loading = false;
  }

  async selecionar(modal, id: number) {
    this.loading = true;
    try {
      this.dataSearchVeiculo = await this.veiculoService
        .searchPorPermissionario(this.searchText, id.toString(), 1)
        .toPromise();

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

  async selecionarVeiculo(id: string) {
    this.veiculoSelecionadoId = id;
    this.openModal(this.modalDataLimite);
  }

  salvarDataLimite() {
    if (!this.dataLimite) {
      this.toastr.error('Informe a data limite');
      return;
    }

    this.closeModal(this.modalDataLimite);
    this.openModal(this.modalEmpresas);
  }

  async selecionarEmpresa(id: string) {
    this.loading = true;
    try {
      const formulario = await this.formularioService
        .getFormulario119(this.veiculoSelecionadoId, this.dataLimite, id)
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
