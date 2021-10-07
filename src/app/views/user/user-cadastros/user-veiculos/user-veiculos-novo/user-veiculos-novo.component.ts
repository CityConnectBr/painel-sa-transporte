import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { CorDoVeiculo } from 'src/app/models/cor-do-veiculo';
import { MarcaModeloDeVeiculo } from 'src/app/models/marca-modelo-de-veiculo';
import { Permissionario } from 'src/app/models/permissionario';
import { TipoDeCombustivel } from 'src/app/models/tipo-de-combustivel';
import { TipoDeVeiculo } from 'src/app/models/tipo-de-veiculo';
import { CorDoVeiculoService } from 'src/app/services/cor-do-veiculo.service';
import { MarcaModeloDeVeiculoService } from 'src/app/services/marca-modelo-de-veiculo.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { TipoDeCombustivelService } from 'src/app/services/tipo-de-combustivel.service';
import { TipoDeVeiculoService } from 'src/app/services/tipo-de-veiculo.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-veiculos-novo',
  templateUrl: './user-veiculos-novo.component.html',
  styleUrls: ['./user-veiculos-novo.component.css']
})
export class UserVeiculosNovoComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  subjectPermissionario: Subject<any> = new Subject();
  subjectMarcaModelo: Subject<any> = new Subject();

  tiposDeCombustivel: TipoDeCombustivel[];
  cores: CorDoVeiculo[];
  tiposDeVeiculo: TipoDeVeiculo[];

  permissionariosPesquisados: Map<String, String> = new Map();
  permissionarioSelecionado: Permissionario;

  marcasModelosPesquisados: Map<String, String> = new Map();
  marcasModelosSelecionado: MarcaModeloDeVeiculo;

  @ViewChild('permissionarioInput') permissionarioInputElement: ElementRef;
  @ViewChild('marcaModeloInput') marcaModeloInputElement: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private permissionarioService: PermissionarioService,
    private veiculoService: VeiculoService,
    private marcaModeloVeiculoService: MarcaModeloDeVeiculoService,
    private corDoVeiculoService: CorDoVeiculoService,
    private tipoDeVeiculoService: TipoDeVeiculoService,
    private tipoDeCombustivelService: TipoDeCombustivelService,
    private location: Location,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
    private modal: NgbModal,
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = "";

    try {
      this.subjectPermissionario
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.searchPermissionarios();
        }
        );

        this.subjectMarcaModelo
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.searchMarcaModelo();
        }
        );

      this.tiposDeCombustivel = await this.tipoDeCombustivelService.index().pipe(first()).toPromise();
      this.cores = await this.corDoVeiculoService.index().pipe(first()).toPromise();
      this.tiposDeVeiculo = await this.tipoDeVeiculoService.index().pipe(first()).toPromise();

      ///////FORM
      this.form = this.formBuilder.group({
        placa: new FormControl('', {
          validators: [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
        }),
        cod_renavam: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(11)],
        }),
        chassi: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
        }),
        ano_fabricacao: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.numberPatern)],
        }),
        ano_modelo: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.numberPatern)],
        }),
        anos_vida_util_veiculo: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.numberPatern)],
        }),
        capacidade: new FormControl('', {
          validators: [Validators.required, Validators.minLength(1), Validators.maxLength(15)],
        }),
        observacao_capacidade: new FormControl('', {
          validators: [Validators.maxLength(40)],
        }),
        tipo_capacidade: new FormControl('', {
          validators: [Validators.required],
        }),
        marca_modelo_veiculo: new FormControl(''),
        tipo_combustivel_id: new FormControl('', {
          validators: [Validators.required],
        }),
        cor_id: new FormControl('', {
          validators: [Validators.required],
        }),
        tipo_veiculo_id: new FormControl('', {
          validators: [Validators.required],
        }),
        permissionario: new FormControl(''),
        categoria_id: new FormControl('1',),//1-veiculo,2-onibus
      })

    } catch (e: any) {
      console.log(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  ngOnDestroy() {
    this.subjectPermissionario.unsubscribe();
    this.subjectMarcaModelo.unsubscribe();
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      if (!this.permissionarioSelecionado) {
        this.snackbarService.openSnackBarError("Nenhum Permissionário selecionado!");
        this.loading = false;
        return;
      }

      if (!this.marcasModelosSelecionado) {
        this.snackbarService.openSnackBarError("Nenhum Marca/Modelo selecionado!");
        this.loading = false;
        return;
      }

      formInput.permissionario_id = this.permissionarioSelecionado.id;
      formInput.marca_modelo_veiculo_id = this.marcasModelosSelecionado.id;

      await this.veiculoService.create(formInput).toPromise();
      this.snackbarService.openSnackBarSucess('Veículo salvo!');
      this.location.back()
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

  ///////

  public async searchMarcaModelo() {
    try {
      this.permissionarioSelecionado = null;
      const result = await this.marcaModeloVeiculoService
        .search(this.form.controls['marca_modelo_veiculo'].value)
        .pipe(first())
        .toPromise();

      this.marcasModelosPesquisados.clear();
      result.data.forEach((marcaModelo: MarcaModeloDeVeiculo) => {
        this.marcasModelosPesquisados.set(`${marcaModelo.id}`, marcaModelo.descricao);
      });

    } catch (e: any) {
      this.snackbarService.openSnackBarError("Ocorreu um erro ao pesquisar.");
    }
  }

  public keyUpMarcaModelo() {
    this.subjectMarcaModelo.next();
  }

  public async setMarcaModelo(event) {
    try {
      if (event) {
        this.form.controls['marca_modelo_veiculo'].setValue("Carregando...");
        this.marcasModelosSelecionado = await this.marcaModeloVeiculoService.get(event).pipe(first()).toPromise();
        this.form.controls['marca_modelo_veiculo'].setValue(this.marcasModelosSelecionado.descricao);
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
}
