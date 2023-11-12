import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Municipio } from 'src/app/models/municipio';
import { EnderecoService } from 'src/app/services/endereco.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
import { ViaCEPServiceService } from 'src/app/shared/services/viaCEPService.service';
@Component({
  selector: 'app-user-permissionario-novo',
  templateUrl: './user-permissionario-novo.component.html',
  styleUrls: ['./user-permissionario-novo.component.css'],
})
export class UserPermissionarioNovoComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  form: FormGroup;
  errorMessage: string;

  subjectMunicipio: Subject<any> = new Subject();

  ufs = SharedModule.UFs;

  //TODO: PROBLEMA AO SALVAR DIVORCIADO E DESQUITADO MAS ESTA INDO COMO DE ou DI e la só aceita 1 caractere
  estadosCivil: Map<string, string> = SharedModule.estadosCivil;

  municipiosPesquisados: Map<String, String> = new Map();
  municipioSelecionado: Municipio;

  @ViewChild('municipioInput') municipioInputElement: ElementRef;

  maskCEP = SharedModule.textMaskCEPPattern;
  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private municipioService: MunicipioService,
    private permissionarioService: PermissionarioService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modal: NgbModal,
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

      ///////FORM
      this.form = this.formBuilder.group({
        numero_de_cadastro_antigo: new FormControl(''),
        tipo: new FormControl('', {
          validators: [Validators.required],
        }),
        nome_razao_social: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(40),
          ],
        }),
        cpf_cnpj: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(SharedModule.CPFCNPJPatern),
          ],
        }),
        rg: new FormControl('', {
          validators: [Validators.maxLength(9)],
        }),
        data_nascimento: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(SharedModule.datePattern),
          ],
        }),
        inscricao_municipal: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ],
        }),
        prefixo: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ],
        }),
        reponsavel: new FormControl('', {
          validators: [Validators.maxLength(40)],
        }),
        procurador_responsavel: new FormControl('', {
          validators: [Validators.maxLength(40)],
        }),
        cep: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(SharedModule.cepPattern),
          ],
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
          validators: [
            Validators.pattern(SharedModule.emailPatern),
            Validators.maxLength(200),
          ],
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
        estado_civil: new FormControl('', {
          validators: [Validators.required],
        }),
      });

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
      if (!this.municipioSelecionado) {
        this.toastr.error('Nenhum Município selecionado!');
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

      //convertendoDataNasc
      formInput.data_nascimento = SharedModule.convertStringddMMyyyyToyyyyMMdd(
        formInput.data_nascimento
      );

      const permissionario = await this.permissionarioService
        .create(formInput)
        .toPromise();
      this.toastr.success('Permissionário salvo!');
      this.router.navigate(['../alterar/' + permissionario.id + '/dados'], {
        relativeTo: this.route,
      });
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  closeModal(event: any) {
    return this.modal.dismissAll();
  }

  openModal(content: any) {
    this.modal.open(content);
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
}
