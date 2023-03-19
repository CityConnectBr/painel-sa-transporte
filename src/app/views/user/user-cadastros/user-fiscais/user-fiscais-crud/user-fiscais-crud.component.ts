import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Endereco } from 'src/app/models/endereco';
import { Fiscal } from 'src/app/models/fiscal';
import { Municipio } from 'src/app/models/municipio';
import { EnderecoService } from 'src/app/services/endereco.service';
import { FiscalService } from 'src/app/services/fiscal.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-fiscais-crud',
  templateUrl: './user-fiscais-crud.component.html',
  styleUrls: ['./user-fiscais-crud.component.css']
})
export class UserFiscaisCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: Fiscal;
  enderecoDoPermissionario: Endereco;

  ufs = SharedModule.UFs;

  subjectMunicipio: Subject<any> = new Subject();

  municipiosPesquisados: Map<String, String> = new Map();
  municipioSelecionado: Municipio;

  maskCEP = SharedModule.textMaskCEPPattern;

  photoToUpload: File | null = null;
  photo: any | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private fiscalService: FiscalService,
    private enderecoService: EnderecoService,
    private municipioService: MunicipioService,
    private location: Location,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
    private modal: NgbModal,
    private sanitizer: DomSanitizer
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

      const idSelected: string = this.route.snapshot.paramMap.get('id');

      ///////FORM
      this.form = this.formBuilder.group({
        nome: new FormControl('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
        }),
        cpf: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.CPFPatern)],
        }),
        telefone: new FormControl('', {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        email: new FormControl('', {
          validators: [Validators.pattern(SharedModule.emailPatern), Validators.maxLength(15)],
        }),
        cargo: new FormControl('', {
          validators: [Validators.maxLength(40)],
        }),
        unidade_trabalho: new FormControl('', {
          validators: [Validators.maxLength(40)],
        }),
        cep: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.cepPattern)],
        }),
        endereco: new FormControl('', {
          validators: [Validators.required],
        }),
        numero: new FormControl('', {
          validators: [Validators.required],
        }),
        complemento: new FormControl('', {
          validators: [],
        }),
        bairro: new FormControl('', {
          validators: [Validators.required],
        }),
        municipio: new FormControl('', {
          validators: [],
        }),
        uf: new FormControl('', {
          validators: [Validators.required],
        }),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.fiscalService.get(parseInt(idSelected)).toPromise();
        this.enderecoDoPermissionario = await this.enderecoService.get(this.crudObj.endereco_id).pipe(first()).toPromise();
        if (this.enderecoDoPermissionario.municipio_id) {
          this.municipioSelecionado = await this.municipioService.get(this.enderecoDoPermissionario.municipio_id).pipe(first()).toPromise();
        }
        await this.refreshPhoto(this.crudObj);

        this.form.controls['nome'].setValue(this.crudObj.nome);
        this.form.controls['cpf'].setValue(this.crudObj.cpf);
        this.form.controls['telefone'].setValue(this.crudObj.telefone);
        this.form.controls['email'].setValue(this.crudObj.email);
        this.form.controls['cargo'].setValue(this.crudObj.cargo);
        this.form.controls['unidade_trabalho'].setValue(this.crudObj.unidade_trabalho);
        this.form.controls['cep'].setValue(this.enderecoDoPermissionario?.cep ?? "");
        this.form.controls['endereco'].setValue(this.enderecoDoPermissionario?.endereco ?? "");
        this.form.controls['numero'].setValue(this.enderecoDoPermissionario?.numero ?? "");
        this.form.controls['complemento'].setValue(this.enderecoDoPermissionario?.complemento ?? "");
        this.form.controls['bairro'].setValue(this.enderecoDoPermissionario?.bairro ?? "");
        this.form.controls['municipio'].setValue(this.municipioSelecionado?.nome ?? "");
        this.form.controls['uf'].setValue(this.enderecoDoPermissionario?.uf ?? "");

        //forçando verificação de erros
        SharedModule.setAllFieldsFromFormAsTouched(this.form);
      }

    } catch (e: any) {
      console.error(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  ngOnDestroy() {
    this.subjectMunicipio.unsubscribe();
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      if(!this.form.valid){
        this.snackbarService.openSnackBarError("Existem campos inválidos!");
        this.loading = false;
        return;
      }

      let endereco: Endereco = {
        cep: SharedModule.formatCEP(formInput.cep),
        endereco: formInput.endereco,
        numero: formInput.numero,
        complemento: formInput.complemento,
        uf: formInput.uf,
        bairro: formInput.bairro,
        municipio_id: this.municipioSelecionado.id,
      };

      formInput = SharedModule.clearAllTlefonePattern(formInput);

      if (this.crudObj) {
        await this.enderecoService.update(this.enderecoDoPermissionario.id, endereco).toPromise();
        await this.fiscalService.update(this.crudObj.id, formInput).toPromise();
      } else {
        endereco = await this.enderecoService.create(endereco).toPromise();

        formInput.endereco_id = endereco.id;
        this.crudObj = await this.fiscalService.create(formInput).toPromise();
      }

      await this.salvarFoto();

      this.snackbarService.openSnackBarSucess('Fiscal salvo!');
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
      await this.fiscalService.delete(this.crudObj.id).toPromise();
      this.modal.dismissAll()
      this.snackbarService.openSnackBarSucess('Excluido com Sucesso!');
      this.location.back()
    } catch (e: any) {
      this.modal.dismissAll()
      this.errorMessage = "Este não pode ser excluido!";
    }
    this.loading = false;
  } public async searchMunicipios() {
    try {
      this.municipioSelecionado = null;
      const result = await this.municipioService
        .searchByUF(this.form.controls['uf'].value, this.form.controls['municipio'].value)
        .pipe(first())
        .toPromise();

      this.municipiosPesquisados.clear();
      result.data.forEach((municipio: Municipio) => {
        this.municipiosPesquisados.set(`${municipio.id}`, municipio.nome);
      });

    } catch (e: any) {
      this.snackbarService.openSnackBarError("Ocorreu um erro ao pesquisar.");
    }
  }

  handleFileInput(event: any){
    const file = event.target.files[0];
  }

  clearPhoto() {
    this.photoToUpload = null;
    this.photo = null;
  }

  async salvarFoto() {
    this.loading = true;
    this.errorMessage = "";
    try {
      if (!this.photoToUpload) {
        this.snackbarService.openSnackBarError("Nenhuma foto foi selecionada");
      }
      await this.fiscalService.updatePhoto(this.crudObj.id, this.photoToUpload).toPromise();
      this.snackbarService.openSnackBarSucess('Foto salva!');
      this.closeModal("");
      await this.refreshPhoto(this.crudObj);
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  private async refreshPhoto(crudObj: Fiscal) {
    this.photo = null;
    if (this.crudObj.foto) {
      const blob = await this.fiscalService.getPhoto(this.crudObj.id).pipe(first()).toPromise();
      this.photo = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    }
  }

  //função da mascara do telefone
  public telefonemask = function telefonemask(rawValue) {
    var numbers = rawValue.match(/\d/g);
    var numberLength = 0;
    if (numbers) {
      numberLength = numbers.join('').length;
    }
    if (numberLength <= 10) {
      return SharedModule.textMaskPhone8Dattern
    } else {
      return SharedModule.textMaskPhone9Dattern
    }
  }

  public keyUpMunicipio() {
    this.subjectMunicipio.next(null);
  }

  public async setMunicipio(event) {
    try {
      if (event) {
        this.form.controls['municipio'].setValue("Carregando...");
        this.municipioSelecionado = await this.municipioService.get(event).pipe(first()).toPromise();
        this.form.controls['municipio'].setValue(this.municipioSelecionado.nome);
      }
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
  }

  public setFocusMunicipioInput(focus: boolean) {
    if (focus) {
      this.searchMunicipios();
    }
  }

  closeModal(event: any) {
    return this.modal.dismissAll()
  }

  openModal(content: any) {
    this.modal.open(content)
  }

}
