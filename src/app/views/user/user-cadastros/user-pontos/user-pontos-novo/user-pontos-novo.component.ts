import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Modalidade } from 'src/app/models/modalidade';
import { Municipio } from 'src/app/models/municipio';
import { EnderecoService } from 'src/app/services/endereco.service';
import { ModalidadeService } from 'src/app/services/modalidade.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PontoService } from 'src/app/services/ponto.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-pontos-novo',
  templateUrl: './user-pontos-novo.component.html',
  styleUrls: ['./user-pontos-novo.component.css']
})
export class UserPontosNovoComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  subjectMunicipio: Subject<any> = new Subject();

  ufs = SharedModule.UFs;

  municipiosPesquisados: Map<String, String> = new Map();
  municipioSelecionado: Municipio;

  modalidades: Modalidade[] = [];

  @ViewChild('municipioInput') municipioInputElement: ElementRef;

  maskCEP = SharedModule.textMaskCEPPattern;
  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private municipioService: MunicipioService,
    private pontoService: PontoService,
    private modalidadeService: ModalidadeService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modal: NgbModal,
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = "";

    try {

      this.loadModalidades();

      //pesquisa municipio
      this.subjectMunicipio
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.searchMunicipios();
        }
        );

      ///////FORM
      this.form = this.formBuilder.group({
        descricao: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
        }),
        telefone: new FormControl('', {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        data_criacao: new FormControl('', {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        data_extincao: new FormControl('', {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        ocupacao_atual: new FormControl('', {
          validators: [Validators.maxLength(40)],
        }),
        observacao: new FormControl('', {
          validators: [Validators.maxLength(500)],
        }),
        modalidade_id: new FormControl('', {
          validators: [Validators.required,],
        }),
        celular: new FormControl('', {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
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
      })

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
      if (!this.municipioSelecionado) {
        this.toastr.error("Nenhum Município selecionado!");
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
      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);
      formInput = SharedModule.convertAllFieldsTrueFalseToBoolean(formInput);

      const ponto = await this.pontoService.create(formInput).toPromise();
      this.toastr.success('Ponto salvo!');
      this.router.navigate(['../alterar/' + ponto.id + '/dados'], {relativeTo:this.route});
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

  private loadModalidades() {
    this.modalidadeService.index().subscribe((result: any) => this.modalidades = result);
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
      this.toastr.error("Ocorreu um erro ao pesquisar.");
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

}
