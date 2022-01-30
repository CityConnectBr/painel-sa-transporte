import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { NaturezaDaInfracao } from 'src/app/models/natureza-da-infracao';
import { QuadroDeInfracoes } from 'src/app/models/quadro-de-infracoes';
import { NaturezaDaInfracaoService } from 'src/app/services/natureza-da-infracao.service';
import { QuadroDeInfracoesService } from 'src/app/services/quadro-de-infracoes.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-quadro-de-infracoes-crud',
  templateUrl: './user-quadro-de-infracoes-crud.component.html',
  styleUrls: ['./user-quadro-de-infracoes-crud.component.css']
})
export class UserQuadroDeInfracoesCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: QuadroDeInfracoes;

  naturezasDaInfracao: NaturezaDaInfracao[];

  constructor(
    private formBuilder: FormBuilder,
    private naturezaDaInfracaoService: NaturezaDaInfracaoService,
    private quadroDeInfracoesService: QuadroDeInfracoesService,
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
      this.naturezasDaInfracao = await this.naturezaDaInfracaoService.index().pipe(first()).toPromise();

      const idSelected: string = this.route.snapshot.paramMap.get('id');

      ///////FORM
      this.form = this.formBuilder.group({
        id_integracao: new FormControl('', {
          validators: [Validators.maxLength(20)],
        }),
        descricao: new FormControl('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(500)],
        }),
        acao: new FormControl('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(500)],
        }),
        reincidencia: new FormControl('', {
          validators: [Validators.minLength(2), Validators.maxLength(60)],
        }),
        modalidade_transporte: new FormControl('',),
        qtd_reincidencia: new FormControl('', {
          validators: [Validators.pattern(SharedModule.numberPatern), Validators.maxLength(15)],
        }),
        unidade_reincidencia: new FormControl('', {
          validators: [Validators.maxLength(5)],
        }),
        natureza_infracao_id: new FormControl('', {
          validators: [Validators.required],
        }),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.quadroDeInfracoesService.get(parseInt(idSelected)).toPromise();

        this.form.controls['id_integracao'].setValue(this.crudObj.id_integracao);
        this.form.controls['descricao'].setValue(this.crudObj.descricao);
        this.form.controls['acao'].setValue(this.crudObj.acao);
        this.form.controls['reincidencia'].setValue(this.crudObj.descricao);
        this.form.controls['modalidade_transporte'].setValue(this.crudObj.modalidade_transporte);
        this.form.controls['qtd_reincidencia'].setValue(this.crudObj.qtd_reincidencia);
        this.form.controls['unidade_reincidencia'].setValue(this.crudObj.unidade_reincidencia);
        this.form.controls['natureza_infracao_id'].setValue(this.crudObj.natureza_infracao_id);

        //forçando verificação de erros
        SharedModule.setAllFieldsFromFormAsTouched(this.form);
      }

    } catch (e: any) {
      console.error(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      if(!this.form.valid){
        this.snackbarService.openSnackBarError("Existem campos inválidos!");
        this.loading = false;
        return;
      }

      if (this.crudObj) {
        await this.quadroDeInfracoesService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.quadroDeInfracoesService.create(formInput).toPromise();
      }
      this.snackbarService.openSnackBarSucess('Quadro de Infrações salvo!');
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
      await this.quadroDeInfracoesService.delete(this.crudObj.id).toPromise();
      this.modal.dismissAll()
      this.snackbarService.openSnackBarSucess('Excluido com Sucesso!');
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

}
