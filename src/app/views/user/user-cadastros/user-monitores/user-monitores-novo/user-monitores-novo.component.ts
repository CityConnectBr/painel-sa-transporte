import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Municipio } from 'src/app/models/municipio';
import { Permissionario } from 'src/app/models/permissionario';
import { EnderecoService } from 'src/app/services/endereco.service';
import { MonitorService } from 'src/app/services/monitor.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-monitores-novo',
  templateUrl: './user-monitores-novo.component.html',
  styleUrls: ['./user-monitores-novo.component.css']
})
export class UserMonitoresNovoComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  subjectMunicipio: Subject<any> = new Subject();
  subjectPermissionario: Subject<any> = new Subject();

  ufs = SharedModule.UFs;

  municipiosPesquisados: Map<String, String> = new Map();
  municipioSelecionado: Municipio;

  permissionariosPesquisados: Map<String, String> = new Map();
  permissionarioSelecionado: Permissionario;

  @ViewChild('municipioInput') municipioInputElement: ElementRef;
  @ViewChild('permissionarioInput') permissionarioInputElement: ElementRef;

  maskCEP = SharedModule.textMaskCEPPattern;
  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private municipioService: MunicipioService,
    private permissionarioService: PermissionarioService,
    private monitorService: MonitorService,
    private router: Router,
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

      this.subjectPermissionario
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.searchPermissionarios();
        }
        );

      ///////FORM
      this.form = this.formBuilder.group({
        numero_de_cadastro_antigo: new FormControl('',),
        nome: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
        }),
        cpf: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.CPFPatern)],
        }),
        rg: new FormControl('', {
          validators: [Validators.required, Validators.maxLength(9)],
        }),
        telefone: new FormControl('', {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        celular: new FormControl('', {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        email: new FormControl('', {
          validators: [Validators.pattern(SharedModule.emailPatern), Validators.maxLength(15)],
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
          validators: [Validators.required],
        }),
        uf: new FormControl('', {
          validators: [Validators.required],
        }),
        data_nascimento: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.datePattern)],
        }),
        certidao_negativa: new FormControl(),
        validade_da_certidao_negativa: new FormControl('', {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        curso_de_primeiro_socorros: new FormControl(),
        emissao_curso_de_primeiro_socorros: new FormControl('', {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        permissionario: new FormControl('',),
      })

    } catch (e: any) {
      console.error(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  ngOnDestroy() {
    this.subjectMunicipio.unsubscribe();
    this.subjectPermissionario.unsubscribe();
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
      if (!this.permissionarioSelecionado) {
        this.snackbarService.openSnackBarError("Nenhum Permissionário selecionado!");
        this.loading = false;
        return;
      }

      let endereco = {
        id: null,
        cep: formInput.cep,
        endereco: formInput.endereco,
        numero: formInput.numero,
        complemento: formInput.complemento,
        uf: formInput.uf,
        bairro: formInput.bairro,
        municipio_id: this.municipioSelecionado.id,
      };

      endereco = await this.enderecoService.create(endereco).toPromise();

      formInput.endereco_id = endereco.id;
      formInput.permissionario_id = this.permissionarioSelecionado.id;

      //convertendoDataNasc
      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);
      formInput = SharedModule.convertAllFieldsTrueFalseToBoolean(formInput);

      const monitor = await this.monitorService.create(formInput).toPromise();
      this.snackbarService.openSnackBarSucess('Monitor salvo!');
      this.router.navigate(['../alterar/' + monitor.id + '/dados'], {relativeTo:this.route});
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
      return SharedModule.textMaskPhone8Dattern
    } else {
      return SharedModule.textMaskPhone9Dattern
    }
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

  public async searchPermissionarios() {
    try {
      this.permissionarioSelecionado = null;
      const result = await this.permissionarioService
        .search(this.form.controls['permissionario'].value)
        .pipe(first())
        .toPromise();

      this.permissionariosPesquisados.clear();
      result.data.forEach((permissionario: Permissionario) => {
        this.permissionariosPesquisados.set(`${permissionario.id}`, permissionario.nome_razao_social);
      });

    } catch (e: any) {
      this.snackbarService.openSnackBarError("Ocorreu um erro ao pesquisar.");
    }
  }

  public keyUpPermissionario() {
    this.subjectPermissionario.next();
  }

  public async setPermissionario(event) {
    try {
      if (event) {
        this.form.controls['permissionario'].setValue("Carregando...");
        this.permissionarioSelecionado = await this.permissionarioService.get(event).pipe(first()).toPromise();
        this.form.controls['permissionario'].setValue(this.permissionarioSelecionado.nome_razao_social);
      }
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
  }

  public setFocusPermissionarioInput(focus: boolean) {
    if (focus) {
      this.searchPermissionarios();
    }
  }

}
