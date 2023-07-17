import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { AlvaraDoPermissionario } from 'src/app/models/alvara-do-permissionario';
import { Permissionario } from 'src/app/models/permissionario';
import { AlvaraDoPermissionarioService } from 'src/app/services/alvaradopermissinario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
@Component({
  selector: 'app-user-permissionario-alterar-alvara',
  templateUrl: './user-permissionario-alterar-alvara.component.html',
  styleUrls: ['./user-permissionario-alterar-alvara.component.css'],
})
export class UserPermissionarioAlterarAlvaraComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  errorMessage: string;

  permissionario: Permissionario;
  empresa: Empresa;

  empresas: Empresa[];

  alvarasAnteriores: AlvaraDoPermissionario[];

  alvaraAtual: AlvaraDoPermissionario;

  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private permissionarioService: PermissionarioService,
    private alvaraService: AlvaraDoPermissionarioService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modal: NgbModal
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = '';
    try {
      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.permissionario = await this.permissionarioService
        .get(idSelected)
        .pipe(first())
        .toPromise();
      this.empresas = await this.empresaService
        .index()
        .pipe(first())
        .toPromise();

      await this.loadAlvara(this.permissionario);
    } catch (e: any) {
      console.error(e);
      this.errorMessage = 'Ocorreu um erro ao montar a página';
    }
    this.loading = false;
  }

  private async loadAlvara(permissionario: Permissionario) {
    const { data } = await this.alvaraService
      .indexByPermissionario(permissionario.id.toString())
      .pipe(first())
      .toPromise();

    if (data && data.length > 0) {
      this.alvaraAtual = data[0];

      this.alvaraAtual = SharedModule.formatAllFieldsDateToddMMyyyy(
        this.alvaraAtual
      );
    }

    ///////FORM
    this.form = this.formBuilder.group({
      data_retorno: new FormControl(this.alvaraAtual?.data_retorno ?? '', {
        validators: [
          Validators.pattern(SharedModule.datePattern),
        ],
      }),
      data_emissao: new FormControl(this.alvaraAtual?.data_emissao ?? '', {
        validators: [
          Validators.required,
          Validators.pattern(SharedModule.datePattern),
        ],
      }),
      data_vencimento: new FormControl(
        this.alvaraAtual?.data_vencimento ?? '',
        {
          validators: [
            Validators.pattern(SharedModule.datePattern),
          ],
        }
      ),
      observacao_retorno: new FormControl(
        this.alvaraAtual?.observacao_retorno ?? ''
      ),
      valor: new FormControl(
        SharedModule.numberToCorrency(this.alvaraAtual?.valor) ?? '0,00',
        {
          validators: [
            Validators.pattern(SharedModule.numberPaternWithDotAndComma),
          ],
        }
      ),
      empresa_id: new FormControl(this.alvaraAtual?.empresa_id ?? '', {
        validators: [],
      }),
      chave_pix: new FormControl(this.alvaraAtual?.chave_pix ?? '', {
        validators: [],
      }),
      codigo_pix: new FormControl(this.alvaraAtual?.codigo_pix ?? '', {
        validators: [],
      }),
      tipoPix: new FormControl(0), ///nao é persistido
      tipoDeChavePix: new FormControl(0), ///nao é persistido
      status: new FormControl(this.alvaraAtual?.status ?? ''),
      dataPagamento: new FormControl(this.alvaraAtual?.data_pagamento ?? ''),
    });

    this.selecionarEmpresa(this.alvaraAtual?.empresa_id);

    this.alvarasAnteriores = data.filter((e, i) => i != 0);
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = '';
    try {
      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      if (this.alvaraAtual && this.alvaraAtual.id) {
        this.alvaraAtual.data_emissao = formInput.data_emissao;
        this.alvaraAtual.data_retorno = formInput.data_retorno;
        this.alvaraAtual.data_vencimento = formInput.data_emissao;
        this.alvaraAtual.observacao_retorno = formInput.observacao_retorno;
        this.alvaraAtual.valor = SharedModule.correncyToNumber(formInput.valor);
        this.alvaraAtual.empresa_id = formInput.empresa_id;
        this.alvaraAtual.chave_pix = formInput.chave_pix;
        this.alvaraAtual.codigo_pix = formInput.codigo_pix;
        this.alvaraAtual.tipo_pagamento = 'pix'; //somente pix por hora

        await this.alvaraService
          .update(this.alvaraAtual.id, this.alvaraAtual)
          .pipe(first())
          .toPromise();
      } else {
        formInput.permissionario_id = this.permissionario.id;
        formInput.tipo_pagamento = 'pix'; //somente pix por hora
        formInput.valor = SharedModule.correncyToNumber(formInput.valor);

        await this.alvaraService.create(formInput).pipe(first()).toPromise();
      }

      this.loadAlvara(this.permissionario);

      this.toastr.success('Alvará salvo!');
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  novo() {
    this.alvaraAtual = null;
    this.form.reset();
    this.modal.dismissAll();
  }

  selecionarEmpresa(event: any | string) {
    if (!event) {
      return;
    }

    this.empresa = this.empresas.find(
      (empresa) => empresa.id == (event.target ? event.target.value : event)
    );

    if (this.empresa && this.empresa.tipo_chave_pix && this.empresa.chave_pix) {
      this.form.controls['tipoDeChavePix'].setValue(
        this.empresaService.TIPOS_CHAVE_PIX.find(
          (tipo) => tipo.tipo == this.empresa.tipo_chave_pix
        ).id
      );
      this.form.controls['chave_pix'].setValue(this.empresa.chave_pix);
    }
  }

  public isStatusPago(): boolean {
    if (this.alvaraAtual && this.alvaraAtual.status == 'pago') {
      return true;
    }
    return false;
  }

  closeModal(event: any) {
    return this.modal.dismissAll();
  }

  openModal(content: any) {
    this.modal.open(content);
  }
}
