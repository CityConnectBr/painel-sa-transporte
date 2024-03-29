import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Endereco } from 'src/app/models/endereco';
import { Municipio } from 'src/app/models/municipio';
import { Permissionario } from 'src/app/models/permissionario';
import { EnderecoService } from 'src/app/services/endereco.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
import { ViaCEPServiceService } from 'src/app/shared/services/viaCEPService.service';
@Component({
  selector: 'app-user-permissionario-alterar-dados',
  templateUrl: './user-permissionario-alterar-dados.component.html',
  styleUrls: ['./user-permissionario-alterar-dados.component.css'],
})
export class UserPermissionarioAlterarDadosComponent
  implements OnInit, OnDestroy
{
  loading: boolean = false;
  form: FormGroup;
  errorMessage: string;

  permissionario: Permissionario;
  enderecoDoPermissionario: Endereco;

  subjectMunicipio: Subject<any> = new Subject();

  ufs = SharedModule.UFs;

  estadosCivil: Map<string, string> = SharedModule.estadosCivil;

  municipiosPesquisados: Map<String, String> = new Map();
  municipioSelecionado: Municipio;

  maskCEP = SharedModule.textMaskCEPPattern;
  maskDate = SharedModule.textMaskDate;

  photoToUpload: File | null = null;
  photo: any | null = null;

  @ViewChild('formConfirmacaoDesativacaoModal')
  formConfirmacaoDesativacaoModal: any;

  formConfirmacaoDesativacao: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private municipioService: MunicipioService,
    private permissionarioService: PermissionarioService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modal: NgbModal,
    private sanitizer: DomSanitizer,
    private viaCEPService: ViaCEPServiceService
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = '';
    try {
      //pesquisa municipio
      this.subjectMunicipio.pipe(debounceTime(500)).subscribe(() => {
        this.searchMunicipios();
      });

      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.permissionario = await this.permissionarioService
        .get(idSelected)
        .pipe(first())
        .toPromise();
      this.enderecoDoPermissionario = await this.enderecoService
        .get(this.permissionario.endereco_id)
        .pipe(first())
        .toPromise();
      if (this.enderecoDoPermissionario.municipio_id)
        this.municipioSelecionado = await this.municipioService
          .get(this.enderecoDoPermissionario.municipio_id)
          .pipe(first())
          .toPromise();

      await this.refreshPhoto(this.permissionario);

      ///////FORM
      this.form = this.formBuilder.group({
        numero_de_cadastro_antigo: new FormControl(
          this.permissionario.id_integracao
        ),
        tipo: new FormControl(this.permissionario.tipo, {
          validators: [Validators.required],
        }),
        nome_razao_social: new FormControl(
          this.permissionario.nome_razao_social,
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(40),
            ],
          }
        ),
        cpf_cnpj: new FormControl(this.permissionario.cpf_cnpj, {
          validators: [
            Validators.required,
            Validators.pattern(SharedModule.CPFCNPJPatern),
          ],
        }),
        rg: new FormControl(this.permissionario.rg ?? '', {
          validators: [Validators.maxLength(9)],
        }),
        data_nascimento: new FormControl(
          SharedModule.formatDateddMMyyyy(this.permissionario.data_nascimento),
          {
            validators: [
              Validators.required,
              Validators.pattern(SharedModule.datePattern),
            ],
          }
        ),
        inscricao_municipal: new FormControl(
          this.permissionario.inscricao_municipal ?? '',
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(15),
            ],
          }
        ),
        prefixo: new FormControl(this.permissionario.prefixo, {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ],
        }),
        responsavel: new FormControl(this.permissionario.responsavel ?? '', {
          validators: [Validators.maxLength(40)],
        }),
        procurador_responsavel: new FormControl(
          this.permissionario.procurador_responsavel ?? '',
          {
            validators: [Validators.maxLength(40)],
          }
        ),
        cep: new FormControl(this.enderecoDoPermissionario?.cep ?? '', {
          validators: [
            Validators.required,
            Validators.pattern(SharedModule.cepPattern),
          ],
        }),
        endereco: new FormControl(
          this.enderecoDoPermissionario?.endereco ?? '',
          {
            validators: [Validators.required],
          }
        ),
        numero: new FormControl(this.enderecoDoPermissionario?.numero ?? '', {
          validators: [Validators.required],
        }),
        complemento: new FormControl(
          this.enderecoDoPermissionario?.complemento ?? '',
          {
            validators: [],
          }
        ),
        bairro: new FormControl(this.enderecoDoPermissionario?.bairro ?? '', {
          validators: [Validators.required],
        }),
        municipio: new FormControl(this.municipioSelecionado?.nome ?? '', {
          validators: [Validators.required],
        }),
        uf: new FormControl(this.enderecoDoPermissionario?.uf ?? '', {
          validators: [Validators.required],
        }),
        telefone: new FormControl(this.permissionario.telefone ?? '', {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        celular: new FormControl(this.permissionario.celular ?? '', {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        telefone2: new FormControl(this.permissionario.telefone2 ?? '', {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        email: new FormControl(this.permissionario.email ?? '', {
          validators: [
            Validators.pattern(SharedModule.emailPatern),
            Validators.maxLength(200),
          ],
        }),
        naturalidade: new FormControl(this.permissionario.nacionalidade ?? '', {
          validators: [Validators.maxLength(15)],
        }),
        nacionalidade: new FormControl(
          this.permissionario.nacionalidade ?? '',
          {
            validators: [Validators.maxLength(15)],
          }
        ),
        cnh: new FormControl(this.permissionario.cnh ?? '', {
          validators: [Validators.maxLength(15)],
        }),
        categoria: new FormControl(this.permissionario.categoria_cnh ?? '', {
          validators: [Validators.maxLength(2)],
        }),
        cnh_validade: new FormControl(
          SharedModule.formatDateddMMyyyy(this.permissionario.vencimento_cnh),
          {
            validators: [Validators.pattern(SharedModule.datePattern)],
          }
        ),
        estado_civil: new FormControl(this.permissionario.estado_civil ?? '', {
          validators: [Validators.required],
        }),
        ativo: new FormControl(this.permissionario.ativo ?? '', {
          validators: [Validators.required],
        }),
      });

      //setando por problema na mascara quando salva
      if (this.enderecoDoPermissionario) {
        this.form.controls['cep'].setValue(
          this.enderecoDoPermissionario?.cep ?? ''
        );
      }

      //forçando verificação de erros
      SharedModule.setAllFieldsFromFormAsTouched(this.form);

      //DEVE SER DEPOIS DE SETAR OS VALORES DO FORM
      this.form.controls['cep'].valueChanges.subscribe((value) => {
        const cep = value;
        if (cep && cep.length > 0 && cep.length == 9) {
          this.viaCEPService.getCEP(cep.replace('-', '')).then(async (data) => {
            this.form.controls['endereco'].setValue(data.logradouro);
            this.form.controls['bairro'].setValue(data.bairro);
            this.form.controls['uf'].setValue(data.uf);
            this.form.controls['municipio'].setValue(data.localidade);
            this.form.controls['numero'].setValue('');
            this.form.controls['complemento'].setValue('');

            //setando municipio
            const municipio = data.localidade;
            if (municipio) {
              await this.searchMunicipios();
              if (this.municipiosPesquisados.size == 1) {
                this.setMunicipio(
                  this.municipiosPesquisados.keys().next().value
                );
              } else {
                this.form.controls['municipio'].setValue('');
                this.searchMunicipios();
              }
            }
          });
        }
      });
    } catch (e: any) {
      console.error(e);
      this.errorMessage = 'Ocorreu um erro ao montar a página';
    }
    this.loading = false;
  }

  ngOnDestroy() {
    this.subjectMunicipio.unsubscribe();
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = '';
    try {
      if (!this.form.valid) {
        this.toastr.error('Existem campos inválidos!');
        this.loading = false;
        return;
      }

      if (!this.municipioSelecionado) {
        this.toastr.error('Nenhum Município selecionado!');
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

      //convertendoDataNasc
      formInput.data_nascimento = SharedModule.convertStringddMMyyyyToyyyyMMdd(
        formInput.data_nascimento
      );

      await this.enderecoService
        .update(this.enderecoDoPermissionario.id, endereco)
        .toPromise();
      await this.permissionarioService
        .update(this.permissionario.id, formInput)
        .toPromise();
      this.toastr.success('Permissionário salvo!');
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  handleFileInput(event: any) {
    if (event.target.files.length > 0) {
      this.photoToUpload = event.target.files[0];
    }
  }

  async salvarFoto() {
    this.loading = true;
    this.errorMessage = '';
    try {
      if (!this.photoToUpload) {
        this.toastr.error('Nenhuma foto foi selecionada');
      }
      await this.permissionarioService
        .updatePhoto(this.permissionario.id, this.photoToUpload)
        .toPromise();
      this.toastr.success('Foto salva!');
      this.closeModal('');
      await this.refreshPhoto(this.permissionario);
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  private async refreshPhoto(permissionario: Permissionario) {
    this.photo = null;
    if (this.permissionario.foto) {
      const blob = await this.permissionarioService
        .getPhoto(this.permissionario.id)
        .pipe(first())
        .toPromise();
      this.photo = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(blob)
      );
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
      return SharedModule.textMaskPhone8Dattern;
    } else {
      return SharedModule.textMaskPhone9Dattern;
    }
  };

  public async searchMunicipios() {
    try {
      this.municipioSelecionado = null;
      const result = await this.municipioService
        .searchByUF(
          this.form.controls['uf'].value,
          this.form.controls['municipio'].value
        )
        .pipe(first())
        .toPromise();

      this.municipiosPesquisados.clear();
      result.data.forEach((municipio: Municipio) => {
        this.municipiosPesquisados.set(`${municipio.id}`, municipio.nome);
      });
    } catch (e: any) {
      this.toastr.error('Ocorreu um erro ao pesquisar.');
    }
  }

  public keyUpMunicipio() {
    this.subjectMunicipio.next(null);
  }

  public async setMunicipio(event) {
    try {
      if (event) {
        this.form.controls['municipio'].setValue('Carregando...');
        this.municipioSelecionado = await this.municipioService
          .get(event)
          .pipe(first())
          .toPromise();
        this.form.controls['municipio'].setValue(
          this.municipioSelecionado.nome
        );
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
    return this.modal.dismissAll();
  }

  openModal(content: any) {
    this.modal.open(content);
  }

  isExpired(field: string): boolean {
    const valueField = this.form.get(field);

    if (valueField.value == null || valueField.value == '') {
      return false;
    }

    const dateField = SharedModule.convertStringddMMyyyyToDate(
      valueField.value
    );

    if (dateField == null) {
      return false;
    }

    return dateField < new Date();
  }

  changeAtivo() {
    if (this.form.controls['ativo'].value == false) {
      if (
        (this.permissionario.termino_atividades &&
          this.permissionario.termino_atividades_motivo &&
          this.permissionario.termino_atividades_motivo != '') ||
        this.permissionario.data_transferencia
      ) {
        this.form.controls['ativo'].setValue(0);
        return;
      }

      this.formConfirmacaoDesativacao = this.formBuilder.group({
        termino_atividades: new FormControl(
          this.permissionario.termino_atividades,
          [Validators.required]
        ),
        termino_atividades_motivo: new FormControl(
          this.permissionario.termino_atividades_motivo,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(200),
          ]
        ),
        data_transferencia: new FormControl(
          this.permissionario.data_transferencia,
          [Validators.required]
        ),
      });

      this.form.controls['ativo'].setValue(1);
      this.openModal(this.formConfirmacaoDesativacaoModal);
    }
  }

  desativarPermissionario(form: any) {
    try {
      if (!this.formConfirmacaoDesativacao.valid) {
        this.toastr.error('Existem campos inválidos!');
        return;
      }

      form.termino_atividades = SharedModule.convertStringddMMyyyyToyyyyMMdd(
        form.termino_atividades
      );

      form.data_transferencia = SharedModule.convertStringddMMyyyyToyyyyMMdd(
        form.data_transferencia
      );

      this.permissionarioService
        .desativar(this.permissionario.id, form)
        .toPromise();
      this.toastr.success('Permissionário desativado!');
      this.closeModal(this.formConfirmacaoDesativacaoModal);
      this.form.controls['ativo'].setValue(0);
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
  }
}
