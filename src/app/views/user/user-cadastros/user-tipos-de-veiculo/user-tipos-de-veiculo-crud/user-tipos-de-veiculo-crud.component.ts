import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { TipoDeVeiculo } from 'src/app/models/tipo-de-veiculo';
import { CorDoVeiculoService } from 'src/app/services/cor-do-veiculo.service';
import { TipoDeVeiculoService } from 'src/app/services/tipo-de-veiculo.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-tipos-de-veiculo-crud',
  templateUrl: './user-tipos-de-veiculo-crud.component.html',
  styleUrls: ['./user-tipos-de-veiculo-crud.component.css']
})
export class UserTiposDeVeiculoCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  modalidades = TipoDeVeiculoService.modalidades;

  crudObj: TipoDeVeiculo;

  constructor(
    private formBuilder: FormBuilder,
    private tipoDeVeiculoService: TipoDeVeiculoService,
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
      const idSelected: string = this.route.snapshot.paramMap.get('id');

      ///////FORM
      this.form = this.formBuilder.group({
        descricao: new FormControl('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
        }),
        modalidade_transporte: new FormControl('', {
          validators: [Validators.required],
        }),
        idade_limite_ingresso: new FormControl('',),
        idade_limite_permanencia: new FormControl(''),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.tipoDeVeiculoService.get(parseInt(idSelected)).toPromise();

        this.form.controls['descricao'].setValue(this.crudObj.descricao);
        this.form.controls['modalidade_transporte'].setValue(this.crudObj.modalidade_transporte);
        this.form.controls['idade_limite_ingresso'].setValue(this.crudObj.idade_limite_ingresso);
        this.form.controls['idade_limite_permanencia'].setValue(this.crudObj.idade_limite_permanencia);
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
        await this.tipoDeVeiculoService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.tipoDeVeiculoService.create(formInput).toPromise();
      }
      this.snackbarService.openSnackBarSucess('Tipo de Veículo salvo!');
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
      await this.tipoDeVeiculoService.delete(this.crudObj.id).toPromise();
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
