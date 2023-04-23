import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { CoordenadorDoPonto } from 'src/app/models/coordenador-do-ponto';
import { Permissionario } from 'src/app/models/permissionario';
import { Ponto } from 'src/app/models/ponto';
import { CoordenadorDoPontoService } from 'src/app/services/coordenador-do-ponto.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { PontoService } from 'src/app/services/ponto.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-pontos-alterar-coordenador',
  templateUrl: './user-pontos-alterar-coordenador.component.html',
  styleUrls: ['./user-pontos-alterar-coordenador.component.css']
})
export class UserPontosAlterarCoordenadorComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  permissionarioDoCoordenador: Permissionario;

  subjectPermissionario: Subject<any> = new Subject();

  permissionariosPesquisados: Map<String, String> = new Map();
  permissionarioSelecionado: Permissionario;

  ponto: Ponto;

  coordenadoresDoPonto: CoordenadorDoPonto[];

  coordenadorAtual: CoordenadorDoPonto;

  cursoParaDelecao: string;

  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private coordenadoresDoPontoService: CoordenadorDoPontoService,
    private permissionarioService: PermissionarioService,
    private pontoService: PontoService,
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

      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.ponto = await this.pontoService.get(idSelected).pipe(first()).toPromise();

      ///////FORM
      this.form = this.formBuilder.group({
        data_inicial: new FormControl("", {
          validators: [Validators.required, Validators.pattern(SharedModule.datePattern)],
        }),
        data_termino: new FormControl("", {
          validators: [Validators.pattern(SharedModule.datePattern)],
        }),
        observacao: new FormControl("", {
          validators: [Validators.maxLength(500)],
        }),
        permissionario: new FormControl("", {
          validators: [],
        }),
      });

      await this.loadData(this.ponto);

    } catch (e: any) {
      console.error(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  ngOnDestroy() {
    this.subjectPermissionario.unsubscribe();
  }

  private async loadData(ponto: Ponto) {

    const { data } =
      await this.coordenadoresDoPontoService.indexByPonto(ponto.id.toString()).pipe(first()).toPromise();

    this.coordenadoresDoPonto = data;

    ///////SET IN FORM
    if (this.coordenadoresDoPonto.length > 0) {
      this.coordenadorAtual = SharedModule.formatAllFieldsDateToddMMyyyy(this.coordenadoresDoPonto[0]);
      this.permissionarioSelecionado = await this.permissionarioService.get(this.coordenadorAtual.permissionario_id).pipe(first()).toPromise();

      this.coordenadoresDoPonto.splice(0, 1);

      this.form.controls['data_inicial'].setValue(this.coordenadorAtual.data_inicial);
      this.form.controls['data_termino'].setValue(this.coordenadorAtual.data_termino);
      this.form.controls['observacao'].setValue(this.coordenadorAtual.observacao);
      this.form.controls['permissionario'].setValue(this.permissionarioSelecionado.nome_razao_social);
    }

  }

  async novo(formInput: any) {
    await this.salvar(formInput, true);
  }

  async salvar(formInput: any, terminarCoordenador: boolean = false) {
    this.loading = true;
    this.errorMessage = "";
    try {
      if (terminarCoordenador && (formInput.data_termino == null || formInput.data_termino == '')) {
        this.snackbarService.openSnackBarError("Data de término vazia!");
        return;
      }

      if (!this.permissionarioSelecionado) {
        this.snackbarService.openSnackBarError("Nenhum Permissionário selecionado!");
        this.loading = false;
        return;
      }

      formInput.ponto_id = this.ponto.id;
      formInput.permissionario_id = this.permissionarioSelecionado.id;

      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      if (this.coordenadorAtual && this.coordenadorAtual.id) {
        await this.coordenadoresDoPontoService.update(this.coordenadorAtual.id, formInput).pipe(first()).toPromise();
      } else {
        await this.coordenadoresDoPontoService.create(formInput).pipe(first()).toPromise();
      }

      if (!terminarCoordenador) {
        this.loadData(this.ponto);
        this.snackbarService.openSnackBarSucess('Coordenador salvo!');
      } else {
        this.coordenadorAtual = null;
      }

      this.form.reset();
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    } finally {
      this.loading = false;
    }
  }


  setCursoParaDelecao(id: string) {
    this.cursoParaDelecao = id;
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

  closeModal(event: any) {
    return this.modal.dismissAll()
  }

  openModal(content: any) {
    this.modal.open(content)
  }

}
