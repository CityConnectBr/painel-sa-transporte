import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Veiculo } from 'src/app/models/veiculo';
import { Certidao } from 'src/app/models/certidao';
import { CorDoVeiculo } from 'src/app/models/cor-do-veiculo';
import { MarcaModeloDeVeiculo } from 'src/app/models/marca-modelo-de-veiculo';
import { Permissionario } from 'src/app/models/permissionario';
import { Ponto } from 'src/app/models/ponto';
import { TipoDeCertidao } from 'src/app/models/tipo-de-certidao';
import { TipoDeCombustivel } from 'src/app/models/tipo-de-combustivel';
import { CertidaoService } from 'src/app/services/certidao.service';
import { CorDoVeiculoService } from 'src/app/services/cor-do-veiculo.service';
import { MarcaModeloDeVeiculoService } from 'src/app/services/marca-modelo-de-veiculo.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { PontoService } from 'src/app/services/ponto.service';
import { TipoDeCertidaoService } from 'src/app/services/tipo-de-certidao.service';
import { TipoDeCombustivelService } from 'src/app/services/tipo-de-combustivel.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';import { debounceTime, first } from 'rxjs/operators';
import { SearchData } from 'src/app/services/basic-crud.service';

@Component({
  selector: 'app-user-certidoes-crud',
  templateUrl: './user-certidoes-crud.component.html',
  styleUrls: ['./user-certidoes-crud.component.css']
})
export class UserCertidoesCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  tiposDeCertidao: TipoDeCertidao[];
  cores: CorDoVeiculo[];
  tiposDeCombustivel: TipoDeCombustivel[];
  pontos: Ponto[];

  subjectPermissionario: Subject<any> = new Subject();
  subjectMarcaModelo: Subject<any> = new Subject();

  permissionariosPesquisados: Map<String, String> = new Map();
  permissionarioSelecionado: Permissionario;

  marcasModelosPesquisados: Map<String, String> = new Map();
  marcasModelosSelecionado: MarcaModeloDeVeiculo;

  @ViewChild('permissionarioInput') permissionarioInputElement: ElementRef;
  @ViewChild('marcaModeloInput') marcaModeloInputElement: ElementRef;

  searchText: string = "";
  veiculosPesquisados: SearchData;

  crudObj: Certidao;

  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private certidaoService: CertidaoService,
    private permissionarioService: PermissionarioService,
    private veiculoService: VeiculoService,
    private tipoDeCertidaoService: TipoDeCertidaoService,
    private corService: CorDoVeiculoService,
    private marcaModeloVeiculoService: MarcaModeloDeVeiculoService,
    private tipoDeCombustivelService: TipoDeCombustivelService,
    private pontoService: PontoService,
    private location: Location,
    private route: ActivatedRoute,
    private toastr: ToastrService,
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
      this.cores = await this.corService.index().pipe(first()).toPromise();
      this.tiposDeCertidao = await this.tipoDeCertidaoService.index().pipe(first()).toPromise();
      this.pontos = await this.pontoService.index().pipe(first()).toPromise();

      const idSelected: string = this.route.snapshot.paramMap.get('id');

      ///////FORM
      this.form = this.formBuilder.group({
        data: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.datePattern)],
        }),
        placa: new FormControl("", {
          validators: [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
        }),
        renavam: new FormControl("", {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(11)],
        }),
        chassis: new FormControl("", {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
        }),
        ano_fabricacao: new FormControl("", {
          validators: [Validators.required, Validators.pattern(SharedModule.numberPatern)],
        }),
        prefixo: new FormControl("", {
          validators: [Validators.required, Validators.minLength(1), Validators.maxLength(15)],
        }),
        marca_modelo_veiculo: new FormControl(""),
        tipo_de_certidao_id: new FormControl("", {
          validators: [Validators.required],
        }),
        tipo_combustivel_id: new FormControl("", {
          validators: [Validators.required],
        }),
        cor_id: new FormControl("", {
          validators: [Validators.required],
        }),
        ponto_id: new FormControl("", {
          validators: [Validators.required],
        }),
        permissionario: new FormControl(""),
        observacao: new FormControl("", {
          validators: [Validators.maxLength(200)],
        }),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.certidaoService.get(parseInt(idSelected)).toPromise();
        this.permissionarioSelecionado = await this.permissionarioService.get(this.crudObj.permissionario_id).pipe(first()).toPromise();
        this.marcasModelosSelecionado = await this.marcaModeloVeiculoService.get(this.crudObj.permissionario_id).pipe(first()).toPromise();

        this.form.controls['data'].setValue(SharedModule.formatDateddMMyyyy(this.crudObj.data));
        this.form.controls['observacao'].setValue(this.crudObj.observacao);
        this.form.controls['ponto_id'].setValue(this.crudObj.ponto_id);
        this.form.controls['prefixo'].setValue(this.crudObj.prefixo);
        this.form.controls['placa'].setValue(this.crudObj.placa);
        this.form.controls['permissionario'].setValue(this.permissionarioSelecionado.nome_razao_social);
        this.form.controls['renavam'].setValue(this.crudObj.renavam);
        this.form.controls['chassis'].setValue(this.crudObj.chassis);
        this.form.controls['marca_modelo_veiculo'].setValue(this.marcasModelosSelecionado.descricao);
        this.form.controls['ano_fabricacao'].setValue(this.crudObj.ano_fabricacao);
        this.form.controls['tipo_combustivel_id'].setValue(this.crudObj.tipo_combustivel_id);
        this.form.controls['cor_id'].setValue(this.crudObj.cor_id);      }

    } catch (e: any) {
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      if (!this.permissionarioSelecionado) {
        this.toastr.error("Nenhum Permissionário selecionado!");
        this.loading = false;
        return;
      }

      if (!this.marcasModelosSelecionado) {
        this.toastr.error("Nenhum Marca/Modelo selecionado!");
        this.loading = false;
        return;
      }

      formInput.permissionario_id = this.permissionarioSelecionado.id;
      formInput.marca_modelo_veiculo_id = this.marcasModelosSelecionado.id;

      formInput.data = SharedModule.convertStringddMMyyyyToyyyyMMdd(formInput.data);

      if (this.crudObj) {
        await this.certidaoService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.certidaoService.create(formInput).toPromise();
      }
      this.toastr.success('Certidão salva!');
      this.location.back()
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  async excluir() {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.certidaoService.delete(this.crudObj.id).toPromise();
      this.modal.dismissAll()
      this.toastr.success('Excluido com Sucesso!');
      this.location.back()
    } catch (e: any) {
      this.modal.dismissAll()
      this.errorMessage = "Este não pode ser excluido!";
    }
    this.loading = false;
  }

  async searchVeiculo(text: string = '', page: number = 1){
    this.loading = true;
    try {
      page = this.searchText!==text?1:page;
      this.searchText = text;

      this.veiculosPesquisados = await this.veiculoService.search(this.searchText, page).toPromise();
    } catch (e) {
      this.veiculosPesquisados = null;
    }
    this.loading = false;
  }

  public changePosVeiculosPaginate(page: number){
    this.searchVeiculo(this.searchText, page);
  }

  async selecionarVeiculo(id: string){
    this.loading = true;
    try {
      const veiculo: Veiculo = await this.veiculoService.get(id).pipe(first()).toPromise();
      this.permissionarioSelecionado = await this.permissionarioService.get(veiculo.permissionario_id).pipe(first()).toPromise();
      this.marcasModelosSelecionado = await this.marcaModeloVeiculoService.get(veiculo.marca_modelo_veiculo_id).pipe(first()).toPromise();

      this.form.controls['placa'].setValue(veiculo.placa);
      this.form.controls['permissionario'].setValue(this.permissionarioSelecionado.nome_razao_social);
      this.form.controls['renavam'].setValue(veiculo.cod_renavam);
      this.form.controls['chassis'].setValue(veiculo.chassi);
      this.form.controls['marca_modelo_veiculo'].setValue(this.marcasModelosSelecionado.descricao);
      this.form.controls['ano_fabricacao'].setValue(veiculo.ano_fabricacao);
      this.form.controls['tipo_combustivel_id'].setValue(veiculo.tipo_combustivel_id);
      this.form.controls['cor_id'].setValue(veiculo.cor_id);

      this.closeModal(null);

    } catch (e) {
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
      this.toastr.error("Ocorreu um erro ao pesquisar.");
    }
  }

  public keyUpPermissionario() {
    this.subjectPermissionario.next(null);
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
      this.toastr.error("Ocorreu um erro ao pesquisar.");
    }
  }

  public keyUpMarcaModelo() {
    this.subjectMarcaModelo.next(null);
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
