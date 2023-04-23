import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { AnexoDoPermissionario } from 'src/app/models/anexo-do-permissionario';
import { Permissionario } from 'src/app/models/permissionario';
import { AnexoDoPermissionarioService } from 'src/app/services/anexo-do-permissionario.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-permissionario-alterar-anexos',
  templateUrl: './user-permissionario-alterar-anexos.component.html',
  styleUrls: ['./user-permissionario-alterar-anexos.component.css']
})
export class UserPermissionarioAlterarAnexosComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  permissionario: Permissionario;

  anexosDoPermissionario: AnexoDoPermissionario[];

  fileToUpload: File | null = null;

  idParaDelecao: string;

  constructor(
    private formBuilder: FormBuilder,
    private permissionarioService: PermissionarioService,
    private anexoDoPermissionarioService: AnexoDoPermissionarioService,
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

      await this.load();

      ///////FORM
      this.form = this.formBuilder.group({
        file: new FormControl("", {
          validators: [Validators.required],
        }),
        descricao: new FormControl("", {
          validators: [Validators.required, Validators.maxLength(60)],
        }),
      });
    } catch (e: any) {
      console.error(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  private async load() {

    const { data } =
      await this.anexoDoPermissionarioService.indexByPermissionario(this.permissionario.id.toString()).pipe(first()).toPromise();

    this.anexosDoPermissionario = data;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      formInput.permissionario_id = this.permissionario.id;

      await this.anexoDoPermissionarioService.createWithUpload(formInput, this.fileToUpload).pipe(first()).toPromise();

      this.load();

      this.snackbarService.openSnackBarSucess('Anexo salvo!');
      this.form.reset();
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  async download(id: string) {
    this.anexoDoPermissionarioService.get(id)
      .subscribe((resultBlob: Blob) => {
        var downloadURL = URL.createObjectURL(resultBlob);
        window.open(downloadURL);
      });
  }

  setIdParaDelecao(id: string) {
    this.idParaDelecao = id;
  }

  async deletar() {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.anexoDoPermissionarioService.delete(this.idParaDelecao).pipe(first()).toPromise();

      this.load();

      this.snackbarService.openSnackBarSucess('Anexo deletado!');
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

  handleFileInput(event: any){
    if (event.target.files && event.target.files[0]) {
      this.fileToUpload = event.target.files[0];
    }
  }

}
