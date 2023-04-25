import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { Moeda } from 'src/app/models/moeda';
import { NaturezaDaInfracao } from 'src/app/models/natureza-da-infracao';
import { ValoresDeInfracao } from 'src/app/models/valores-de-infracao';
import { MoedaService } from 'src/app/services/moeda.service';
import { NaturezaDaInfracaoService } from 'src/app/services/natureza-da-infracao.service';
import { ValoresDeInfracaoService } from 'src/app/services/valores-de-infracao.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-valores-de-infracao-crud',
  templateUrl: './user-valores-de-infracao-crud.component.html',
  styleUrls: ['./user-valores-de-infracao-crud.component.css']
})
export class UserValoresDeInfracaoCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: ValoresDeInfracao;

  tiposDeMoeda: Moeda[];
  naturezas: NaturezaDaInfracao[];

  constructor(
    private formBuilder: FormBuilder,
    private valoresDaInfracaoService: ValoresDeInfracaoService,
    private naturezaDaInfracaoService: NaturezaDaInfracaoService,
    private moedaService: MoedaService,
    private location: Location,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modal: NgbModal,
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = "";

    try {
      this.tiposDeMoeda = await this.moedaService.index().pipe(first()).toPromise();
      this.naturezas = await this.naturezaDaInfracaoService.index().pipe(first()).toPromise();

      const idSelected: string = this.route.snapshot.paramMap.get('id');

      ///////FORM
      this.form = this.formBuilder.group({
        descricao: new FormControl('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
        }),
        modalidade_transporte: new FormControl('', {
          validators: [Validators.required],
        }),
        quantidade: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.numberPatern)],
        }),
        natureza_infracao_id: new FormControl('', {
          validators: [Validators.required],
        }),
        moeda_id: new FormControl('', {
          validators: [Validators.required],
        }),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.valoresDaInfracaoService.get(parseInt(idSelected)).toPromise();

        this.form.controls['descricao'].setValue(this.crudObj.descricao);
        this.form.controls['modalidade_transporte'].setValue(this.crudObj.modalidade_transporte);
        this.form.controls['quantidade'].setValue(this.crudObj.quantidade);
        this.form.controls['natureza_infracao_id'].setValue(this.crudObj.natureza_infracao_id);
        this.form.controls['moeda_id'].setValue(this.crudObj.moeda_id);
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

      if (this.crudObj) {
        await this.valoresDaInfracaoService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.valoresDaInfracaoService.create(formInput).toPromise();
      }
      this.toastr.success('Valor da Infrafração salvo!');
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
      await this.valoresDaInfracaoService.delete(this.crudObj.id).toPromise();
      this.modal.dismissAll()
      this.toastr.success('Excluido com Sucesso!');
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
