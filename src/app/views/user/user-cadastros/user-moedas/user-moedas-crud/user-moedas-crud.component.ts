import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Moeda } from 'src/app/models/moeda';
import { MoedaService } from 'src/app/services/moeda.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-moedas-crud',
  templateUrl: './user-moedas-crud.component.html',
  styleUrls: ['./user-moedas-crud.component.css']
})
export class UserMoedasCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: Moeda;

  constructor(
    private formBuilder: FormBuilder,
    private moedaService: MoedaService,
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
        nome: new FormControl('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
        }),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.moedaService.get(parseInt(idSelected)).toPromise();

        this.form.controls['nome'].setValue(this.crudObj.nome);
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
        await this.moedaService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.moedaService.create(formInput).toPromise();
      }
      this.snackbarService.openSnackBarSucess('Tipo de Moeda salvo!');
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
      await this.moedaService.delete(this.crudObj.id).toPromise();
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
