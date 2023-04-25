import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitacaoDeAlteracao } from 'src/app/models/solicitacao';
import { SearchData } from 'src/app/services/basic-crud.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { MonitorService } from 'src/app/services/monitor.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-formulario7-declaracao-monitor',
  templateUrl: './user-formulario7-declaracao-monitor.component.html',
  styleUrls: ['./user-formulario7-declaracao-monitor.component.css']
})
export class UserFormulario7DeclaracaoMonitorComponent implements OnInit {

  loading: boolean = false;
  subloading: boolean = false;

  searchText: string = "";
  dataSearch: SearchData;

  searchTextMonitor: string = "";
  dataSearchMonitor: SearchData;

  dataSearchSolicitacao: SolicitacaoDeAlteracao[];

  permissionarioSelecionadoId: number;
  monitorSelecionadoId: number;
  solicitacaoSelecionadaId: number;

  step = 1;

  constructor(
    private permissionarioService: PermissionarioService,
    private formularioService: FormularioService,
    private solicitadaoService: SolicitacaoService,
    private monitorService: MonitorService,
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

  public search(text: string = '') {
    this.searchText = text;
    this.loadList(1);
  }

  public async searchMonitor(text: string = '') {
    this.searchTextMonitor = text;
    this.subloading = true;
    try {
      this.dataSearchMonitor = await this.monitorService.searchByPermissionario(this.permissionarioSelecionadoId, this.searchTextMonitor, 1).toPromise();
    } catch (e) {
      this.dataSearchMonitor = null;
    }
    this.subloading = false;
  }

  public async searchSolicitacao() {
    this.subloading = true;
    try {
      this.dataSearchSolicitacao = await this.solicitadaoService.indexByPermissionarioAndTipo(this.permissionarioSelecionadoId, 23).toPromise(); // 23 = monitor_cadastro
    } catch (e) {
      this.dataSearchSolicitacao = null;
    }
    this.subloading = false;
  }

  public changePos(page: number) {
    this.loadList(page && page > 0 ? page : 1);
  }

  async selecionarPermissionario(id: number, modal) {
    this.loading = true;
    try {
      this.step = 1;
      this.permissionarioSelecionadoId = id;
      this.openModal(modal);
      this.searchMonitor();
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    }
    this.loading = false;
  }

  async selecionarMonitor(id: number) {
    this.loading = true;
    try {
      this.step = 2;
      this.monitorSelecionadoId = id;
      this.searchSolicitacao();
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    }
    this.loading = false;
  }

  async gerarFormulario() {
    this.loading = true;
    try {
      const formulario = await this.formularioService.getFormulario7(this.permissionarioSelecionadoId, this.monitorSelecionadoId, this.solicitacaoSelecionadaId).toPromise();
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
      this.step = 3;
      this.solicitacaoSelecionadaId = id;
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    }
    this.loading = false;
  }

  backStep() {
    this.step--;
    if (this.step == 1) {
      this.searchMonitor();
    } else if (this.step == 2) {
      this.searchMonitor();
    } else if (this.step == 3) {
      this.searchMonitor();
    }
  }

  getStatus(status: string): string {
    return SharedModule.getStatusSolicitacao(status);
  }

  closeModal(event: any) {
    return this.modal.dismissAll()
  }

  openModal(content: any) {
    this.modal.open(content)
  }

}
