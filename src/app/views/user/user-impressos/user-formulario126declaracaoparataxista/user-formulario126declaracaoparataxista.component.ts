import { Component, OnInit } from '@angular/core';
import { SearchData } from 'src/app/services/basic-crud.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-formulario126declaracaoparataxista',
  templateUrl: './user-formulario126declaracaoparataxista.component.html',
  styleUrls: ['./user-formulario126declaracaoparataxista.component.css'],
})
export class UserFormulario126declaracaoparataxistaComponent implements OnInit {
  loading: boolean = false;

  searchText: string = '';
  dataSearch: SearchData;

  constructor(
    private permissionarioService: PermissionarioService,
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

  async selecionar(id: number) {
    this.loading = true;
    try {
      const formulario = await this.formularioService
        .getFormulario126(id)
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
