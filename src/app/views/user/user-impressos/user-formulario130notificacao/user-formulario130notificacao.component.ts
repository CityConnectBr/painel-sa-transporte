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
  styleUrls: ['./user-formulario130notificacao.component.css'],
})
export class UserFormulario130notificacaoComponent implements OnInit {
  loading: boolean = false;

  @ViewChild('modalInfoAdicionais') modalInfoAdicionais;

  searchText: string = '';
  dataSearch: SearchData;

  form: FormGroup;

  constructor(
    private formularioService: FormularioService,
    private toastr: ToastrService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      permissionario: new FormControl('', Validators.required),
      prazo: new FormControl('', Validators.required),
      notificado: new FormControl('', Validators.required),
    });
  }

  async selecionarPermissionarioByEvent(event: any) {
    this.selecionar(this.modalInfoAdicionais, event);
  }

  async selecionar(modal, id: number) {
    this.loading = true;
    try {
      this.form.get('permissionario').setValue(id);
      this.openModal(modal);
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    } finally {
      this.loading = false;
    }
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
          this.form.value.permissionario,
          this.form.value.prazo,
          this.form.value.notificado
        )
        .toPromise();
      const url = window.URL.createObjectURL(formulario);
      window.open(url);
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    } finally {
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
