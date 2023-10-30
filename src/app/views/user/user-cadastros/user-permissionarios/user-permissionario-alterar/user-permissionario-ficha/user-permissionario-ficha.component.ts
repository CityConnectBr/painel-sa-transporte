import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SearchData } from 'src/app/services/basic-crud.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { SharedModule } from 'src/app/shared/shared-module';

@Component({
  selector: 'app-user-permissionario-ficha[permissionarioId]',
  templateUrl: './user-permissionario-ficha.component.html',
  styleUrls: ['./user-permissionario-ficha.component.css'],
})
export class UserPermissionarioFichaComponent implements OnInit {
  loading: boolean = false;

  @Input() permissionarioId: string;

  @ViewChild('visualizarVeiculos') modalVisualizarVeiculos: any;

  searchText: string = '';
  dataSearchVeiculo: SearchData;

  constructor(
    private veiculoService: VeiculoService,
    private formularioService: FormularioService,
    private toastr: ToastrService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {}

  async gerarFicha() {
    this.loading = true;
    try {
      this.dataSearchVeiculo = await this.veiculoService
        .searchPorPermissionario(this.searchText, this.permissionarioId, 1)
        .toPromise();

      if (this.dataSearchVeiculo.data.length == 0) {
        this.toastr.error('Nenhum veículo encontrado para este permissionário');
        return;
      }

      if (this.dataSearchVeiculo.data.length == 1) {
        this.selecionarVeiculo(this.dataSearchVeiculo.data[0].id);
      } else {
        this.openModal(this.modalVisualizarVeiculos);
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
        .getFormulario136(id)
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
