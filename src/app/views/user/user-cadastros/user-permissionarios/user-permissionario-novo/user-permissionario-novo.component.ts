import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Perfil } from 'src/app/models/perfil';
import { PerfilService } from 'src/app/services/perfil.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-permissionario-novo',
  templateUrl: './user-permissionario-novo.component.html',
  styleUrls: ['./user-permissionario-novo.component.css']
})
export class UserPermissionarioNovoComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: Perfil;

  constructor(
    private formBuilder: FormBuilder,
    private permissionarioService: PermissionarioService,
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
      ///////FORM
      this.form = this.formBuilder.group({
        numero_de_cadastro_antigo: new FormControl('',),
        tipo: new FormControl('F', {
          validators: [Validators.required],
        }),
        nome_razao_social: new FormControl('Teste', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
        }),
        cpf_cnpj: new FormControl('87273117080', {
          validators: [Validators.required, Validators.pattern(SharedModule.CPFCNPJPatern)],
        }),
        rg: new FormControl('', {
          validators: [Validators.maxLength(9)],
        }),
        data_nascimento: new FormControl('', {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        inscricao_municipal: new FormControl('1234', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
        }),
        alvara_de_funcionamento: new FormControl('2134', {
          validators: [Validators.required, Validators.maxLength(15)],
        }),
        reponsavel: new FormControl('', {
          validators: [Validators.maxLength(40)],
        }),
        procurador_responsavel: new FormControl('', {
          validators: [Validators.maxLength(40)],
        }),
        cep: new FormControl('321321', {
          validators: [Validators.required],
        }),
        endereco: new FormControl('Endereco', {
          validators: [Validators.required],
        }),
        numero: new FormControl('123', {
          validators: [Validators.required],
        }),
        complemento: new FormControl('', {
          validators: [],
        }),
        bairro: new FormControl('Bairro', {
          validators: [Validators.required],
        }),
        municipio: new FormControl('Municipio', {
          validators: [Validators.required],
        }),
        uf: new FormControl('RJ', {
          validators: [Validators.required],
        }),
        telefone: new FormControl('', {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        celular: new FormControl('', {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        telefone2: new FormControl('', {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        email: new FormControl('', {
          validators: [Validators.pattern(SharedModule.emailPatern), Validators.maxLength(15)],
        }),
        naturalidade: new FormControl('', {
          validators: [Validators.maxLength(15)],
        }),
        nacionalidade: new FormControl('', {
          validators: [Validators.maxLength(15)],
        }),
        cnh: new FormControl('', {
          validators: [Validators.maxLength(15)],
        }),
        categoria: new FormControl('', {
          validators: [Validators.maxLength(2)],
        }),
        cnh_validade: new FormControl('', {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        estado_civil: new FormControl('C', {
          validators: [Validators.required],
        }),
      })

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
      await this.permissionarioService.create(formInput).toPromise();
      this.snackbarService.openSnackBarSucess('Permissionário salvo!');
      this.location.back()
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
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
