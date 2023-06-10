import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchData } from 'src/app/services/basic-crud.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-formulario130notificacao',
  templateUrl: './user-formulario130notificacao.component.html',
  styleUrls: ['./user-formulario130notificacao.component.css']
})
export class UserFormulario130notificacaoComponent
  implements OnInit
{
  loading: boolean = false;

  @ViewChild('modalInfoAdicionais') modalInfoAdicionais;

  searchText: string = '';
  dataSearch: SearchData;
  dataSearchVeiculo: SearchData;

  form: FormGroup;
  veiculoSelecionadoId: string;

  constructor(
    private permissionarioService: PermissionarioService,
    private veiculoService: VeiculoService,
    private formularioService: FormularioService,
    private toastr: ToastrService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadList(1);

    this.form = new FormGroup({
      prazo: new FormControl('', Validators.required),
      notificado: new FormControl('', Validators.required),
    });
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
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
    this.openModal(this.modalInfoAdicionais);
  }

  async salvarForm() {
    this.loading = true;
    try {
      if (this.form.invalid) {
        this.toastr.error('Preencha todos os campos');
        return;
      }

      const formulario = await this.formularioService
        .getFormulario130(
          this.veiculoSelecionadoId,
          this.form.value.prazo,
          this.form.value.notificado
        )
        .toPromise();
      const url = window.URL.createObjectURL(formulario);
      window.open(url);
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    }finally {
      this.loading = false;
    }
  }

  closeModal(event: any) {
    return this.modal.dismissAll();
  }

  openModal(content: any) {
    this.modal.open(content);
  }
}
