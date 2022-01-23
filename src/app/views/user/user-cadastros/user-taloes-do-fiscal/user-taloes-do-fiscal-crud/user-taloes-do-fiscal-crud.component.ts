import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Fiscal } from 'src/app/models/fiscal';
import { TalaoDoFiscal } from 'src/app/models/talao-do-fiscal';
import { FiscalService } from 'src/app/services/fiscal.service';
import { TalaoDoFiscalService } from 'src/app/services/talao-do-fiscal.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-taloes-do-fiscal-crud',
  templateUrl: './user-taloes-do-fiscal-crud.component.html',
  styleUrls: ['./user-taloes-do-fiscal-crud.component.css']
})
export class UserTaloesDoFiscalCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: TalaoDoFiscal;

  subjectFiscal: Subject<any> = new Subject();

  fiscaisPesquisados: Map<String, String> = new Map();
  fiscalSelecionado: Fiscal;

  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private talaoDoFiscalService: TalaoDoFiscalService,
    private fiscalService: FiscalService,
    private location: Location,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
    private modal: NgbModal,
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = "";

    try {
      //pesquisa municipio
      this.subjectFiscal
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.searchFiscais();
        }
        );

      const idSelected: string = this.route.snapshot.paramMap.get('id');

      ///////FORM
      this.form = this.formBuilder.group({
        numero: new FormControl('', {
          validators: [Validators.required, Validators.maxLength(11)],
        }),
        tipo_documento: new FormControl('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(11)],
        }),
        serie_documento: new FormControl('', {
          validators: [Validators.maxLength(2)],
        }),
        numero_primeira_folha: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.numberPatern)],
        }),
        numero_ultima_folha: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.numberPatern)],
        }),
        data_recebimento: new FormControl('', {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        fiscal: new FormControl('', {
          validators: [],
        }),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.talaoDoFiscalService.get(parseInt(idSelected)).toPromise();
        this.fiscalSelecionado = await this.fiscalService.get(this.crudObj.fiscal_id).pipe(first()).toPromise();

        //formatando datas
        this.crudObj = SharedModule.formatAllFieldsDateToddMMyyyy(this.crudObj);

        this.form.controls['numero'].setValue(this.crudObj.numero);
        this.form.controls['tipo_documento'].setValue(this.crudObj.tipo_documento);
        this.form.controls['serie_documento'].setValue(this.crudObj.serie_documento);
        this.form.controls['numero_primeira_folha'].setValue(this.crudObj.numero_primeira_folha);
        this.form.controls['numero_ultima_folha'].setValue(this.crudObj.numero_ultima_folha);
        this.form.controls['data_recebimento'].setValue(this.crudObj.data_recebimento);
        this.form.controls['fiscal'].setValue(this.fiscalSelecionado.nome);
      }

    } catch (e: any) {
      console.error(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }
  ngOnDestroy() {
    this.subjectFiscal.unsubscribe();
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      if (!this.fiscalSelecionado) {
        this.snackbarService.openSnackBarError("Nenhum Fiscal selecionado!");
        this.loading = false;
        return;
      }

      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      formInput.fiscal_id = this.fiscalSelecionado.id;

      if (this.crudObj) {
        await this.talaoDoFiscalService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.talaoDoFiscalService.create(formInput).toPromise();
      }
      this.snackbarService.openSnackBarSucess('Talão salvo!');
      this.location.back()
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  async excluir() {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.talaoDoFiscalService.delete(this.crudObj.id).toPromise();
      this.modal.dismissAll()
      this.snackbarService.openSnackBarSucess('Excluido com Sucesso!');
      this.location.back()
    } catch (e: any) {
      this.modal.dismissAll()
      this.errorMessage = "Este não pode ser excluido!";
    }
    this.loading = false;
  }

  public async searchFiscais() {
    try {
      this.fiscalSelecionado = null;
      const result = await this.fiscalService
        .search(this.form.controls['fiscal'].value)
        .pipe(first())
        .toPromise();

      this.fiscaisPesquisados.clear();
      result.data.forEach((fiscal: Fiscal) => {
        this.fiscaisPesquisados.set(`${fiscal.id}`, fiscal.nome);
      });

    } catch (e: any) {
      this.snackbarService.openSnackBarError("Ocorreu um erro ao pesquisar.");
    }
  }

  public keyUpFiscal() {
    this.subjectFiscal.next();
  }

  public async setFiscal(event) {
    try {
      if (event) {
        this.form.controls['fiscal'].setValue("Carregando...");
        this.fiscalSelecionado = await this.fiscalService.get(event).pipe(first()).toPromise();
        this.form.controls['fiscal'].setValue(this.fiscalSelecionado.nome);
      }
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
  }

  public setFocusFiscalInput(focus: boolean) {
    if (focus) {
      this.searchFiscais();
    }
  }

  closeModal(event: any) {
    return this.modal.dismissAll()
  }

  openModal(content: any) {
    this.modal.open(content)
  }

}
