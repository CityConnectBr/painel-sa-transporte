import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchData } from 'src/app/services/basic-crud.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-formulario120solicitacaoafericaotaximetro',
  templateUrl: './user-formulario120solicitacaoafericaotaximetro.component.html',
  styleUrls: ['./user-formulario120solicitacaoafericaotaximetro.component.css']
})
export class UserFormulario120solicitacaoafericaotaximetroComponent implements OnInit {
  loading: boolean = false;

  @ViewChild('visualizarVeiculos') modalVisualizarVeiculos: any;

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
  }

  async selecionarPermissionarioByEvent(event: any) {
    this.selecionar(this.modalVisualizarVeiculos, event);
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

  async selecionarVeiculo(id: number) {
    this.loading = true;
    try {
      const formulario = await this.formularioService
        .getFormulario120(id)
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
