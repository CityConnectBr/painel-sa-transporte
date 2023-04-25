import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Condutor } from 'src/app/models/condutores';
import { SolicitacaoDeAlteracao } from 'src/app/models/solicitacao';
import { SearchData } from 'src/app/services/basic-crud.service';
import { CondutorService } from 'src/app/services/condutor.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-formulario8-condutor-auxiliar',
  templateUrl: './user-formulario8-condutor-auxiliar.component.html',
  styleUrls: ['./user-formulario8-condutor-auxiliar.component.css']
})
export class UserFormulario8CondutorAuxiliarComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  dataSearch: SearchData;

  permissionarioSelecionadoId: number;
  condutores: Condutor[];
  solicitacoes: SolicitacaoDeAlteracao[];

  constructor(
    private permissionarioService: PermissionarioService,
    private condutorService: CondutorService,
    private solicitadaoService: SolicitacaoService,
    private formularioService: FormularioService,
    private toastr: ToastrService,
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

  async selecionarNovo(permissionarioId: number, modal) {
    this.loading = true;
    try {
      this.permissionarioSelecionadoId = permissionarioId;
      this.solicitacoes = await this.solicitadaoService.indexByPermissionarioAndTipo(permissionarioId, 5).toPromise();//tipo 5 = novo condutor

      if(this.solicitacoes.length == 0){
        this.toastr.error("Não existem solicitações de novo condutor para este Permissionário.");
        return;
      }

      this.modal.open(modal);
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    }finally{
      this.loading = false;
    }
  }

  async selecionarParaRenovacao(permissionarioId: number, modal) {
    this.loading = true;
    try {
      this.permissionarioSelecionadoId = permissionarioId;
      this.condutores = await this.condutorService.indexByPermissionario(permissionarioId).toPromise();

      if(this.condutores.length == 0){
        this.toastr.error("Não existem condutores cadastrados para este Permissionário.");
        return;
      }

      this.modal.open(modal);
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    }finally{
      this.loading = false;
    }
  }

  async selecionarCondutor(id: any) {
    this.loading = true;
    try {
      const formulario = await this.formularioService.getFormulario8ByCondutor(this.permissionarioSelecionadoId, id).toPromise();
      const url = window.URL.createObjectURL(formulario);
      window.open(url);
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    }
    this.loading = false;
  }

  async selecionarSolicitacao(id: any) {
    this.loading = true;
    try {
      const formulario = await this.formularioService.getFormulario8BySolicitacao(this.permissionarioSelecionadoId, id).toPromise();
      const url = window.URL.createObjectURL(formulario);
      window.open(url);
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
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
