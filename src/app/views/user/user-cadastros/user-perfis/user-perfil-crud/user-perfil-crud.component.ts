import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Perfil } from 'src/app/models/perfil';
import { PerfilService } from 'src/app/services/perfil.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-perfil-crud',
  templateUrl: './user-perfil-crud.component.html',
  styleUrls: ['./user-perfil-crud.component.css']
})
export class UserPerfilCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: Perfil;

  constructor(
    private formBuilder: FormBuilder,
    private perfilService: PerfilService,
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
        nome: new FormControl('', {
          validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
        }),
        incluir: new FormControl('0', {
          validators: [Validators.required],
        }),
        alterar: new FormControl('0', {
          validators: [Validators.required],
        }),
        excluir: new FormControl('0', {
          validators: [Validators.required],
        }),
        consultar: new FormControl('0', {
          validators: [Validators.required],
        }),
        imprimir: new FormControl('0', {
          validators: [Validators.required],
        }),
      })

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.perfilService.get(parseInt(idSelected)).toPromise();
        this.form.controls['nome'].setValue(this.crudObj.nome);
        this.form.controls['incluir'].setValue(this.crudObj.incluir);
        this.form.controls['alterar'].setValue(this.crudObj.alterar);
        this.form.controls['excluir'].setValue(this.crudObj.excluir);
        this.form.controls['consultar'].setValue(this.crudObj.consultar);
        this.form.controls['imprimir'].setValue(this.crudObj.imprimir);
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
        await this.perfilService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.perfilService.create(formInput).toPromise();
      }
      this.toastr.success('Perfil salvo!');
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
      await this.perfilService.delete(this.crudObj.id).toPromise();
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
