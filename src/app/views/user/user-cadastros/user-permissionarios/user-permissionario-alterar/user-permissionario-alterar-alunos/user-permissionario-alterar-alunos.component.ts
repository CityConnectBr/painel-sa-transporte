import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AlunoDoPermissionario } from 'src/app/models/aluno-do-permissionario';
import { Permissionario } from 'src/app/models/permissionario';

import { Ponto } from 'src/app/models/ponto';
import { AlunoDoPermissionarioService } from 'src/app/services/aluno-do-permissionario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { PontoService } from 'src/app/services/ponto.service';
import { SharedModule } from 'src/app/shared/shared-module';

@Component({
  selector: 'app-user-permissionario-alterar-alunos',
  templateUrl: './user-permissionario-alterar-alunos.component.html',
  styleUrls: ['./user-permissionario-alterar-alunos.component.css'],
})
export class UserPermissionarioAlterarAlunosComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  errorMessage: string;

  permissionario: Permissionario;

  pontos: Ponto[];
  alunosDoPermissionario: AlunoDoPermissionario[];

  alunoParaDelecao: string;

  alunoParaEdicao: AlunoDoPermissionario;

  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private permissionarioService: PermissionarioService,
    private alunoService: AlunoDoPermissionarioService,
    private pontoService: PontoService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modal: NgbModal
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = '';
    try {
      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.permissionario = await this.permissionarioService
        .get(idSelected)
        .pipe(first())
        .toPromise();

      this.pontos = await this.pontoService.index().pipe(first()).toPromise();

      await this.loadAlunos(this.permissionario);

      ///////FORM
      this.form = this.formBuilder.group({
        nome: new FormControl('', {
          validators: [Validators.required, Validators.maxLength(40)],
        }),
        data_nascimento: new FormControl('', {
          validators: [],
        }),
        telefone: new FormControl('', {
          validators: [Validators.pattern(SharedModule.telefonePattern)],
        }),
        hora_entrada: new FormControl('', {
          validators: [],
        }),
        hora_saida: new FormControl('', {
          validators: [],
        }),
        email: new FormControl('', {
          validators: [Validators.maxLength(200)],
        }),
        ponto_id: new FormControl('', {
          validators: [],
        }),
      });
    } catch (e: any) {
      console.error(e);
      this.errorMessage = 'Ocorreu um erro ao montar a página';
    }
    this.loading = false;
  }

  private async loadAlunos(permissionario: Permissionario) {
    const { data } = await this.alunoService
      .indexByPermissionario(permissionario.id.toString())
      .pipe(first())
      .toPromise();

    this.alunosDoPermissionario = data;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = '';
    try {
      formInput.permissionario_id = this.permissionario.id;

      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      if (this.alunoParaEdicao) {
        await this.alunoService
          .update(this.alunoParaEdicao.id, formInput)
          .pipe(first())
          .toPromise();
        this.toastr.success('Aluno atualizado!');
      } else {
        await this.alunoService.create(formInput).pipe(first()).toPromise();
        this.toastr.success('Aluno salvo!');
      }

      this.loadAlunos(this.permissionario);

      this.form.reset();
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  setAlunoParaDelecao(id: string) {
    this.alunoParaDelecao = id;
  }

  findPonto(id: string): Ponto {
    if (this.pontos && id) return this.pontos.filter((t) => t.id == id)[0];
  }

  async deletarAluno() {
    this.loading = true;
    this.errorMessage = '';
    try {
      await this.alunoService
        .delete(this.alunoParaDelecao)
        .pipe(first())
        .toPromise();

      this.loadAlunos(this.permissionario);

      this.toastr.success('Aluno deletado!');
      this.closeModal(null);
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  setAlunoParaEdicao(alunoId: string) {
    this.alunoParaEdicao = this.alunosDoPermissionario.filter(
      (t) => t.id == alunoId
    )[0];
    this.form.patchValue(this.alunoParaEdicao);
  }

  closeModal(event: any) {
    return this.modal.dismissAll();
  }

  openModal(content: any) {
    this.modal.open(content);
  }
}
