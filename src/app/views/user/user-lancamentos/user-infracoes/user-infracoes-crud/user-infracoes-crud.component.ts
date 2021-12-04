import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Veiculo } from 'src/app/models/veiculo';
import { MarcaModeloDeVeiculo } from 'src/app/models/marca-modelo-de-veiculo';
import { Permissionario } from 'src/app/models/permissionario';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';
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

@Component({
  selector: 'app-user-infracoes-crud',
  templateUrl: './user-infracoes-crud.component.html',
  styleUrls: ['./user-infracoes-crud.component.css']
})
export class UserInfracoesCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  subjectPermissionario: Subject<any> = new Subject();

  moedas: Moeda[];
  naturezas: NaturezaDaInfracao[];

  permissionariosPesquisados: Map<String, String> = new Map();
  permissionarioSelecionado: Permissionario;
  quadroDeInfracoesSelecionado: QuadroDeInfracoes;

  @ViewChild('permissionarioInput') permissionarioInputElement: ElementRef;

  searchText: string = "";
  quadroDeInfracoesPesquisado: SearchData;

  crudObj: Infracao;

  maskDate = SharedModule.textMaskDate;
  maskHour = SharedModule.textMaskHour;

  constructor(
    private formBuilder: FormBuilder,
    private infracaoService: InfracaoService,
    private moedaService: MoedaService,
    private permissionarioService: PermissionarioService,
    private quadroDeInfracoesService: QuadroDeInfracoesService,
    private naturezaDaInfracaoService: NaturezaDaInfracaoService,
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

      const idSelected: string = this.route.snapshot.paramMap.get('id');

      this.moedas = await this.moedaService.index().pipe(first()).toPromise();
      this.naturezas = await this.naturezaDaInfracaoService.index().pipe(first()).toPromise();

      ///////FORM
      this.form = this.formBuilder.group({
        num_aip: new FormControl("", {
          validators: [Validators.required, Validators.minLength(1), Validators.maxLength(11)],
        }),
        data_infracao: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.datePattern)],
        }),
        hora_infracao: new FormControl("", {
          validators: [Validators.required, Validators.pattern(SharedModule.hourPattern)],
        }),
        obs_aip: new FormControl("", {
          validators: [Validators.maxLength(500)],
        }),
        descricao: new FormControl("", {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
        }),
        acao_tomada: new FormControl("", {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
        }),
        num_processo: new FormControl("", {
          validators: [Validators.required, Validators.minLength(1), Validators.maxLength(15)],
        }),
        num_boleto: new FormControl("", {
          validators: [Validators.required, Validators.minLength(1), Validators.maxLength(15)],
        }),
        data_vendimento_boleto: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.datePattern)],
        }),
        qtd_moeda: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.numberPatern)],
        }),
        valor_moeda: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.numberPatern)],
        }),
        moeda_id: new FormControl(""),
        natureza_infracao_id: new FormControl("", {
          validators: [Validators.required],
        }),
        quadro_infracao: new FormControl("", {
          validators: [Validators.required],
        }),
        permissionario: new FormControl(""),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.infracaoService.get(parseInt(idSelected)).toPromise();
        this.permissionarioSelecionado = await this.permissionarioService.get(this.crudObj.permissionario_id).pipe(first()).toPromise();
        this.quadroDeInfracoesSelecionado = await this.quadroDeInfracoesService.get(this.crudObj.quadro_infracao_id).pipe(first()).toPromise();

        this.crudObj = SharedModule.formatAllFieldsDateToddMMyyyy(this.crudObj);

        this.form.controls['num_aip'].setValue(this.crudObj.num_aip);
        this.form.controls['data_infracao'].setValue(this.crudObj.data_infracao);
        this.form.controls['hora_infracao'].setValue(SharedModule.formatHourFromAPIToHHmm(this.crudObj.hora_infracao.toString()));
        this.form.controls['obs_aip'].setValue(this.crudObj.obs_aip);
        this.form.controls['descricao'].setValue(this.crudObj.descricao);
        this.form.controls['acao_tomada'].setValue(this.crudObj.acao_tomada);
        this.form.controls['num_processo'].setValue(this.crudObj.num_processo);
        this.form.controls['num_boleto'].setValue(this.crudObj.num_boleto);
        this.form.controls['data_vendimento_boleto'].setValue(this.crudObj.data_vendimento_boleto);
        this.form.controls['qtd_moeda'].setValue(this.crudObj.qtd_moeda);
        this.form.controls['valor_moeda'].setValue(this.crudObj.valor_moeda);
        this.form.controls['moeda_id'].setValue(this.crudObj.moeda_id);
        this.form.controls['natureza_infracao_id'].setValue(this.crudObj.natureza_infracao_id);
        this.form.controls['quadro_infracao'].setValue(this.quadroDeInfracoesSelecionado.descricao);
        this.form.controls['permissionario'].setValue(this.permissionarioSelecionado.nome_razao_social);

      }

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
        this.snackbarService.openSnackBarError("Nenhum Permissionário selecionado!");
        this.loading = false;
        return;
      }

      if (!this.quadroDeInfracoesSelecionado) {
        this.snackbarService.openSnackBarError("Nenhum Quadro de Infração selecionado!");
        this.loading = false;
        return;
      }


      formInput.permissionario_id = this.permissionarioSelecionado.id;
      formInput.quadro_infracao_id = this.quadroDeInfracoesSelecionado.id;

      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      if (this.crudObj) {
        await this.infracaoService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.infracaoService.create(formInput).toPromise();
      }
      this.snackbarService.openSnackBarSucess('Infração salva!');
      this.location.back()
    } catch (e: any) {
      console.error(e);
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  async excluir() {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.infracaoService.delete(this.crudObj.id).toPromise();
      this.modal.dismissAll()
      this.snackbarService.openSnackBarSucess('Excluido com Sucesso!');
      this.location.back()
    } catch (e: any) {
      this.modal.dismissAll()
      this.errorMessage = "Este não pode ser excluido!";
    }
    this.loading = false;
  }

  async searchQuadroDeInfracoes(text: string = '', page: number = 1){
    this.loading = true;
    try {
      page = this.searchText!==text?1:page;
      this.searchText = text;

      this.quadroDeInfracoesPesquisado = await this.quadroDeInfracoesService.search(this.searchText, page).toPromise();
    } catch (e) {
      this.quadroDeInfracoesPesquisado = null;
    }
    this.loading = false;
  }

  public changePosQuadroPaginate(page: number){
    this.searchQuadroDeInfracoes(this.searchText, page);
  }

  async selecionarQuadro(id: String){
    this.loading = true;
    try {
      this.quadroDeInfracoesSelecionado = await this.quadroDeInfracoesService.get(id).pipe(first()).toPromise();

      this.form.controls['quadro_infracao'].setValue(this.quadroDeInfracoesSelecionado.descricao);

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

}