import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { Aplicativo } from 'src/app/models/aplicativo';
import { AplicativoDoPermissionario } from 'src/app/models/aplicativo-do-permissionario';
import { Permissionario } from 'src/app/models/permissionario';
import { AplicativoDoPermissionarioService } from 'src/app/services/aplicativo-do-permissinario.service';
import { AplicativoService } from 'src/app/services/aplicativo.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-permissionario-alterar-aplicativos',
  templateUrl: './user-permissionario-alterar-aplicativos.component.html',
  styleUrls: ['./user-permissionario-alterar-aplicativos.component.css']
})
export class UserPermissionarioAlterarAplicativosComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  permissionario: Permissionario;

  aplicativos: Aplicativo[];
  aplicativosDoPermissionario: AplicativoDoPermissionario[];

  idParaDelecao: string;

  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private permissionarioService: PermissionarioService,
    private aplicativoCursoService: AplicativoService,
    private aplicativoDoPermissionarioService: AplicativoDoPermissionarioService,
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

      this.aplicativos = await this.aplicativoCursoService.index().pipe(first()).toPromise();

      await this.load(this.permissionario);

      ///////FORM
      this.form = this.formBuilder.group({
        aplicativo_id: new FormControl("", {
          validators: [Validators.required],
        }),
      });
    } catch (e: any) {
      console.error(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  private async load(permissionario: Permissionario) {

    const { data } =
      await this.aplicativoDoPermissionarioService.indexByPermissionario(permissionario.id.toString()).pipe(first()).toPromise();

    data.forEach(obj => obj.d_descricao = this.findAplicativo(obj.aplicativo_id).descricao);

    this.aplicativosDoPermissionario = data;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      formInput.permissionario_id = this.permissionario.id;

      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      await this.aplicativoDoPermissionarioService.create(formInput).pipe(first()).toPromise();

      this.load(this.permissionario);

      this.snackbarService.openSnackBarSucess('Aplicativo salvo!');
      this.form.reset();
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }


  setAplicativoParaDelecao(id: string) {
    this.idParaDelecao = id;
  }

  findAplicativo(id: string): Aplicativo {
    if (this.aplicativos && id)
      return this.aplicativos.filter(t => t.id == id)[0];
  }

  async deletarAplicativoDoPermissionario() {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.aplicativoDoPermissionarioService.delete(this.idParaDelecao).pipe(first()).toPromise();

      this.load(this.permissionario);

      this.snackbarService.openSnackBarSucess('Aplicativo deletado!');
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
