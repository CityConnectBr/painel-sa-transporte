import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Endereco } from 'src/app/models/endereco';
import { Municipio } from 'src/app/models/municipio';
import { Ponto } from 'src/app/models/ponto';
import { EnderecoService } from 'src/app/services/endereco.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PontoService } from 'src/app/services/ponto.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
import { ViaCEPServiceService } from 'src/app/shared/services/viaCEPService.service';
@Component({
  selector: 'app-user-pontos-alterar-dados',
  templateUrl: './user-pontos-alterar-dados.component.html',
  styleUrls: ['./user-pontos-alterar-dados.component.css']
})
export class UserPontosAlterarDadosComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  ponto: Ponto;
  endereco: Endereco;

  subjectMunicipio: Subject<any> = new Subject();

  permissionariosPesquisados: Map<String, String> = new Map();

  ufs = SharedModule.UFs;

  municipiosPesquisados: Map<String, String> = new Map();
  municipioSelecionado: Municipio;

  maskCEP = SharedModule.textMaskCEPPattern;
  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private municipioService: MunicipioService,
    private pontoService: PontoService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private viaCEPService: ViaCEPServiceService
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

      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.ponto = await this.pontoService.get(idSelected).pipe(first()).toPromise();

      this.endereco = await this.enderecoService.get(this.ponto.endereco_id).pipe(first()).toPromise();
      if (this.endereco.municipio_id)
        this.municipioSelecionado = await this.municipioService.get(this.endereco.municipio_id).pipe(first()).toPromise();

      //convertendo de 1|0 para boolean
      this.ponto = SharedModule.convertAllFields01ToBoolean(this.ponto);

      //formatando datas
      this.ponto = SharedModule.formatAllFieldsDateToddMMyyyy(this.ponto);

      ///////FORM
      this.form = this.formBuilder.group({
        descricao: new FormControl(this.ponto.descricao ?? "", {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
        }),
        telefone: new FormControl(this.ponto.telefone ?? "", {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        data_criacao: new FormControl(this.ponto.data_criacao ?? "", {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        data_extincao: new FormControl(this.ponto.data_extincao ?? "", {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        ocupacao_atual: new FormControl(this.ponto.ocupacao_atual ?? "", {
          validators: [Validators.maxLength(40)],
        }),
        observacao: new FormControl(this.ponto.observacao ?? "", {
          validators: [Validators.maxLength(500)],
        }),
        modalidade_id: new FormControl(this.ponto.modalidade_id ?? "", {
          validators: [Validators.required,],
        }),
        cep: new FormControl(this.endereco?.cep ?? "", {
          validators: [Validators.required, Validators.pattern(SharedModule.cepPattern)],
        }),
        endereco: new FormControl(this.endereco?.endereco ?? "", {
          validators: [Validators.required],
        }),
        numero: new FormControl(this.endereco?.numero ?? "", {
          validators: [Validators.required],
        }),
        complemento: new FormControl(this.endereco?.complemento ?? "", {
          validators: [],
        }),
        bairro: new FormControl(this.endereco?.bairro ?? "", {
          validators: [Validators.required],
        }),
        municipio: new FormControl(this.municipioSelecionado?.nome ?? "", {
          validators: [Validators.required],
        }),
        uf: new FormControl(this.endereco?.uf ?? "", {
          validators: [Validators.required],
        }),
      });

      //setando por problema na mascara quando salva
      if(this.endereco){
        this.form.controls['cep'].setValue(this.endereco?.cep ?? "");
      }

      //DEVE SER DEPOIS DE SETAR OS VALORES DO FORM
      this.form.controls['cep'].valueChanges.subscribe((value) => {
        const cep = value;
        if (cep && cep.length > 0 && cep.length == 9) {
          this.viaCEPService.getCEP(cep.replace('-', '')).then(async(data) => {
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
              if(this.municipiosPesquisados.size == 1){
                this.setMunicipio(this.municipiosPesquisados.keys().next().value);
              }else{
                this.form.controls['municipio'].setValue("");
                this.searchMunicipios();
              }
            }
          });
        }
      });

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
        this.toastr.error("Nenhum município selecionado!");
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

      await this.enderecoService.update(this.ponto.endereco_id, endereco).toPromise();
      await this.pontoService.update(this.ponto.id, formInput).toPromise();
      this.toastr.success('Ponto salvo!');
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
