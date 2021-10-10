import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { EmpresaVistoriadora } from 'src/app/models/empresa-vistoriadora';
import { Endereco } from 'src/app/models/endereco';
import { Municipio } from 'src/app/models/municipio';
import { EmpresaVistoriadoraService } from 'src/app/services/empresa_vistoriadora.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-empresas-vistoriadoras-crud',
  templateUrl: './user-empresas-vistoriadoras-crud.component.html',
  styleUrls: ['./user-empresas-vistoriadoras-crud.component.css']
})
export class UserEmpresasVistoriadorasCrudComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: EmpresaVistoriadora;
  enderecoDaEmpresa: Endereco;

  subjectMunicipio: Subject<any> = new Subject();

  ufs = SharedModule.UFs;

  municipiosPesquisados: Map<String, String> = new Map();
  municipioSelecionado: Municipio;

  maskDate = SharedModule.textMaskDate;
  maskCEP = SharedModule.textMaskCEPPattern;

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaVistoriadoraService,
    private enderecoService: EnderecoService,
    private municipioService: MunicipioService,
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

      const idSelected: string = this.route.snapshot.paramMap.get('id');

      ///////FORM
      this.form = this.formBuilder.group({
        nome: new FormControl('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
        }),
        tipo: new FormControl('', {
          validators: [Validators.required],
        }),
        telefone: new FormControl('', {
          validators: [Validators.maxLength(11)],
        }),
        email: new FormControl('', {
          validators: [Validators.maxLength(200)],
        }),
        cnpj: new FormControl('', {
          validators: [Validators.required],
        }),
        inscricao_estadual: new FormControl('', {
          validators: [Validators.maxLength(20)],
        }),
        inscricao_municipal: new FormControl('', {
          validators: [Validators.maxLength(9)],
        }),
        nome_diretor: new FormControl('', {
          validators: [Validators.maxLength(40)],
        }),
        nome_delegado: new FormControl('', {
          validators: [Validators.maxLength(40)],
        }),
        total_vistorias_dia: new FormControl('', {
          validators: [Validators.pattern(SharedModule.numberPatern)],
        }),
        cep: new FormControl("", {
          validators: [Validators.required, Validators.pattern(SharedModule.cepPattern)],
        }),
        endereco: new FormControl("", {
          validators: [Validators.required],
        }),
        numero: new FormControl("", {
          validators: [Validators.required],
        }),
        complemento: new FormControl("", {
          validators: [],
        }),
        bairro: new FormControl("", {
          validators: [Validators.required],
        }),
        municipio: new FormControl("",),
        uf: new FormControl("", {
          validators: [Validators.required],
        }),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.empresaService.get(parseInt(idSelected)).toPromise();
        this.enderecoDaEmpresa = await this.enderecoService.get(this.crudObj.endereco_id).pipe(first()).toPromise();
        this.municipioSelecionado = await this.municipioService.get(this.enderecoDaEmpresa.municipio_id).pipe(first()).toPromise();
        this.setMunicipio(this.municipioSelecionado.id);

        this.form.controls['nome'].setValue(this.crudObj.nome);
        this.form.controls['tipo'].setValue(this.crudObj.tipo);
        this.form.controls['telefone'].setValue(this.crudObj.telefone);
        this.form.controls['email'].setValue(this.crudObj.email);
        this.form.controls['cnpj'].setValue(this.crudObj.cnpj);
        this.form.controls['inscricao_estadual'].setValue(this.crudObj.inscricao_estadual);
        this.form.controls['inscricao_municipal'].setValue(this.crudObj.inscricao_municipal);
        this.form.controls['nome_diretor'].setValue(this.crudObj.nome_diretor);
        this.form.controls['nome_delegado'].setValue(this.crudObj.nome_delegado);
        this.form.controls['total_vistorias_dia'].setValue(this.crudObj.total_vistorias_dia);
        this.form.controls['cep'].setValue(this.enderecoDaEmpresa.cep);
        this.form.controls['bairro'].setValue(this.enderecoDaEmpresa.bairro);
        this.form.controls['complemento'].setValue(this.enderecoDaEmpresa.complemento);
        this.form.controls['endereco'].setValue(this.enderecoDaEmpresa.endereco);
        this.form.controls['numero'].setValue(this.enderecoDaEmpresa.numero);
        this.form.controls['uf'].setValue(this.enderecoDaEmpresa.uf);
      }

    } catch (e: any) {
      console.log(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  ngOnDestroy() {
    this.subjectMunicipio.unsubscribe();
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

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {

      let endereco = {
        cep: formInput.cep,
        endereco: formInput.endereco,
        numero: formInput.numero,
        complemento: formInput.cep,
        uf: formInput.uf,
        bairro: formInput.bairro,
        municipio_id: this.municipioSelecionado.id,
      };

      //convertendoDataNasc
      if (formInput.data_nomeacao_diretor && formInput.data_nomeacao_diretor != '') {
        formInput.data_nomeacao_diretor = SharedModule.convertStringddMMyyyyToyyyyMMdd(formInput.data_nomeacao_diretor);
      }

      if (this.crudObj) {
        await this.enderecoService.update(this.enderecoDaEmpresa.id, endereco).toPromise();

        formInput.endereco_id = this.enderecoDaEmpresa.id;
        await this.empresaService.update(this.crudObj.id, formInput).toPromise();
      } else {
        const { id } = await this.enderecoService.create(endereco).toPromise();

        formInput.endereco_id = id;
        await this.empresaService.create(formInput).toPromise();
      }
      this.snackbarService.openSnackBarSucess('Empresa salva!');
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
      await this.empresaService.delete(this.crudObj.id).toPromise();
      await this.enderecoService.delete(this.crudObj.endereco_id).toPromise();
      this.modal.dismissAll()
      this.snackbarService.openSnackBarSucess('Excluido com Sucesso!');
      this.location.back()
    } catch (e: any) {
      this.modal.dismissAll()
      this.errorMessage = "Este não pode ser excluido!";
    }
    this.loading = false;
  }

  public async searchMunicipios() {
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

  public keyUpMunicipio() {
    this.subjectMunicipio.next();
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
