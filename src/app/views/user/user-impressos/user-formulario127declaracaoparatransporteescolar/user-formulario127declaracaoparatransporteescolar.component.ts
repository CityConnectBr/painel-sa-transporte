import { Component, OnInit } from '@angular/core';
import { SearchData } from 'src/app/services/basic-crud.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-formulario127declaracaoparatransporteescolar',
  templateUrl:
    './user-formulario127declaracaoparatransporteescolar.component.html',
  styleUrls: [
    './user-formulario127declaracaoparatransporteescolar.component.css',
  ],
})
export class UserFormulario127declaracaoparatransporteescolarComponent
  implements OnInit
{
  loading: boolean = false;

  searchText: string = '';
  dataSearch: SearchData;

  constructor(
    private permissionarioService: PermissionarioService,
    private formularioService: FormularioService,
    private toastr: ToastrService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {}

  async selecionarPermissionarioByEvent(event: any) {
    this.selecionar(event);
  }

  async selecionar(id: number) {
    this.loading = true;
    try {
      const formulario = await this.formularioService
        .getFormulario127(id)
        .toPromise();
      const url = window.URL.createObjectURL(formulario);
      window.open(url);
      this.closeModal(null);
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
