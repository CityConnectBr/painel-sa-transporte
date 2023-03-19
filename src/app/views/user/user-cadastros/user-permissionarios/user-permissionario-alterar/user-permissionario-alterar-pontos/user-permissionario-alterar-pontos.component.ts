import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { EntidadeAssociativa } from 'src/app/models/entidade-associativa';
import { Modalidade } from 'src/app/models/modalidade';
import { Permissionario } from 'src/app/models/permissionario';
import { Ponto } from 'src/app/models/ponto';
import { PontoDoPermissionario } from 'src/app/models/ponto-do-permissionario';
import { EntidadeAssociativaService } from 'src/app/services/entidade-associativa.service';
import { ModalidadeService } from 'src/app/services/modalidade.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { PontoService } from 'src/app/services/ponto.service';
import { PontoDoPermissionarioService } from 'src/app/services/pontodopermissinario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-permissionario-alterar-pontos',
  templateUrl: './user-permissionario-alterar-pontos.component.html',
  styleUrls: ['./user-permissionario-alterar-pontos.component.css']
})
export class UserPermissionarioAlterarPontosComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  formPonto: FormGroup
  errorMessage: string

  permissionario: Permissionario;

  subjectPonto: Subject<any> = new Subject();
  pontoSelecionado: Ponto;

  pontosPesquisados: Map<String, String> = new Map();
  pontosPesquisadosObj: Ponto[] = [];

  pontosDoPermissionario: Ponto[] = [];
  entidadesAssociativa: EntidadeAssociativa[] = [];

  modalidades: Modalidade[];

  constructor(
    private formBuilder: FormBuilder,
    private pontosDoPermissionarioService: PontoDoPermissionarioService,
    private entidadeAssociativaService: EntidadeAssociativaService,
    private permissionarioService: PermissionarioService,
    private pontoService: PontoService,
    private modalidadeService: ModalidadeService,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = "";
    try {
      //pesquisa municipio
      this.subjectPonto
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.searchPonto();
        }
        );

      this.modalidades = await this.modalidadeService.index().pipe(first()).toPromise();
      this.entidadesAssociativa = await this.entidadeAssociativaService.index().pipe(first()).toPromise();

      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.permissionario = await this.permissionarioService.get(idSelected).pipe(first()).toPromise();

      await this.loadPontos();

      ///////FORM
      this.form = this.formBuilder.group({
        modalidade_id: new FormControl(this.permissionario.modalidade_id, {
          validators: [Validators.required],
        }),
        prefixo: new FormControl(this.permissionario.prefixo, {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
        }),
        inss: new FormControl(this.permissionario.inss, {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }),
        entidade_associativa_id: new FormControl(this.permissionario.entidade_associativa_id, {
          validators: [Validators.required],
        }),
      })

      this.formPonto = this.formBuilder.group({
        ponto_descricao: new FormControl('',),
      })

    } catch (e: any) {
      console.error(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  async loadPontos(){
    try{
      this.pontosDoPermissionario = (await this.pontosDoPermissionarioService
        .indexByPermissionario(this.permissionario.id).pipe(first()).toPromise())
        .data.map((p: PontoDoPermissionario) => p.ponto);
    }catch (e: any) {}
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {

      //Sanvando dados
      await this.permissionarioService.updateModalidade(this.permissionario.id, formInput).toPromise();

      //Pontos
      const pontosDoPermissionarioCadastrados = (await this.pontosDoPermissionarioService.indexByPermissionario(this.permissionario.id).pipe(first()).toPromise()).data;

      pontosDoPermissionarioCadastrados.forEach(async (pp: PontoDoPermissionario) => {
        let indexPontoAchado: number = null;
        this.pontosDoPermissionario.forEach((p: Ponto, i) => { if (p.id == pp.ponto_id) indexPontoAchado = i });

        //removendo ponto para nao cadastrar duplicado
        if (indexPontoAchado!==null) {
          this.pontosDoPermissionario.splice(indexPontoAchado, 1);
        } else {
          //removendo da base ponto nao encontrado
          await this.pontosDoPermissionarioService.delete(pp.id).pipe(first()).toPromise();
        }
      });

      this.pontosDoPermissionario.forEach(async (p: Ponto) => await this.pontosDoPermissionarioService.create({ permissionario_id: this.permissionario.id, ponto_id: p.id }).pipe(first()).toPromise());

      await this.loadPontos();

      this.snackbarService.openSnackBarSucess('Permissionário salvo!');
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  public async searchPonto() {
    try {
      this.pontoSelecionado = null;
      const result = await this.pontoService
        .search(this.formPonto.controls['ponto_descricao'].value)
        .pipe(first())
        .toPromise();

      this.pontosPesquisados.clear();
      result.data.forEach((ponto: Ponto) => {
        this.pontosPesquisados.set(`${ponto.id}`, ponto.descricao);
      });
    } catch (e: any) {
      this.snackbarService.openSnackBarError("Ocorreu um erro ao pesquisar.");
    }
  }

  public keyUpPonto() {
    this.subjectPonto.next(null);
  }

  public async setPonto(event) {
    try {
      if (event) {
        this.formPonto.controls['ponto_descricao'].setValue("Carregando...");
        this.pontoSelecionado = await this.pontoService.get(event).pipe(first()).toPromise();
        this.formPonto.controls['ponto_descricao'].setValue(this.pontoSelecionado.descricao);
      }
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
  }

  public setFocusPontoInput(focus: boolean) {
    if (focus) {
      this.searchPonto();
    }
  }

  async addPonto() {
    if (!this.pontoSelecionado) {
      this.snackbarService.openSnackBarError("Nenhum Pontos selecionado!");
      return;
    }

    if (this.pontosDoPermissionario.filter((p: Ponto) => p.id == this.pontoSelecionado.id).length > 0) {
      this.snackbarService.openSnackBarError("Ponto já existe esta cadastrado.");
      return;
    }

    this.pontosDoPermissionario.push(await this.pontoService.get(this.pontoSelecionado.id).pipe(first()).toPromise());

    this.formPonto.controls['ponto_descricao'].setValue("");
    this.formPonto.reset();
    this.pontoSelecionado = null;
  }

  removePonto(index: number) {
    this.pontosDoPermissionario.splice(index, 1);
  }

}
