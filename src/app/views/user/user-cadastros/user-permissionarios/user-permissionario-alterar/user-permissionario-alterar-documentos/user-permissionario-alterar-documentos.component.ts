import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Modalidade } from 'src/app/models/modalidade';
import { Permissionario } from 'src/app/models/permissionario';
import { ModalidadeService } from 'src/app/services/modalidade.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-permissionario-alterar-documentos',
  templateUrl: './user-permissionario-alterar-documentos.component.html',
  styleUrls: ['./user-permissionario-alterar-documentos.component.css']
})
export class UserPermissionarioAlterarDocumentosComponent  implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  permissionario: Permissionario;

  modalidades: Modalidade[];

  constructor(
    private formBuilder: FormBuilder,
    private permissionarioService: PermissionarioService,
    private modalidadeService: ModalidadeService,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = "";
    try {
      ///////FORM
      this.form = this.formBuilder.group({
        atestado_de_saude: new FormControl('', {
          validators: [Validators.required],
        }),
        certidao_negativa_de_distribuicao_criminal: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
        }),
        comprovante_de_endereco: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        cmc: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        cursos: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        crlv: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        contrato_de_comodato: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        ipva: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        dpvat: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        relacao_dos_alunos_transportados: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        laudo_de_vistoria_comprovada: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        ciretran_vistoria: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        ciretran_autorizacao: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        certificado_de_pontuacao_de_cnh: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        selo_gnv: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        taximetro_tacografo: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        taximetro_tacografo_numero: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        validade_taximetri_tacografo: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        afericao_taximetri_tacografo: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        numero: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        emissao: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        validade2: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        inicio_atividades: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        termino_atividades: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        motivo: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        data_transferencia: new FormControl('', {
          validators: [],
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

      //this.snackbarService.openSnackBarSucess('Permissionário salvo!');
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

}
