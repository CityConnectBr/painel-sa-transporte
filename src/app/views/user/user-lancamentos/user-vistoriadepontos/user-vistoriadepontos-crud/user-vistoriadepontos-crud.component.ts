import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';
import { debounceTime, first } from 'rxjs/operators';
import { Ponto } from 'src/app/models/ponto';
import { VistoriaDePonto } from 'src/app/models/vistoria-de-ponto';
import { VistoriaDePontoService } from 'src/app/services/vistoria-de-ponto.service';
import { PontoService } from 'src/app/services/ponto.service';
import { VistoriadorService } from 'src/app/services/vistoriador.service';
import { Vistoriador } from 'src/app/models/vistoriador';

@Component({
  selector: 'app-user-vistoriadepontos-crud',
  templateUrl: './user-vistoriadepontos-crud.component.html',
  styleUrls: ['./user-vistoriadepontos-crud.component.css']
})
export class UserVistoriadepontosCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  subjectVistoriador: Subject<any> = new Subject();

  pontos: Ponto[];

  vistoriadoresPesquisados: Map<String, String> = new Map();
  vistoriadorSelecionado: Vistoriador;

  @ViewChild('vistoriadorInput') vistoriadorInputElement: ElementRef;

  crudObj: VistoriaDePonto;

  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private vistoriaDePontoService: VistoriaDePontoService,
    private vistoriadorService: VistoriadorService,
    private pontoService: PontoService,
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
      this.subjectVistoriador
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.searchVistoriadores();
      }
      );

      const idSelected: string = this.route.snapshot.paramMap.get('id');

      this.pontos = await this.pontoService.index().pipe(first()).toPromise();

      ///////FORM
      this.form = this.formBuilder.group({
        data_vistoria: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.datePattern)],
        }),
        condicoes_de_pintura: new FormControl("", {
          validators: [Validators.required],
        }),
        condicoes_de_cobertura: new FormControl("", {
          validators: [Validators.required],
        }),
        condicoes_de_emplacamento: new FormControl("", {
          validators: [Validators.required],
        }),
        condicoes_de_sanitario: new FormControl("", {
          validators: [Validators.required],
        }),
        observacoes: new FormControl("", {
          validators: [Validators.maxLength(500)],
        }),
        ponto_id: new FormControl("", {
          validators: [Validators.required],
        }),
        vistoriador: new FormControl(""),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.vistoriaDePontoService.get(parseInt(idSelected)).toPromise();
        this.vistoriadorSelecionado = await this.vistoriadorService.get(this.crudObj.vistoriador_id).pipe(first()).toPromise();

        this.crudObj = SharedModule.formatAllFieldsDateToddMMyyyy(this.crudObj);

        this.form.controls['data_vistoria'].setValue(this.crudObj.data_vistoria);
        this.form.controls['condicoes_de_pintura'].setValue(this.crudObj.condicoes_de_pintura);
        this.form.controls['condicoes_de_cobertura'].setValue(this.crudObj.condicoes_de_cobertura);
        this.form.controls['condicoes_de_emplacamento'].setValue(this.crudObj.condicoes_de_emplacamento);
        this.form.controls['condicoes_de_sanitario'].setValue(this.crudObj.condicoes_de_sanitario);
        this.form.controls['observacoes'].setValue(this.crudObj.observacoes);
        this.form.controls['vistoriador'].setValue(this.vistoriadorSelecionado.nome);
        this.form.controls['ponto_id'].setValue(this.crudObj.ponto_id);
      }

    } catch (e: any) {
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {

      if (!this.vistoriadorSelecionado) {
        this.snackbarService.openSnackBarError("Nenhum vistoriador selecionado!");
        this.loading = false;
        return;
      }


      formInput.vistoriador_id = this.vistoriadorSelecionado.id;

      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      if (this.crudObj) {
        await this.vistoriaDePontoService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.vistoriaDePontoService.create(formInput).toPromise();
      }
      this.snackbarService.openSnackBarSucess('Vistoria salva!');
      this.location.back()
    } catch (e: any) {
      console.error(e);
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  async excluir() {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.vistoriadorService.delete(this.crudObj.id).toPromise();
      this.modal.dismissAll()
      this.snackbarService.openSnackBarSucess('Excluida com Sucesso!');
      this.location.back()
    } catch (e: any) {
      this.modal.dismissAll()
      this.errorMessage = "Este não pode ser excluido!";
    }
    this.loading = false;
  }

  closeModal(event: any) {
    return this.modal.dismissAll()
  }

  openModal(content: any) {
    this.modal.open(content)
  }

  public async searchVistoriadores() {
    try {
      this.vistoriadorSelecionado = null;
      const result = await this.vistoriadorService
        .search(this.form.controls['vistoriador'].value)
        .pipe(first())
        .toPromise();

      this.vistoriadoresPesquisados.clear();
      result.data.forEach((obj: Vistoriador) => {
        this.vistoriadoresPesquisados.set(`${obj.id}`, obj.nome);
      });

    } catch (e: any) {
      this.snackbarService.openSnackBarError("Ocorreu um erro ao pesquisar.");
    }
  }

  public keyUpVistoriador() {
    this.subjectVistoriador.next(null);
  }

  public async setVistoriador(event) {
    try {
      if (event) {
        this.form.controls['vistoriador'].setValue("Carregando...");
        this.vistoriadorSelecionado = await this.vistoriadorService.get(event).pipe(first()).toPromise();
        this.form.controls['vistoriador'].setValue(this.vistoriadorSelecionado.nome);
      }
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
  }

  public setFocusVistoriadorInput(focus: boolean) {
    if (focus) {
      this.searchVistoriadores();
    }
  }

}
