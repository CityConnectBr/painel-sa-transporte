import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';
import { Location } from '@angular/common';
import { Perfil } from 'src/app/models/perfil';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-usuario-crud',
  templateUrl: './user-usuario-crud.component.html',
  styleUrls: ['./user-usuario-crud.component.css']
})
export class UserUsuarioCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: Usuario;

  perfis: Perfil[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
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
          validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
        }),
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
        }),
        perfil_web_id: new FormControl('', {
          validators: [Validators.required],
        }),
        password: this.formBuilder.control('', idSelected ? [] : [Validators.required, Validators.pattern(SharedModule.passPatern)]),
      })

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.usuarioService.get(parseInt(idSelected)).toPromise();
        this.form.controls['nome'].setValue(this.crudObj.nome);
        this.form.controls['email'].setValue(this.crudObj.email);
        this.form.controls['perfil_web_id'].setValue(this.crudObj.perfil_web_id);
      }

      ///////OTHER LOADS
      this.perfis = await this.perfilService.index().toPromise();
    } catch (e: any) {
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }


  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      if (this.crudObj) {
        await this.usuarioService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.usuarioService.create(formInput).toPromise();
      }
      this.snackbarService.openSnackBarSucess('Usuário salvo!');
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
      await this.usuarioService.delete(this.crudObj.id).toPromise();
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
