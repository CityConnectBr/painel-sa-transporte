import { Veiculo } from './../../../../models/veiculo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchData } from 'src/app/services/basic-crud.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-formulario131substituicaodeveiculo',
  templateUrl: './user-formulario131substituicaodeveiculo.component.html',
  styleUrls: ['./user-formulario131substituicaodeveiculo.component.css'],
})
export class UserFormulario131substituicaodeveiculoComponent implements OnInit {
  loading: boolean = false;

  @ViewChild('visualizarVeiculos') visualizarVeiculos;

  searchText: string = '';
  dataSearch: SearchData;
  dataSearchVeiculo: SearchData;

  veiculoId: number;

  constructor(
    private permissionarioService: PermissionarioService,
    private veiculoService: VeiculoService,
    private formularioService: FormularioService,
    private toastr: ToastrService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {}

  async selecionarPermissionarioByEvent(event: any) {
    this.selecionar(this.visualizarVeiculos, event);
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

      this.veiculoId = null;
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
    this.closeModal(null);
    this.veiculoId = id;
    this.openModal(this.visualizarVeiculos);
  }

  async selecionarVeiculoSubstituto(id: number) {
    this.loading = true;
    try {
      const formulario = await this.formularioService
        .getFormulario131(this.veiculoId, id)
        .toPromise();
      const url = window.URL.createObjectURL(formulario);
      window.open(url);
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    } finally {
      this.loading = false;
      this.closeModal(null);
    }
  }

  closeModal(event: any) {
    return this.modal.dismissAll();
  }

  openModal(content: any) {
    this.modal.open(content);
  }
}
