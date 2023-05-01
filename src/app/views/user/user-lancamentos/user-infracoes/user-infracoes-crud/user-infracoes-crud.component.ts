import { ValoresDeInfracaoService } from 'src/app/services/valores-de-infracao.service';
import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, firstValueFrom, throwError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Permissionario } from 'src/app/models/permissionario';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, first } from 'rxjs/operators';
import { SearchData } from 'src/app/services/basic-crud.service';
import { Infracao } from 'src/app/models/infracao';
import { InfracaoService } from 'src/app/services/infracao.service';
import { QuadroDeInfracoesService } from 'src/app/services/quadro-de-infracoes.service';
import { QuadroDeInfracoes } from 'src/app/models/quadro-de-infracoes';
import { Moeda } from 'src/app/models/moeda';
import { MoedaService } from 'src/app/services/moeda.service';
import { NaturezaDaInfracao } from 'src/app/models/natureza-da-infracao';
import { NaturezaDaInfracaoService } from 'src/app/services/natureza-da-infracao.service';
import { SolicitacaoDeAlteracao } from 'src/app/models/solicitacao';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { ArquivoService } from 'src/app/services/arquivo.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { Veiculo } from 'src/app/models/veiculo';
import { FMPService } from 'src/app/services/fmp.service';
import { FMP } from 'src/app/models/fmp';
import { ValoresDeInfracao } from 'src/app/models/valores-de-infracao';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa';

