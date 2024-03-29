import { Location } from '@angular/common';
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
import { CorDoVeiculo } from 'src/app/models/cor-do-veiculo';
import { MarcaModeloDeCarroceria } from 'src/app/models/marca-modelo-de-carroceria';
import { MarcaModeloDeChassi } from 'src/app/models/marca-modelo-de-chassi';
import { MarcaModeloDeVeiculo } from 'src/app/models/marca-modelo-de-veiculo';
import { Permissionario } from 'src/app/models/permissionario';
import { TipoDeCombustivel } from 'src/app/models/tipo-de-combustivel';
import { TipoDeVeiculo } from 'src/app/models/tipo-de-veiculo';
import { CorDoVeiculoService } from 'src/app/services/cor-do-veiculo.service';
import { MarcaModeloDeCarroceriaService } from 'src/app/services/marca-modelo-de-carroceria.service';
import { MarcaModeloDeChassiService } from 'src/app/services/marca-modelo-de-chassi.service';
import { MarcaModeloDeVeiculoService } from 'src/app/services/marca-modelo-de-veiculo.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { TipoDeCombustivelService } from 'src/app/services/tipo-de-combustivel.service';
import { TipoDeVeiculoService } from 'src/app/services/tipo-de-veiculo.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
import { SolicitacaoDeAlteracao } from 'src/app/models/solicitacao';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
@Component({
  selector: 'app-user-veiculos-novo',
  templateUrl: './user-veiculos-novo.component.html',
  styleUrls: ['./user-veiculos-novo.component.css'],
})
export class UserVeiculosNovoComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  form: FormGroup;
  errorMessage: string;

  subjectPermissionario: Subject<any> = new Subject();
  subjectMarcaModelo: Subject<any> = new Subject();
  subjectMarcaModeloChassi: Subject<any> = new Subject();
  subjectMarcaModeloCarroceria: Subject<any> = new Subject();

  tiposDeCombustivel: TipoDeCombustivel[];
  cores: CorDoVeiculo[];
  tiposDeVeiculo: TipoDeVeiculo[];

  solicitacao: SolicitacaoDeAlteracao;

  permissionariosPesquisados: Map<String, String> = new Map();
  permissionarioSelecionado: Permissionario;

  marcasModelosPesquisados: Map<String, String> = new Map();
  marcasModelosSelecionado: MarcaModeloDeVeiculo;

  marcasModelosChassiPesquisados: Map<String, String> = new Map();
  marcasModelosChassiSelecionado: MarcaModeloDeChassi;

  marcasModelosCarroceriaPesquisados: Map<String, String> = new Map();
  marcasModelosCarroceriaSelecionado: MarcaModeloDeCarroceria;

  @ViewChild('permissionarioInput') permissionarioInputElement: ElementRef;
  @ViewChild('marcaModeloInput') marcaModeloInputElement: ElementRef;

  veiculoSubstituido: string;

  constructor(
    private formBuilder: FormBuilder,
    private permissionarioService: PermissionarioService,
    private veiculoService: VeiculoService,
    private marcaModeloVeiculoService: MarcaModeloDeVeiculoService,
    private marcaModeloChassiService: MarcaModeloDeChassiService,
    private marcaModeloCarroceriaService: MarcaModeloDeCarroceriaService,
    private corDoVeiculoService: CorDoVeiculoService,
    private tipoDeVeiculoService: TipoDeVeiculoService,
    private tipoDeCombustivelService: TipoDeCombustivelService,
    private solicitacaoService: SolicitacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modal: NgbModal
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = '';

    const solicitacaoId: string =
      this.route.snapshot.queryParamMap.get('solicitacaoId');
    this.veiculoSubstituido =
      this.route.snapshot.queryParamMap.get('veiculoSubstituido');

    try {
      this.subjectPermissionario.pipe(debounceTime(500)).subscribe(() => {
        this.searchPermissionarios();
      });

      this.subjectMarcaModelo.pipe(debounceTime(500)).subscribe(() => {
        this.searchMarcaModelo();
      });

      this.subjectMarcaModeloChassi.pipe(debounceTime(500)).subscribe(() => {
        this.searchMarcaModeloChassi();
      });

      this.subjectMarcaModeloCarroceria
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.searchMarcaModeloCarroceria();
        });

      this.tiposDeCombustivel = await this.tipoDeCombustivelService
        .index()
        .pipe(first())
        .toPromise();
      this.cores = await this.corDoVeiculoService
        .index()
        .pipe(first())
        .toPromise();
      this.tiposDeVeiculo = await this.tipoDeVeiculoService
        .index()
        .pipe(first())
        .toPromise();

      ///////FORM
      this.form = this.formBuilder.group({
        placa: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(7),
          ],
        }),
        cod_renavam: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(11),
          ],
        }),
        chassi: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
          ],
        }),
        ano_fabricacao: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(SharedModule.numberPatern),
          ],
        }),
        ano_modelo: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(SharedModule.numberPatern),
          ],
        }),
        anos_vida_util_veiculo: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(SharedModule.numberPatern),
          ],
        }),
        capacidade: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(15),
          ],
        }),
        observacao_capacidade: new FormControl('', {
          validators: [Validators.maxLength(40)],
        }),
        tipo_capacidade: new FormControl('', {
          validators: [Validators.required],
        }),
        marca_modelo_veiculo: new FormControl(''),
        marca_modelo_chassi: new FormControl(''),
        marca_modelo_carroceria: new FormControl(''),
        tipo_combustivel_id: new FormControl('', {
          validators: [Validators.required],
        }),
        cor_id: new FormControl('', {
          validators: [Validators.required],
        }),
        tipo_veiculo_id: new FormControl('', {
          validators: [Validators.required],
        }),
        gnv_numero: new FormControl('', {
          validators: [Validators.maxLength(20)],
        }),
        gnv_selo_validade: new FormControl('', {
          validators: [Validators.maxLength(15)],
        }),
        gnv_ano_fabricacao: new FormControl('', {
          validators: [Validators.maxLength(4)],
        }),
        permissionario: new FormControl(''),
        categoria_id: new FormControl('1', Validators.required), //1-veiculo,2-onibus
      });

      if (solicitacaoId) {
        this.solicitacao = await this.solicitacaoService
          .get(solicitacaoId)
          .pipe(first())
          .toPromise();
        if (this.solicitacao) {
            this.permissionarioSelecionado = await this.permissionarioService
              .get(this.solicitacao?.permissionario_id)
              .pipe(first())
              .toPromise();

            if (this.permissionarioSelecionado) {
              this.form.controls['permissionario'].setValue(
                this.permissionarioSelecionado.nome_razao_social
              );
            }
          }
        }
    } catch (e: any) {
      console.error(e);
      this.errorMessage = 'Ocorreu um erro ao montar a página';
    }
    this.loading = false;
  }

  ngOnDestroy() {
    this.subjectPermissionario.unsubscribe();
    this.subjectMarcaModelo.unsubscribe();
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = '';
    try {
      if (!this.permissionarioSelecionado) {
        this.toastr.error('Nenhum Permissionário selecionado!');
        this.loading = false;
        return;
      }

      if (formInput.categoria_id == 1) {
        if (!this.marcasModelosSelecionado) {
          this.toastr.error('Nenhum Marca/Modelo selecionado!');
          this.loading = false;
          return;
        }
      } else {
        if (!this.marcasModelosChassiSelecionado) {
          this.toastr.error('Nenhum Marca/Modelo de Chassi selecionado!');
          this.loading = false;
          return;
        }

        if (!this.marcasModelosCarroceriaSelecionado) {
          this.toastr.error('Nenhum Marca/Modelo de Carroceria selecionado!');
          this.loading = false;
          return;
        }
      }

      formInput.permissionario_id = this.permissionarioSelecionado.id;
      if (formInput.categoria_id == 1) {
        formInput.marca_modelo_veiculo_id = this.marcasModelosSelecionado.id;
      } else {
        formInput.marca_modelo_chassi_id =
          this.marcasModelosChassiSelecionado.id;
        formInput.marca_modelo_carroceria_id =
          this.marcasModelosCarroceriaSelecionado.id;
      }

      if (formInput.gnv_selo_validade) {
        formInput.gnv_selo_validade =
          SharedModule.convertStringddMMyyyyToyyyyMMdd(
            formInput.gnv_selo_validade
          );
      }

      if(this.solicitacao){
        formInput.solicitacao_substituicao_id = this.solicitacao.id;
        formInput.veiculo_substituido_id = this.veiculoSubstituido;
      }

      const veiculo = await this.veiculoService.create(formInput).toPromise();
      this.toastr.success('Veículo salvo!');
      this.router.navigate(['../alterar/' + veiculo.id + '/dados'], {
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

  ///////

  public async searchMarcaModelo() {
    try {
      this.marcasModelosSelecionado = null;
      const result = await this.marcaModeloVeiculoService
        .search(this.form.controls['marca_modelo_veiculo'].value)
        .pipe(first())
        .toPromise();

      this.marcasModelosPesquisados.clear();
      result.data.forEach((marcaModelo: MarcaModeloDeVeiculo) => {
        this.marcasModelosPesquisados.set(
          `${marcaModelo.id}`,
          marcaModelo.descricao
        );
      });
    } catch (e: any) {
      this.toastr.error('Ocorreu um erro ao pesquisar.');
    }
  }

  public keyUpMarcaModelo() {
    this.subjectMarcaModelo.next(null);
  }

  public async setMarcaModelo(event) {
    try {
      if (event) {
        this.form.controls['marca_modelo_veiculo'].setValue('Carregando...');
        this.marcasModelosSelecionado = await this.marcaModeloVeiculoService
          .get(event)
          .pipe(first())
          .toPromise();
        this.form.controls['marca_modelo_veiculo'].setValue(
          this.marcasModelosSelecionado.descricao
        );
      }
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
  }

  public setFocusMarcaModeloInput(focus: boolean) {
    if (focus) {
      this.searchMarcaModelo();
    }
  }

  ///////

  public async searchMarcaModeloChassi() {
    try {
      this.marcasModelosChassiSelecionado = null;
      const result = await this.marcaModeloChassiService
        .search(this.form.controls['marca_modelo_chassi'].value)
        .pipe(first())
        .toPromise();

      this.marcasModelosChassiPesquisados.clear();
      result.data.forEach((marcaModelo: MarcaModeloDeChassi) => {
        this.marcasModelosChassiPesquisados.set(
          `${marcaModelo.id}`,
          marcaModelo.descricao
        );
      });
    } catch (e: any) {
      this.toastr.error('Ocorreu um erro ao pesquisar.');
    }
  }

  public keyUpMarcaModeloChassi() {
    this.subjectMarcaModeloChassi.next(null);
  }

  public async setMarcaModeloChassi(event) {
    try {
      if (event) {
        this.form.controls['marca_modelo_chassi'].setValue('Carregando...');
        this.marcasModelosChassiSelecionado =
          await this.marcaModeloChassiService
            .get(event)
            .pipe(first())
            .toPromise();
        this.form.controls['marca_modelo_chassi'].setValue(
          this.marcasModelosChassiSelecionado.descricao
        );
      }
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
  }

  public setFocusMarcaModeloChassiInput(focus: boolean) {
    if (focus) {
      this.searchMarcaModeloChassi();
    }
  }

  ///////

  public async searchMarcaModeloCarroceria() {
    try {
      this.marcasModelosCarroceriaSelecionado = null;
      const result = await this.marcaModeloCarroceriaService
        .search(this.form.controls['marca_modelo_carroceria'].value)
        .pipe(first())
        .toPromise();

      this.marcasModelosCarroceriaPesquisados.clear();
      result.data.forEach((marcaModelo: MarcaModeloDeCarroceria) => {
        this.marcasModelosCarroceriaPesquisados.set(
          `${marcaModelo.id}`,
          marcaModelo.descricao
        );
      });
    } catch (e: any) {
      this.toastr.error('Ocorreu um erro ao pesquisar.');
    }
  }

  public keyUpMarcaModeloCarroceria() {
    this.subjectMarcaModeloCarroceria.next(null);
  }

  public async setMarcaModeloCarroceria(event) {
    try {
      if (event) {
        this.form.controls['marca_modelo_carroceria'].setValue('Carregando...');
        this.marcasModelosCarroceriaSelecionado =
          await this.marcaModeloCarroceriaService
            .get(event)
            .pipe(first())
            .toPromise();
        this.form.controls['marca_modelo_carroceria'].setValue(
          this.marcasModelosCarroceriaSelecionado.descricao
        );
      }
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
  }

  public setFocusMarcaModeloCarroceriaInput(focus: boolean) {
    if (focus) {
      this.searchMarcaModeloCarroceria();
    }
  }
}
