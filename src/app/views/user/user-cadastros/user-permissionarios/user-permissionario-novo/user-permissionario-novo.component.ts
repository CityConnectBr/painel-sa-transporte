import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Municipio } from 'src/app/models/municipio';
import { EnderecoService } from 'src/app/services/endereco.service';
import { MunicipioService } from 'src/app/services/municipio.service';
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

  subjectMunicipio: Subject<any> = new Subject();

  ufs = SharedModule.UFs;

  estadosCivil: Map<string, string> = SharedModule.estadosCivil;

  municipiosPesquisados: string[] = [];
  municipioSelecionado: Municipio;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private municipioService: MunicipioService,
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

      //pesquisa municipio
      this.subjectMunicipio
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.searchMunicipios();
        }
        );

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
        cep: new FormControl('27113-090', {
          validators: [Validators.required, Validators.pattern(SharedModule.cepPattern)],
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
      if (!this.municipioSelecionado) {
        this.snackbarService.openSnackBarError("Nenhum Município selecionado!");
        this.loading = false;
        return;
      }

      let endereco = {
        id: null,
        cep: formInput.cep,
        endereco: formInput.endereco,
        numero: formInput.numero,
        complemento: formInput.cep,
        uf: formInput.uf,
        bairro: formInput.bairro,
        municipio_id: this.municipioSelecionado.id,
      };

      endereco = await this.enderecoService.create(endereco).toPromise();

      formInput.endereco_id = endereco.id;

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

  //função da mascara do telefone
  public telefonemask = function telefonemask(rawValue) {
    var numbers = rawValue.match(/\d/g);
    var numberLength = 0;
    if (numbers) {
      numberLength = numbers.join('').length;
    }
    if (numberLength <= 10) {
      return SharedModule.mascTEL8Dattern
    } else {
      return SharedModule.mascTEL9Dattern
    }
  }

  public async searchMunicipios() {
    try {
      this.municipioSelecionado = null;
      const result = await this.municipioService
        .searchByUF(this.form.controls['uf'].value, this.form.controls['municipio'].value)
        .pipe(first())
        .toPromise();

      this.municipiosPesquisados = result.data;
    } catch (e: any) {
      this.snackbarService.openSnackBarError("Ocorreu um erro ao pesquisar.");
    }
  }

  public keyUpMunicipio() {
    this.subjectMunicipio.next();
  }

  public setMunicipio(event) {
    if (event) {
      this.municipioSelecionado = event;
      this.form.controls['municipio'].setValue(this.municipioSelecionado.nome);
    }
  }

  public setFocusMunicipioInput(focus: boolean) {
    if (focus) {
      this.searchMunicipios();
    }
  }

}