@Component({
  selector: 'app-user-infracoes-crud',
  templateUrl: './user-infracoes-crud.component.html',
  styleUrls: ['./user-infracoes-crud.component.css'],
})
export class UserInfracoesCrudComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  errorMessage: string;

  subjectPermissionario: Subject<any> = new Subject();

  moedas: Moeda[];
  naturezas: NaturezaDaInfracao[];
  empresas: Empresa[];
  fmp: FMP;
  empresa: Empresa;

  permissionariosPesquisados: Map<string, string> = new Map();
  permissionarioSelecionado: Permissionario;
  quadroDeInfracoesSelecionado: QuadroDeInfracoes;
  veiculoSelecionado: Veiculo;

  @ViewChild('permissionarioInput') permissionarioInputElement: ElementRef;

  searchText: string = '';
  searchVeiculoText: string = '';
  quadroDeInfracoesPesquisado: SearchData;
  veiculoPesquisado: SearchData;

  solicitacao: SolicitacaoDeAlteracao;
  crudObj: Infracao;

  maskDate = SharedModule.textMaskDate;
  maskHour = SharedModule.textMaskHour;

  imageFile: File | null = null;
  imageToShow: any | null = null;
  imageChange: boolean = false;

  valorInfracaoOriginal: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private infracaoService: InfracaoService,
    private fmpService: FMPService,
    private moedaService: MoedaService,
    private permissionarioService: PermissionarioService,
    private veiculoService: VeiculoService,
    private quadroDeInfracoesService: QuadroDeInfracoesService,
    private naturezaDaInfracaoService: NaturezaDaInfracaoService,
    private valoresDaInfracaoService: ValoresDeInfracaoService,
    private solicitacaoService: SolicitacaoService,
    private empresaService: EmpresaService,
    private arquivoService: ArquivoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modal: NgbModal,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = '';

    try {
      this.subjectPermissionario.pipe(debounceTime(500)).subscribe(() => {
        this.searchPermissionarios();
      });

      const idSelected: string = this.route.snapshot.paramMap.get('id');
      const solicitacaoId: string =
        this.route.snapshot.queryParamMap.get('solicitacaoId');

      this.moedas = await this.moedaService.index().pipe(first()).toPromise();
      this.naturezas = await this.naturezaDaInfracaoService
        .index()
        .pipe(first())
        .toPromise();
      this.empresas = await this.empresaService
        .index()
        .pipe(first())
        .toPromise();

      ///////FORM
      this.form = this.formBuilder.group({
        num_aip: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(11),
          ],
        }),
        data_infracao: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(SharedModule.datePattern),
          ],
        }),
        hora_infracao: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(SharedModule.hourPattern),
          ],
        }),
        obs_aip: new FormControl('', {
          validators: [Validators.maxLength(500)],
        }),
        acao_tomada: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(500),
          ],
        }),
        num_processo: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(15),
          ],
        }),
        qtd_fmp: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(SharedModule.numberPatern),
          ],
        }),
        moeda_id: new FormControl('', {
          validators: [Validators.required],
        }),
        empresa_id: new FormControl('', {
          validators: [Validators.required],
        }),
        natureza_infracao_id: new FormControl('', {
          validators: [Validators.required],
        }),
        quadro_infracao: new FormControl('', {
          validators: [Validators.required],
        }),
        veiculo: new FormControl('', {
          validators: [Validators.required],
        }),
        permissionario: new FormControl('', {
          validators: [], //manter sem validação por um erro na selação do autocomplete
        }),
        valor_fmp: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(SharedModule.numberPaternWithDotAndComma),
          ],
        }),
        valor_final: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(SharedModule.numberPaternWithDotAndComma),
          ],
        }),
        chave_pix: new FormControl('', {
          validators: [],
        }),
        codigo_pix: new FormControl('', {
          validators: [],
        }),
        tipoPix: new FormControl(0), ///nao é persistido
        tipoDeChavePix: new FormControl(0), ///nao é persistido
      });

      await this.loadFMP();

      if (solicitacaoId) {
        this.solicitacao = await this.solicitacaoService
          .get(solicitacaoId)
          .pipe(first())
          .toPromise();
        if (this.solicitacao) {
          this.form.controls['data_infracao'].setValue(
            SharedModule.formatDateddMMyyyy(this.solicitacao.campo1.toString())
          );
          this.form.controls['hora_infracao'].setValue(this.solicitacao.campo2);
          this.form.controls['descricao'].setValue(this.solicitacao.campo3);
          this.veiculoSelecionado = await this.veiculoService
            .get(this.solicitacao.referencia_veiculo_id)
            .pipe(first())
            .toPromise();
          if (this.veiculoSelecionado) {
            this.form.controls['veiculo'].setValue(
              this.veiculoSelecionado.placa
                ? this.veiculoSelecionado.placa
                : this.veiculoSelecionado.cod_renavam
            );

            this.permissionarioSelecionado = await this.permissionarioService
              .get(this.veiculoSelecionado?.permissionario_id)
              .pipe(first())
              .toPromise();

            if (this.permissionarioSelecionado) {
              this.form.controls['permissionario'].setValue(
                this.permissionarioSelecionado.nome_razao_social
              );
            }
          }

          if (this.solicitacao.arquivo1_uid) {
            this.imageFile = await this.arquivoService
              .get(this.solicitacao.arquivo1_uid)
              .pipe(first())
              .toPromise();
            this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(
              URL.createObjectURL(this.imageFile)
            );
          }
        }
      }

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.infracaoService
          .get(parseInt(idSelected))
          .toPromise();
        this.permissionarioSelecionado = await this.permissionarioService
          .get(this.crudObj.permissionario_id)
          .pipe(first())
          .toPromise();
        this.quadroDeInfracoesSelecionado = await this.quadroDeInfracoesService
          .get(this.crudObj.quadro_infracao_id)
          .pipe(first())
          .toPromise();
        this.veiculoSelecionado = await this.veiculoService
          .get(this.crudObj.veiculo_id)
          .pipe(first())
          .toPromise();

        if (this.crudObj.foto_uid) {
          this.imageFile = await this.arquivoService
            .get(this.crudObj.foto_uid)
            .pipe(first())
            .toPromise();
          this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(this.imageFile)
          );
        }

        this.crudObj = SharedModule.formatAllFieldsDateToddMMyyyy(this.crudObj);

        this.form.controls['num_aip'].setValue(this.crudObj.num_aip);
        this.form.controls['data_infracao'].setValue(
          this.crudObj.data_infracao
        );
        this.form.controls['hora_infracao'].setValue(
          SharedModule.formatHourFromAPIToHHmm(
            this.crudObj.hora_infracao.toString()
          )
        );

        this.form.controls['obs_aip'].setValue(this.crudObj.obs_aip);
        this.form.controls['acao_tomada'].setValue(this.crudObj.acao_tomada);
        this.form.controls['num_processo'].setValue(this.crudObj.num_processo);
        this.form.controls['qtd_fmp'].setValue(this.crudObj.qtd_fmp);
        this.form.controls['valor_final'].setValue(
          SharedModule.numberToCorrency(this.crudObj.valor_final)
        );
        this.form.controls['moeda_id'].setValue(this.crudObj.moeda_id);
        this.form.controls['natureza_infracao_id'].setValue(
          this.quadroDeInfracoesSelecionado.natureza_infracao_id
        );
        this.form.controls['quadro_infracao'].setValue(
          this.quadroDeInfracoesSelecionado.descricao
        );
        this.form.controls['veiculo'].setValue(
          this.veiculoSelecionado.placa
            ? this.veiculoSelecionado.placa
            : this.veiculoSelecionado.cod_renavam
        );
        this.form.controls['permissionario'].setValue(
          this.permissionarioSelecionado.nome_razao_social
        );
        this.form.controls['empresa_id'].setValue(this.crudObj.empresa_id);
        this.form.controls['chave_pix'].setValue(this.crudObj.chave_pix);
        this.form.controls['codigo_pix'].setValue(this.crudObj.codigo_pix);

        this.valorInfracaoOriginal = this.crudObj.valor;

        if (this.crudObj.chave_pix) {
          this.form.controls['tipoDeChavePix'].setValue(
            SharedModule.detectTipoPix(this.crudObj.chave_pix)
          );
        }
      }
    } catch (e: any) {
      this.errorMessage = 'Ocorreu um erro ao montar a página';
      console.error(e);
    }
    this.loading = false;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = '';
    try {
      SharedModule.setAllFieldsFromFormAsTouched(this.form);

      if (!this.form.valid) {
        this.toastr.error('Verifique se existem campos inválidos!');
        this.loading = false;
        return;
      }

      if (!this.permissionarioSelecionado) {
        this.toastr.error('Nenhum Permissionário selecionado!');
        this.loading = false;
        return;
      }

      if (!this.quadroDeInfracoesSelecionado) {
        this.toastr.error('Nenhum Quadro de Infração selecionado!');
        this.loading = false;
        return;
      }

      if (
        this.form.controls['tipoPix'].value == '0' &&
        !this.form.controls['chave_pix'].value
      ) {
        this.toastr.error('Informe a chave pix!');
        this.loading = false;
        return;
      }

      if (
        this.form.controls['tipoPix'].value == '1' &&
        !this.form.controls['codigo_pix'].value
      ) {
        this.toastr.error('Informe o código pix!');
        this.loading = false;
        return;
      }

      if (!this.veiculoSelecionado) {
        this.toastr.error('Nenhum veículo selecionado!');
        this.loading = false;
        return;
      }

      if (
        this.veiculoSelecionado &&
        this.permissionarioSelecionado &&
        this.permissionarioSelecionado?.id !=
          this.veiculoSelecionado?.permissionario_id
      ) {
        this.toastr.error(
          'Veiculo selecionado não pertence ao permissionário!'
        );
        this.loading = false;
        return;
      }

      if (
        !this.imageChange &&
        this.solicitacao &&
        this.solicitacao.arquivo1_uid
      ) {
        formInput.foto_uid = this.solicitacao.arquivo1_uid;
      } else if (this.imageChange && this.imageFile) {
        const arquivo = await this.arquivoService
          .create(this.imageFile)
          .pipe(first())
          .toPromise();

        if (!arquivo) {
          throwError('Imagem não cadastrada');
        }

        formInput.foto_uid = arquivo.id;
      }

      formInput.permissionario_id = this.permissionarioSelecionado.id;
      formInput.quadro_infracao_id = this.quadroDeInfracoesSelecionado.id;
      formInput.veiculo_id = this.veiculoSelecionado.id;
      formInput.valor = this.valorInfracaoOriginal;
      formInput.tipo_pagamento = 'pix'; //somente pix por hora
      formInput.valor_fmp = SharedModule.correncyToNumber(
        this.form.controls['valor_fmp'].value
      );
      formInput.valor_final = SharedModule.correncyToNumber(
        this.form.controls['valor_final'].value
      );
      formInput.fmp_id = this.fmp.id;
      formInput.valor_fmp_atual = this.fmp.valor;

      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      if (this.crudObj) {
        await this.infracaoService
          .update(this.crudObj.id, formInput)
          .toPromise();
      } else {
        if (this.solicitacao) {
          formInput.solicitacao_id = this.solicitacao.id;
        }

        await this.infracaoService.create(formInput).toPromise();
      }
      this.toastr.success('Infração salva!');
      this.router.navigate(['/user/lancamentos/infracoes']);
    } catch (e: any) {
      console.error(e);
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  async loadFMP() {
    const fmps = await this.fmpService.indexValidos().toPromise();
    if (!fmps || fmps.length == 0) {
      this.toastr.error('Nenhum FMP válido encontrado!');
    }
    this.fmp = fmps[0];
    this.form.controls['valor_fmp'].setValue(
      this.fmp.valor.toFixed(2).replace('.', ',')
    );
  }

  async excluir() {
    this.loading = true;
    this.errorMessage = '';
    try {
      await this.infracaoService.delete(this.crudObj.id).toPromise();
      this.modal.dismissAll();
      this.toastr.success('Excluido com Sucesso!');
      this.router.navigate(['/user/lancamentos/infracoes']);
    } catch (e: any) {
      this.modal.dismissAll();
      this.errorMessage = 'Este não pode ser excluido!';
    }
    this.loading = false;
  }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      this.imageFile = files.item(0);
      this.imageChange = true;
    }
  }

  async salvarFoto() {
    this.loading = true;
    this.errorMessage = '';
    try {
      if (!this.imageFile) {
        this.toastr.error('Nenhuma foto foi selecionada');
      }
      await this.permissionarioService
        .updatePhoto(this.crudObj.id, this.imageFile)
        .toPromise();
      this.toastr.success('Foto salva!');
      this.closeModal('');
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  async searchQuadroDeInfracoes(text: string = '', page: number = 1) {
    this.loading = true;
    try {
      page = this.searchText !== text ? 1 : page;
      this.searchText = text;

      this.quadroDeInfracoesPesquisado = await this.quadroDeInfracoesService
        .search(this.searchText, page)
        .toPromise();
    } catch (e) {
      this.quadroDeInfracoesPesquisado = null;
    }
    this.loading = false;
  }

  async searchVeiculos(text: string = '', page: number = 1) {
    this.loading = true;
    try {
      page = this.searchVeiculoText !== text ? 1 : page;
      this.searchVeiculoText = text;

      if (!this.permissionarioService) {
        this.toastr.error('É necessário selecionar um permissionário antes.');
        return;
      }

      this.veiculoPesquisado = await this.veiculoService
        .searchPorPermissionario(
          this.searchVeiculoText,
          this.permissionarioSelecionado.id.toString(),
          page
        )
        .toPromise();
    } catch (e) {
      this.veiculoPesquisado = null;
    }
    this.loading = false;
  }

  async visualizarImagem(modal) {
    try {
      this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.imageFile)
      );
      this.openModal(modal);
    } catch (e: any) {
      this.imageFile = null;
      this.closeModal(null);
    }
  }

  public changePosQuadroPaginate(page: number) {
    this.searchQuadroDeInfracoes(this.searchText, page);
  }

  public changePosVeiculoPaginate(page: number) {
    this.searchVeiculos(this.searchVeiculoText, page);
  }

  async selecionarQuadro(id: string) {
    this.loading = true;
    try {
      this.quadroDeInfracoesSelecionado = await this.quadroDeInfracoesService
        .get(id)
        .pipe(first())
        .toPromise();

      this.form.controls['quadro_infracao'].setValue(
        this.quadroDeInfracoesSelecionado.descricao
      );

      this.form.controls['natureza_infracao_id'].setValue(
        this.quadroDeInfracoesSelecionado.natureza_infracao_id
      );

      this.loadValoresDaInfracao();

      this.closeModal(null);
    } catch (e) {}
    this.loading = false;
  }

  selecionarEmpresa(event: any) {
    this.empresa = this.empresas.find(
      (empresa) => empresa.id == event.target.value
    );

    if (this.empresa && this.empresa.tipo_chave_pix && this.empresa.chave_pix) {
      this.form.controls['tipoDeChavePix'].setValue(
        this.empresaService.TIPOS_CHAVE_PIX.find(
          (tipo) => tipo.tipo == this.empresa.tipo_chave_pix
        ).id
      );
      this.form.controls['chave_pix'].setValue(this.empresa.chave_pix);
    }
  }

  private async loadValoresDaInfracao() {
    if (!this.quadroDeInfracoesSelecionado || !this.permissionarioSelecionado) {
      return;
    }

    const valores: ValoresDeInfracao[] = await firstValueFrom(
      this.valoresDaInfracaoService.getByModalidadeIdAndNaturezaId(
        this.permissionarioSelecionado.modalidade_id,
        this.quadroDeInfracoesSelecionado.natureza_infracao_id
      )
    );

    if (!valores || valores.length == 0) {
      this.toastr.error(
        'Não foi encontrado valores para a modalidade do permissionário e natureza selecionada.'
      );
      return;
    }

    if (valores.length > 1) {
      this.toastr.error(
        'Mais de um valor foi encontrado para a modalidade do permissionário e natureza selecionada.'
      );
      return;
    }

    this.form.controls['moeda_id'].setValue(valores[0].moeda_id);
    this.form.controls['qtd_fmp'].setValue(valores[0].quantidade);
    this.valorInfracaoOriginal = this.fmp.valor * valores[0].quantidade;
    this.form.controls['valor_final'].setValue(
      `${this.valorInfracaoOriginal},00`
    );
  }

  async selecionarVeiculo(id: string) {
    this.loading = true;
    try {
      this.veiculoSelecionado = await this.veiculoService
        .get(id)
        .pipe(first())
        .toPromise();

      this.form.controls['veiculo'].setValue(
        this.veiculoSelecionado.placa
          ? this.veiculoSelecionado.placa
          : this.veiculoSelecionado.cod_renavam
      );

      this.closeModal(null);
    } catch (e) {}
    this.loading = false;
  }

  excluirImagem() {
    this.imageFile = null;
    this.imageChange = true;
  }

  closeModal(event: any) {
    return this.modal.dismissAll();
  }

  openModal(content: any) {
    this.modal.open(content);
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
        this.permissionariosPesquisados.set(
          `${permissionario.id}`,
          permissionario.nome_razao_social
        );
      });
    } catch (e: any) {
      this.toastr.error('Ocorreu um erro ao pesquisar.');
    }
  }

  public keyUpPermissionario() {
    this.subjectPermissionario.next(null);
  }

  public async setPermissionario(event) {
    try {
      if (event) {
        this.form.controls['permissionario'].setValue('Carregando...');
        this.permissionarioSelecionado = await this.permissionarioService
          .get(event)
          .pipe(first())
          .toPromise();
        this.form.controls['permissionario'].setValue(
          this.permissionarioSelecionado.nome_razao_social
        );

        this.loadValoresDaInfracao();
        this.form.controls['veiculo'].setValue('');
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

  public isStatusPago(): boolean {
    if (this.crudObj && this.crudObj.status == 'pago') {
      return true;
    }
    return false;
  }
}
