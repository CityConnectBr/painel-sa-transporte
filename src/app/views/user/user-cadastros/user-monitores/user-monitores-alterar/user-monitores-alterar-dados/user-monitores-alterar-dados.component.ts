import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  enderecoDoMonitor: Endereco;
  permissionarioDoMonitor: Permissionario;

  subjectMunicipio: Subject<any> = new Subject();
  subjectPermissionario: Subject<any> = new Subject();

  permissionariosPesquisados: Map<String, String> = new Map();
  permissionarioSelecionado: Permissionario;

  ufs = SharedModule.UFs;

  municipiosPesquisados: Map<String, String> = new Map();
  municipioSelecionado: Municipio;

  maskCEP = SharedModule.textMaskCEPPattern;
  maskDate = SharedModule.textMaskDate;

  photoToUpload: File | null = null;
  photo: any | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private municipioService: MunicipioService,
    private permissionarioService: PermissionarioService,
    private monitorService: MonitorService,
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

      this.subjectPermissionario
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.searchPermissionarios();
        }
        );

      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.monitor = await this.monitorService.get(idSelected).pipe(first()).toPromise();
      this.permissionarioDoMonitor = await this.permissionarioService.get(this.monitor.permissionario_id).pipe(first()).toPromise();

      this.enderecoDoMonitor = await this.enderecoService.get(this.monitor.endereco_id).pipe(first()).toPromise();
      if (this.enderecoDoMonitor.municipio_id)
        this.municipioSelecionado = await this.municipioService.get(this.enderecoDoMonitor.municipio_id).pipe(first()).toPromise();

      this.permissionarioSelecionado = await this.permissionarioService.get(this.enderecoDoMonitor.id).pipe(first()).toPromise();

      await this.refreshPhoto(this.monitor);

      //convertendo de 1|0 para boolean
      this.monitor = SharedModule.convertAllFields01ToBoolean(this.monitor);

      //formatando datas
      this.monitor = SharedModule.formatAllFieldsDateToddMMyyyy(this.monitor);

      ///////FORM
      this.form = this.formBuilder.group({
        numero_de_cadastro_antigo: new FormControl('',),
        nome: new FormControl(this.monitor.nome ?? "", {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
        }),
        cpf: new FormControl(this.monitor.cpf ?? "", {
          validators: [Validators.required, Validators.pattern(SharedModule.CPFPatern)],
        }),
        rg: new FormControl(this.monitor.rg ?? "", {
          validators: [Validators.required, Validators.maxLength(9)],
        }),
        telefone: new FormControl(this.monitor.telefone ?? "", {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        celular: new FormControl(this.monitor.celular ?? "", {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        email: new FormControl(this.monitor.email ?? "", {
          validators: [Validators.pattern(SharedModule.emailPatern), Validators.maxLength(15)],
        }),
        data_nascimento: new FormControl(this.monitor.data_nascimento ?? "", {
          validators: [Validators.required, Validators.pattern(SharedModule.datePattern)],
        }),
        cep: new FormControl(this.enderecoDoMonitor?.cep ?? "", {
          validators: [Validators.required, Validators.pattern(SharedModule.cepPattern)],
        }),
        endereco: new FormControl(this.enderecoDoMonitor?.endereco ?? "", {
          validators: [Validators.required],
        }),
        numero: new FormControl(this.enderecoDoMonitor?.numero ?? "", {
          validators: [Validators.required],
        }),
        complemento: new FormControl(this.enderecoDoMonitor?.complemento ?? "", {
          validators: [],
        }),
        bairro: new FormControl(this.enderecoDoMonitor?.bairro ?? "", {
          validators: [Validators.required],
        }),
        municipio: new FormControl(this.municipioSelecionado?.nome, {
          validators: [Validators.required],
        }),
        uf: new FormControl(this.enderecoDoMonitor?.uf ?? "", {
          validators: [Validators.required],
        }),
        certidao_negativa: new FormControl(this.monitor.certidao_negativa ?? ""),
        validade_da_certidao_negativa: new FormControl(this.monitor.validade_da_certidao_negativa ?? "", {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        curso_de_primeiro_socorros: new FormControl(this.monitor.curso_de_primeiro_socorros ?? ""),
        emissao_curso_de_primeiro_socorros: new FormControl(this.monitor.emissao_curso_de_primeiro_socorros ?? "", {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        permissionario: new FormControl(this.permissionarioSelecionado.nome_razao_social,),
      });

      //setando por problema na mascara quando salva
      if(this.enderecoDoMonitor){
        this.form.controls['cep'].setValue(this.enderecoDoMonitor?.cep ?? "");
      }

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

      let endereco = {
        cep: SharedModule.formatCEP(formInput.cep),
        endereco: formInput.endereco,
        numero: formInput.numero,
        complemento: formInput.complemento,
        uf: formInput.uf,
        bairro: formInput.bairro,
        municipio_id: this.municipioSelecionado.id,
      };

      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);
      formInput = SharedModule.convertAllFieldsTrueFalseToBoolean(formInput);

      formInput.permissionario_id = this.permissionarioSelecionado.id;

      await this.enderecoService.update(this.monitor.endereco_id, endereco).toPromise();
      await this.monitorService.update(this.monitor.id, formInput).toPromise();
      this.snackbarService.openSnackBarSucess('Monitor salvo!');
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  handleFileInput(files: FileList) {
    if (files.length > 0) {
      this.photoToUpload = files.item(0);
    }
  }

  async salvarFoto() {
    this.loading = true;
    this.errorMessage = "";
    try {
      if (!this.photoToUpload) {
        this.snackbarService.openSnackBarError("Nenhuma foto foi selecionada");
      }
      await this.monitorService.updatePhoto(this.monitor.id, this.photoToUpload).toPromise();
      this.snackbarService.openSnackBarSucess('Foto salva!');
      this.closeModal("");
      await this.refreshPhoto(this.monitor);
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  private async refreshPhoto(monitor: Monitor) {
    this.photo = null;
    if (this.monitor.foto) {
      const blob = await this.monitorService.getPhoto(this.monitor.id).pipe(first()).toPromise();
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

  closeModal(event: any) {
    return this.modal.dismissAll()
  }

  openModal(content: any) {
    this.modal.open(content)
  }
}
