import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Condutor } from 'src/app/models/condutores';
import { SearchData } from 'src/app/services/basic-crud.service';
import { CondutorService } from 'src/app/services/condutor.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-formulario17-solicitaacao-baixa-condutor',
  templateUrl: './user-formulario17-solicitaacao-baixa-condutor.component.html',
  styleUrls: ['./user-formulario17-solicitaacao-baixa-condutor.component.css']
})
export class UserFormulario17SolicitaacaoBaixaCondutorComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  dataSearch: SearchData;

  permissionarioSelecionadoId: number;
  condutores: Condutor[];

  constructor(
    private permissionarioService: PermissionarioService,
    private condutorService: CondutorService,
    private formularioService: FormularioService,
    private snackbarService: SnackBarService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.permissionarioService.search(this.searchText, page).toPromise();
    } catch (e) {
      this.dataSearch = null;
    }
    this.loading = false;
  }

  public search(text: string = ''){
    this.searchText = text;
    this.loadList(1);
  }

  public changePos(page: number){
    this.loadList(page && page>0?page:1);
  }

  async selecionar(permissionarioId: number, modal) {
    this.loading = true;
    try {
      this.permissionarioSelecionadoId = permissionarioId;
      this.condutores = await this.condutorService.indexByPermissionario(permissionarioId).pipe(first()).toPromise();

      if(this.condutores.length == 0){
        this.snackbarService.openSnackBarError("Não existem condutores cadastrados para este Permissionário.");
        return;
      }

      this.modal.open(modal);
    } catch (e) {
      this.snackbarService.openSnackBarError(SharedModule.handleError(e));
    }finally{
      this.loading = false;
    }
  }

  async selecionarCondutor(id: number) {
    this.loading = true;
    try {
      const formulario = await this.formularioService.getFormulario17(this.permissionarioSelecionadoId, id).toPromise();
      const url = window.URL.createObjectURL(formulario);
      window.open(url);
    } catch (e) {
      this.snackbarService.openSnackBarError(SharedModule.handleError(e));
    }
    this.loading = false;
  }

  closeModal(event: any) {
    return this.modal.dismissAll()
  }

  openModal(content: any) {
    this.modal.open(content)
  }

}
