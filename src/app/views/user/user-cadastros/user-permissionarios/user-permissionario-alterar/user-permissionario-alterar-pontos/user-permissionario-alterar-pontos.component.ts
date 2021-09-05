import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Modalidade } from 'src/app/models/modalidade';
import { Permissionario } from 'src/app/models/permissionario';
import { Ponto } from 'src/app/models/ponto';
import { PontoDoPermissionario } from 'src/app/models/ponto-do-permissionario';
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

  pontoDoPermissionario: PontoDoPermissionario;

  subjectPonto: Subject<any> = new Subject();
  pontoSelecionado: Ponto;

  pontosPesquisados: String[] = [];

  pontos: Ponto[];
  pontosDoPermissionario: PontoDoPermissionario[];

  modalidades: Modalidade[];

  constructor(
    private formBuilder: FormBuilder,
    private pontosDoPermissionarioService: PontoDoPermissionarioService,
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

      this.pontos = await this.pontoService.index().pipe(first()).toPromise();
      this.modalidades = await this.modalidadeService.index().pipe(first()).toPromise();

      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.permissionario = await this.permissionarioService.get(idSelected).pipe(first()).toPromise();

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
      })

      this.formPonto = this.formBuilder.group({
        ponto_descricao: new FormControl('', {
          validators: [Validators.required],
        }),
      })

    } catch (e: any) {
      console.log(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {

      await this.permissionarioService.updateModalidade(this.permissionario.id, formInput).toPromise();
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

      this.pontosPesquisados = result.data.map((ponto: Ponto) => ponto.descricao);
    } catch (e: any) {
      this.snackbarService.openSnackBarError("Ocorreu um erro ao pesquisar.");
    }
  }

  public keyUpPonto() {
    this.subjectPonto.next();
  }

  public setPonto(event) {
    if (event) {
      this.pontoSelecionado = event;
      this.formPonto.controls['ponto_descricao'].setValue(this.pontoSelecionado.descricao);
    }
  }

  public setFocusPontoInput(focus: boolean) {
    if (focus) {
      this.searchPonto();
    }
  }

  addPonto(id: string){
    this.pontosDoPermissionario.push({id: null, ponto_id: id, permissionario_id: this.permissionario.id});
  }

  findPonto(id: string): Ponto{
    return;// this.po
  }
}
