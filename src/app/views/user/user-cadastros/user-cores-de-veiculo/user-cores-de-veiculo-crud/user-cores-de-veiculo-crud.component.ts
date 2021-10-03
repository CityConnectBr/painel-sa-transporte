import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { CorDoVeiculo } from 'src/app/models/cor-do-veiculo';
import { CorDoVeiculoService } from 'src/app/services/cor-do-veiculo.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-cores-de-veiculo-crud',
  templateUrl: './user-cores-de-veiculo-crud.component.html',
  styleUrls: ['./user-cores-de-veiculo-crud.component.css']
})
export class UserCoresDeVeiculoCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: CorDoVeiculo;

  constructor(
    private formBuilder: FormBuilder,
    private corDoVeiculoService: CorDoVeiculoService,
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
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.corDoVeiculoService.get(parseInt(idSelected)).toPromise();

        this.form.controls['descricao'].setValue(this.crudObj.descricao);
      }

    } catch (e: any) {
      console.log(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {

      if (this.crudObj) {
        await this.corDoVeiculoService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.corDoVeiculoService.create(formInput).toPromise();
      }
      this.snackbarService.openSnackBarSucess('Cor salva!');
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
      await this.corDoVeiculoService.delete(this.crudObj.id).toPromise();
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
