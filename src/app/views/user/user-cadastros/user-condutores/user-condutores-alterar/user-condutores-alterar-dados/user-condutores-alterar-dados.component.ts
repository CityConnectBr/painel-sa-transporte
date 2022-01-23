import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Condutor } from 'src/app/models/condutores';
import { Endereco } from 'src/app/models/endereco';
import { Municipio } from 'src/app/models/municipio';
import { Permissionario } from 'src/app/models/permissionario';
import { CondutorService } from 'src/app/services/condutor.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-condutores-alterar-dados',
  templateUrl: './user-condutores-alterar-dados.component.html',
  styleUrls: ['./user-condutores-alterar-dados.component.css']
})
export class UserCondutoresAlterarDadosComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  condutor: Condutor;
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

  photoToUpload: File | null = null;
  photo: any | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private municipioService: MunicipioService,
    private permissionarioService: PermissionarioService,
    private condutorService: CondutorService,
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
      this.condutor = await this.condutorService.get(idSelected).pipe(first()).toPromise();
      this.permissionarioDoCondutor = await this.permissionarioService.get(this.condutor.permissionario_id).pipe(first()).toPromise();
      this.enderecoDoCondutor = await this.enderecoService.get(this.condutor.endereco_id).pipe(first()).toPromise();
      if (this.enderecoDoCondutor?.municipio_id)
        this.municipioSelecionado = await this.municipioService.get(this.enderecoDoCondutor.municipio_id).pipe(first()).toPromise();

      if (this.permissionarioDoCondutor)
        this.permissionarioSelecionado = await this.permissionarioService.get(this.permissionarioDoCondutor.id).pipe(first()).toPromise();

      await this.refreshPhoto(this.condutor);

      //convertendo de 1|0 para boolean
      this.condutor = SharedModule.convertAllFields01ToBoolean(this.condutor);

      //formatando datas
      this.condutor = SharedModule.formatAllFieldsDateToddMMyyyy(this.condutor);

      ///////FORM
      this.form = this.formBuilder.group({
        numero_de_cadastro_antigo: new FormControl('',),
        nome: new FormControl(this.condutor.nome ?? "", {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
        }),
        cpf: new FormControl(this.condutor.cpf ?? "", {
          validators: [Validators.required, Validators.pattern(SharedModule.CPFPatern)],
        }),
        rg: new FormControl(this.condutor.rg ?? "", {
          validators: [Validators.required, Validators.maxLength(9)],
        }),
        telefone: new FormControl(this.condutor.telefone ?? "", {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        celular: new FormControl(this.condutor.celular ?? "", {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        email: new FormControl(this.condutor.email ?? "", {
          validators: [Validators.pattern(SharedModule.emailPatern), Validators.maxLength(15)],
        }),
        cep: new FormControl(this.enderecoDoCondutor?.cep ?? "", {
          validators: [Validators.required, Validators.pattern(SharedModule.cepPattern)],
        }),
        endereco: new FormControl(this.enderecoDoCondutor?.endereco ?? "", {
          validators: [Validators.required],
        }),
        numero: new FormControl(this.enderecoDoCondutor?.numero ?? "", {
          validators: [Validators.required],
        }),
        complemento: new FormControl(this.enderecoDoCondutor?.complemento ?? "", {
          validators: [],
        }),
        bairro: new FormControl(this.enderecoDoCondutor?.bairro ?? "", {
          validators: [Validators.required],
        }),
        municipio: new FormControl(this.municipioSelecionado?.nome ?? "", {
          validators: [Validators.required],
        }),
        uf: new FormControl(this.enderecoDoCondutor?.uf ?? "", {
          validators: [Validators.required],
        }),
        cnh: new FormControl(this.condutor.cnh ?? "", {
          validators: [Validators.required, Validators.maxLength(15)],
        }),
        categoria_cnh: new FormControl(this.condutor.categoria_cnh ?? "", {
          validators: [Validators.required, Validators.maxLength(2)],
        }),
        vencimento_cnh: new FormControl(this.condutor.vencimento_cnh ?? "", {
          validators: [Validators.required, Validators.pattern(SharedModule.datePattern)],
        }),
        atestado_de_saude: new FormControl(this.condutor.atestado_de_saude ?? ""),
        certidao_negativa: new FormControl(this.condutor.certidao_negativa ?? ""),
        validade_certidao_negativa: new FormControl(this.condutor.validade_certidao_negativa ?? "", {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        registro_ctps: new FormControl(this.condutor.registro_ctps ?? ""),
        primeiros_socorros: new FormControl(this.condutor.primeiros_socorros ?? ""),
        emissao_primeiros_socorros: new FormControl(this.condutor.emissao_primeiros_socorros ?? "", {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        motivo_afastamento: new FormControl(this.condutor.rg ?? "", {
          validators: [Validators.maxLength(40)],
        }),
        data_inicio_afastamento: new FormControl(this.condutor.data_inicio_afastamento ?? "", {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        data_termino_afastamento: new FormControl(this.condutor.data_termino_afastamento ?? "", {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        permissionario: new FormControl(this.permissionarioSelecionado?.nome_razao_social ?? "",),
      })

      //setando por problema na mascara quando salva
      if (this.enderecoDoCondutor) {
        this.form.controls['cep'].setValue(this.enderecoDoCondutor?.cep ?? "");
      }

    } catch (e: any) {
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

      await this.enderecoService.update(this.condutor.endereco_id, endereco).toPromise();
      await this.condutorService.update(this.condutor.id, formInput).toPromise();
      this.snackbarService.openSnackBarSucess('Condutor salvo!');
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
      await this.condutorService.updatePhoto(this.condutor.id, this.photoToUpload).toPromise();
      this.snackbarService.openSnackBarSucess('Foto salva!');
      this.closeModal("");
      await this.refreshPhoto(this.condutor);
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  private async refreshPhoto(condutor: Condutor) {
    this.photo = null;
    if (this.condutor.foto) {
      const blob = await this.condutorService.getPhoto(this.condutor.id).pipe(first()).toPromise();
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
