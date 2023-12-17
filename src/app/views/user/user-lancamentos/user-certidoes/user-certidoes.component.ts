import { firstValueFrom } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared-module';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'src/app/services/basic-crud.service';
import { CertidaoService } from 'src/app/services/certidao.service';
import { ImpressoesService } from 'src/app/services/impressoes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-certidoes',
  templateUrl: './user-certidoes.component.html',
  styleUrls: ['./user-certidoes.component.css'],
})
export class UserCertidoesComponent implements OnInit {
  loading: boolean = false;

  modalidadePermitida = "3";

  searchText: string = '';
  dataSearch: SearchData;
  dataSearchPermissionario: SearchData;

  @ViewChild('modalDataLimite') modalDataLimite;

  permissionarioSelecionado: string;
  formFiltroData: FormGroup;

  constructor(
    private certidaoService: CertidaoService,
    private permissionarioService: PermissionarioService,
    private impressoesService: ImpressoesService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    ///////FORM
    this.formFiltroData = this.formBuilder.group({
      data_inicial: new FormControl('', {
        validators: [Validators.required],
      }),
      data_final: new FormControl('', {
        validators: [Validators.required],
      }),
    });

    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.certidaoService
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

  alterar(id: number) {
    this.router.navigate(['alterar/' + id], { relativeTo: this.route });
  }

  async imprimir(id: number) {
    this.loading = true;
    const impressao = await this.impressoesService
      .getImpressao1Certificado(id)
      .toPromise();

    const url = window.URL.createObjectURL(impressao);
    window.open(url);
  }

  isMoreThan2Years(date: string) {
    const dateToCompare = SharedModule.convertAPITimeToDate(date);
    const date2Years = new Date();
    date2Years.setFullYear(date2Years.getFullYear() - 2);
    return dateToCompare < date2Years;
  }

  async initLista(modal) {
    console.log('initLista');
    this.dataSearchPermissionario = await firstValueFrom(
      this.permissionarioService.search('', 1)
    );
    this.openModal(modal);
  }

  async selecionarPermissionarioByEvent(event: any) {
    this.permissionarioSelecionado = event;
    this.closeModal(null);
    this.modal.open(this.modalDataLimite, { size: 'sm' });
  }

  async gerarRelatorio() {
    this.loading = true;
    try {
      const formulario = await this.impressoesService
        .getImpressao2CertificadoLista(
          this.permissionarioSelecionado,
          SharedModule.convertStringddMMyyyyToyyyyMMdd(
            this.formFiltroData.value.data_inicial
          ),
          SharedModule.convertStringddMMyyyyToyyyyMMdd(
            this.formFiltroData.value.data_final
          )
        )
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
