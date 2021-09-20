import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { CursoDoPermissionario } from 'src/app/models/curso-do-permissionario';
import { Permissionario } from 'src/app/models/permissionario';
import { TipoDeCurso } from 'src/app/models/tipo-de-curso';
import { CursoDoPermissionarioService } from 'src/app/services/curso-do-permissionario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { TipoDeCursoService } from 'src/app/services/tipo-de-curso.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-permissionario-alterar-cursos',
  templateUrl: './user-permissionario-alterar-cursos.component.html',
  styleUrls: ['./user-permissionario-alterar-cursos.component.css']
})
export class UserPermissionarioAlterarCursosComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  permissionario: Permissionario;

  tiposDeCurso: TipoDeCurso[];
  cursosDoPermissionario: CursoDoPermissionario[];

  cursoParaDelecao: String;

  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private permissionarioService: PermissionarioService,
    private tipodeCursoService: TipoDeCursoService,
    private cursoDoPermissionarioService: CursoDoPermissionarioService,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
    private modal: NgbModal,
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = "";
    try {
      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.permissionario = await this.permissionarioService.get(idSelected).pipe(first()).toPromise();

      this.tiposDeCurso = await this.tipodeCursoService.index().pipe(first()).toPromise();

      await this.loadCursos(this.permissionario);

      ///////FORM
      this.form = this.formBuilder.group({
        tipo_do_curso_id: new FormControl("", {
          validators: [Validators.required],
        }),
        data_emissao: new FormControl("", {
          validators: [Validators.required],
        }),
      });
    } catch (e: any) {
      console.log(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  private async loadCursos(permissionario: Permissionario) {

    const { data } =
      await this.cursoDoPermissionarioService.indexByPermissionario(permissionario.id.toString()).pipe(first()).toPromise();

    data.forEach(obj => obj.d_descricao_do_tipo = this.findTipoDeCurso(obj.tipo_do_curso_id).descricao);

    this.cursosDoPermissionario = data;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      formInput.permissionario_id = this.permissionario.id;

      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      await this.cursoDoPermissionarioService.create(formInput).pipe(first()).toPromise();

      this.loadCursos(this.permissionario);

      this.snackbarService.openSnackBarSucess('Curso salvo!');
      this.form.reset();
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }


  setCursoParaDelecao(id: String) {
    this.cursoParaDelecao = id;
  }

  findTipoDeCurso(id: String): TipoDeCurso {
    if (this.tiposDeCurso && id)
      return this.tiposDeCurso.filter(t => t.id == id)[0];
  }

  async deletarCurso() {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.cursoDoPermissionarioService.delete(this.cursoParaDelecao).pipe(first()).toPromise();

      this.loadCursos(this.permissionario);

      this.snackbarService.openSnackBarSucess('Curso deletado!');
      this.closeModal(null);
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

}
