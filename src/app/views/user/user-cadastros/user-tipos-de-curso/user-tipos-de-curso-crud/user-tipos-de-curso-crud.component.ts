import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { TipoDeCurso } from 'src/app/models/tipo-de-curso';
import { TipoDeCursoService } from 'src/app/services/tipo-de-curso.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-tipos-de-curso-crud',
  templateUrl: './user-tipos-de-curso-crud.component.html',
  styleUrls: ['./user-tipos-de-curso-crud.component.css']
})
export class UserTiposDeCursoCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: TipoDeCurso;

  constructor(
    private formBuilder: FormBuilder,
    private tipoDeCursoService: TipoDeCursoService,
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
        modalidade: new FormControl('', {
          validators: [Validators.required],
        }),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.tipoDeCursoService.get(parseInt(idSelected)).toPromise();

        this.form.controls['descricao'].setValue(this.crudObj.descricao);
        this.form.controls['modalidade'].setValue(this.crudObj.modalidade);
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
        await this.tipoDeCursoService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.tipoDeCursoService.create(formInput).toPromise();
      }
      this.snackbarService.openSnackBarSucess('Tipo de Curso salvo!');
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
      await this.tipoDeCursoService.delete(this.crudObj.id).toPromise();
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
