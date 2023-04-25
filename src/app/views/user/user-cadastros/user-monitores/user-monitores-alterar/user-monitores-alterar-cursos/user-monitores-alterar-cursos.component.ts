import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { CursoDoMonitor } from 'src/app/models/curso-do-monitor';
import { Monitor } from 'src/app/models/monitor';
import { TipoDeCurso } from 'src/app/models/tipo-de-curso';
import { CursoDoMonitorService } from 'src/app/services/curso-do-monitor.service';
import { MonitorService } from 'src/app/services/monitor.service';
import { TipoDeCursoService } from 'src/app/services/tipo-de-curso.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-monitores-alterar-cursos',
  templateUrl: './user-monitores-alterar-cursos.component.html',
  styleUrls: ['./user-monitores-alterar-cursos.component.css']
})
export class UserMonitoresAlterarCursosComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  monitor: Monitor;

  tiposDeCurso: TipoDeCurso[];
  cursosDoMonitor: CursoDoMonitor[];

  cursoParaDelecao: string;

  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private monitorService: MonitorService,
    private tipodeCursoService: TipoDeCursoService,
    private cursoDoMonitorService: CursoDoMonitorService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modal: NgbModal,
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = "";
    try {
      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.monitor = await this.monitorService.get(idSelected).pipe(first()).toPromise();

      this.tiposDeCurso = await this.tipodeCursoService.index().pipe(first()).toPromise();

      await this.loadCursos(this.monitor);

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
      console.error(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  private async loadCursos(monitor: Monitor) {

    const { data } =
      await this.cursoDoMonitorService.indexByCondutor(monitor.id.toString()).pipe(first()).toPromise();

    data.forEach(obj => obj.d_descricao_do_tipo = this.findTipoDeCurso(obj.tipo_do_curso_id).descricao);

    this.cursosDoMonitor = data;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      formInput.monitor_id = this.monitor.id;

      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      await this.cursoDoMonitorService.create(formInput).pipe(first()).toPromise();

      this.loadCursos(this.monitor);

      this.toastr.success('Curso salvo!');
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
      await this.cursoDoMonitorService.delete(this.cursoParaDelecao).pipe(first()).toPromise();

      this.loadCursos(this.monitor);

      this.toastr.success('Curso deletado!');
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
