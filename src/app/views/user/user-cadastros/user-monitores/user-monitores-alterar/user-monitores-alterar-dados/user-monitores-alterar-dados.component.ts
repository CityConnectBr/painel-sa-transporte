import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Endereco } from 'src/app/models/endereco';
import { Monitor } from 'src/app/models/monitor';
import { Municipio } from 'src/app/models/municipio';
import { Permissionario } from 'src/app/models/permissionario';
import { EnderecoService } from 'src/app/services/endereco.service';
import { MonitorService } from 'src/app/services/monitor.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-monitores-alterar-dados',
  templateUrl: './user-monitores-alterar-dados.component.html',
  styleUrls: ['./user-monitores-alterar-dados.component.css']
})
export class UserMonitoresAlterarDadosComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  monitor: Monitor;
  enderecoDoCondutor: Endereco;
  permissionarioDoCondutor: Permissionario;

  subjectMunicipio: Subject<any> = new Subject();
  subjectPermissionario: Subject<any> = new Subject();

  permissionariosPesquisados: Map<String, String> = new Map();
  permissionarioSelecionado: Permissionario;

  ufs = SharedModule.UFs;

  municipiosPesquisados: Map<String, String> = new Map();
  municipioSelecionado: Municipio;

  maskCEP = SharedModule.textMaskCEPPattern;
  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private municipioService: MunicipioService,
    private permissionarioService: PermissionarioService,
    private monitorService: MonitorService,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
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

      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.monitor = await this.monitorService.get(idSelected).pipe(first()).toPromise();
      this.enderecoDoCondutor = await this.enderecoService.get(this.monitor.endereco_id).pipe(first()).toPromise();
      this.permissionarioDoCondutor = await this.permissionarioService.get(this.monitor.permissionario_id).pipe(first()).toPromise();
      this.municipioSelecionado = await this.municipioService.get(this.enderecoDoCondutor.municipio_id).pipe(first()).toPromise();
      this.permissionarioSelecionado = await this.permissionarioService.get(this.permissionarioDoCondutor.id).pipe(first()).toPromise();

      //convertendo de 1|0 para boolean
      this.monitor = SharedModule.convertAllFields01ToBoolean(this.monitor);

      //formatando datas
      this.monitor = SharedModule.formatAllFieldsDateToddMMyyyy(this.monitor);


      ///////FORM
      this.form = this.formBuilder.group({
        numero_de_cadastro_antigo: new FormControl('',),
        nome: new FormControl(this.monitor.nome??"", {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
        }),
        cpf: new FormControl(this.monitor.cpf??"", {
          validators: [Validators.required, Validators.pattern(SharedModule.CPFPatern)],
        }),
        rg: new FormControl(this.monitor.rg??"", {
          validators: [Validators.required, Validators.maxLength(9)],
        }),
        telefone: new FormControl(this.monitor.telefone??"", {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        celular: new FormControl(this.monitor.celular??"", {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        email: new FormControl(this.monitor.email??"", {
          validators: [Validators.pattern(SharedModule.emailPatern), Validators.maxLength(15)],
        }),
        data_nascimento: new FormControl(this.monitor.data_nascimento??"", {
          validators: [Validators.required, Validators.pattern(SharedModule.datePattern)],
        }),
        cep: new FormControl(this.enderecoDoCondutor.cep??"", {
          validators: [Validators.required, Validators.pattern(SharedModule.cepPattern)],
        }),
        endereco: new FormControl(this.enderecoDoCondutor.endereco??"", {
          validators: [Validators.required],
        }),
        numero: new FormControl(this.enderecoDoCondutor.numero??"", {
          validators: [Validators.required],
        }),
        complemento: new FormControl(this.enderecoDoCondutor.complemento??"", {
          validators: [],
        }),
        bairro: new FormControl(this.enderecoDoCondutor.bairro??"", {
          validators: [Validators.required],
        }),
        municipio: new FormControl(this.municipioSelecionado.nome, {
          validators: [Validators.required],
        }),
        uf: new FormControl(this.enderecoDoCondutor.uf??"", {
          validators: [Validators.required],
        }),
        certidao_negativa: new FormControl(),
        validade_da_certidao_negativa: new FormControl(this.monitor.validade_da_certidao_negativa??"", {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        curso_de_primeiro_socorros: new FormControl(),
        emissao_curso_de_primeiro_socorros: new FormControl(this.monitor.emissao_curso_de_primeiro_socorros??"", {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        permissionario: new FormControl(this.permissionarioSelecionado.nome_razao_social,),
      })

    } catch (e: any) {
      console.log(e);
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

      let endereco = {
        cep: formInput.cep,
        endereco: formInput.endereco,
        numero: formInput.numero,
        complemento: formInput.cep,
        uf: formInput.uf,
        bairro: formInput.bairro,
        municipio_id: this.municipioSelecionado.id,
      };

     formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);
     formInput = SharedModule.convertAllFieldsTrueFalseToBoolean(formInput);

     formInput.permissionario_id = this.permissionarioSelecionado.id;

      await this.enderecoService.update(this.monitor.id, endereco).toPromise();
      await this.monitorService.update(this.monitor.id, formInput).toPromise();
      this.snackbarService.openSnackBarSucess('Monitor salvo!');
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
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
