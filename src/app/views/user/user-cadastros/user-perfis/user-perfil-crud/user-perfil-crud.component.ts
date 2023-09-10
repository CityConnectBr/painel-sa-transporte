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
        cadastro_usuario: new FormControl(false, {
          validators: [Validators.required],
        }),
        cadastro_perfil: new FormControl(false, {
          validators: [Validators.required],
        }),
        cadastro_principais: new FormControl(false, {
          validators: [Validators.required],
        }),
        cadastro_tabelas_base: new FormControl(false, {
          validators: [Validators.required],
        }),
        lancamentos: new FormControl(false, {
          validators: [Validators.required],
        }),
        impressos: new FormControl(false, {
          validators: [Validators.required],
        }),
        relatorios: new FormControl(false, {
          validators: [Validators.required],
        }),
      })

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.perfilService.get(parseInt(idSelected)).toPromise();
        this.form.controls['nome'].setValue(this.crudObj.nome);
        this.form.controls['cadastro_usuario'].setValue(this.crudObj.cadastro_usuario);
        this.form.controls['cadastro_perfil'].setValue(this.crudObj.cadastro_perfil);
        this.form.controls['cadastro_principais'].setValue(this.crudObj.cadastro_principais);
        this.form.controls['cadastro_tabelas_base'].setValue(this.crudObj.cadastro_tabelas_base);
        this.form.controls['lancamentos'].setValue(this.crudObj.lancamentos);
        this.form.controls['impressos'].setValue(this.crudObj.impressos);
        this.form.controls['relatorios'].setValue(this.crudObj.relatorios);
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
