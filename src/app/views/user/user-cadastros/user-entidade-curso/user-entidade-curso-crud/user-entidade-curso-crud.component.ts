import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntidadeCurso } from 'src/app/models/entidade-curso';
import { EntidadeCursoService } from 'src/app/services/entidade-curso.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-entidade-curso-crud',
  templateUrl: './user-entidade-curso-crud.component.html',
  styleUrls: ['./user-entidade-curso-crud.component.css']
})
export class UserEntidadeCursoCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: EntidadeCurso;

  constructor(
    private formBuilder: FormBuilder,
    private entidadeCursoService: EntidadeCursoService,
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
      const idSelected: string = this.route.snapshot.paramMap.get('id');

      ///////FORM
      this.form = this.formBuilder.group({
        descricao: new FormControl('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
        }),
        base_legal: new FormControl('', {
          validators: [Validators.maxLength(40)],
        }),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.entidadeCursoService.get(parseInt(idSelected)).toPromise();

        this.form.controls['descricao'].setValue(this.crudObj.descricao);
        this.form.controls['base_legal'].setValue(this.crudObj.base_legal);
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
        await this.entidadeCursoService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.entidadeCursoService.create(formInput).toPromise();
      }
      this.toastr.success('Entidade salva!');
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
      await this.entidadeCursoService.delete(this.crudObj.id).toPromise();
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
