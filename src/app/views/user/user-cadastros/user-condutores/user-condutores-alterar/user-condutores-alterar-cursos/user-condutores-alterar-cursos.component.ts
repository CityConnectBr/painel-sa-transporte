import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { Condutor } from 'src/app/models/condutores';
import { CursoDoCondutor } from 'src/app/models/curso-do-condutor';
import { TipoDeCurso } from 'src/app/models/tipo-de-curso';
import { CondutorService } from 'src/app/services/condutor.service';
import { CursoDoCondutorService } from 'src/app/services/curso-do-condutor.service';
import { TipoDeCursoService } from 'src/app/services/tipo-de-curso.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-condutores-alterar-cursos',
  templateUrl: './user-condutores-alterar-cursos.component.html',
  styleUrls: ['./user-condutores-alterar-cursos.component.css']
})
export class UserCondutoresAlterarCursosComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  condutor: Condutor;

  tiposDeCurso: TipoDeCurso[];
  cursosDoCondutor: CursoDoCondutor[];

  cursoParaDelecao: string;

  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private condutorService: CondutorService,
    private tipodeCursoService: TipoDeCursoService,
    private cursoDoCondutorService: CursoDoCondutorService,
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
      this.condutor = await this.condutorService.get(idSelected).pipe(first()).toPromise();

      this.tiposDeCurso = await this.tipodeCursoService.index().pipe(first()).toPromise();

      await this.loadCursos(this.condutor);

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
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  private async loadCursos(condutor: Condutor) {

    const { data } =
      await this.cursoDoCondutorService.indexByCondutor(condutor.id.toString()).pipe(first()).toPromise();

    data.forEach(obj => obj.d_descricao_do_tipo = this.findTipoDeCurso(obj.tipo_do_curso_id).descricao);

    this.cursosDoCondutor = data;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      formInput.condutor_id = this.condutor.id;

      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      await this.cursoDoCondutorService.create(formInput).pipe(first()).toPromise();

      this.loadCursos(this.condutor);

      this.snackbarService.openSnackBarSucess('Curso salvo!');
      this.form.reset();
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }


  setCursoParaDelecao(id: string) {
    this.cursoParaDelecao = id;
  }

  findTipoDeCurso(id: string): TipoDeCurso {
    if (this.tiposDeCurso && id)
      return this.tiposDeCurso.filter(t => t.id == id)[0];
  }

  async deletarCurso() {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.cursoDoCondutorService.delete(this.cursoParaDelecao).pipe(first()).toPromise();

      this.loadCursos(this.condutor);

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
