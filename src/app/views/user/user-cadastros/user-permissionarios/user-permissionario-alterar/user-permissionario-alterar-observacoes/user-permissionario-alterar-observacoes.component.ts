import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { ObservacaoDoPermissionario } from 'src/app/models/observacao-do-permissionario';
import { Permissionario } from 'src/app/models/permissionario';
import { ObservacaoDoPermissionarioService } from 'src/app/services/observacao-do-permissinario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-permissionario-alterar-observacoes',
  templateUrl: './user-permissionario-alterar-observacoes.component.html',
  styleUrls: ['./user-permissionario-alterar-observacoes.component.css']
})
export class UserPermissionarioAlterarObservacoesComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  permissionario: Permissionario;

  observacoesDoPermissionario: ObservacaoDoPermissionario[];

  idParaDelecao: String;

  constructor(
    private formBuilder: FormBuilder,
    private permissionarioService: PermissionarioService,
    private observacaoDoPermissionarioService: ObservacaoDoPermissionarioService,
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

      await this.loadCursos(this.permissionario);

      ///////FORM
      this.form = this.formBuilder.group({
        titulo: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
        }),
        observacao: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
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
      await this.observacaoDoPermissionarioService.indexByPermissionario(permissionario.id.toString()).pipe(first()).toPromise();

    this.observacoesDoPermissionario = data;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      formInput.permissionario_id = this.permissionario.id;

      await this.observacaoDoPermissionarioService.create(formInput).pipe(first()).toPromise();

      this.loadCursos(this.permissionario);

      this.snackbarService.openSnackBarSucess('Observação salvo!');
      this.form.reset();
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }


  setIdParaDelecao(id: String) {
    this.idParaDelecao = id;
  }

  async deletar() {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.observacaoDoPermissionarioService.delete(this.idParaDelecao).pipe(first()).toPromise();

      this.loadCursos(this.permissionario);

      this.snackbarService.openSnackBarSucess('Observação deletada!');
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
