import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { AlvaraDoPermissionario } from 'src/app/models/alvara-do-permissionario';
import { Permissionario } from 'src/app/models/permissionario';
import { AlvaraDoPermissionarioService } from 'src/app/services/alvaradopermissinario.service';
import { SearchData } from 'src/app/services/basic-crud.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-permissionario-alterar-alvara',
  templateUrl: './user-permissionario-alterar-alvara.component.html',
  styleUrls: ['./user-permissionario-alterar-alvara.component.css']
})
export class UserPermissionarioAlterarAlvaraComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  permissionario: Permissionario;

  alvarasAnteriores: AlvaraDoPermissionario[];

  alvaraAtual: AlvaraDoPermissionario;

  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private permissionarioService: PermissionarioService,
    private alvaraService: AlvaraDoPermissionarioService,
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

      await this.loadAlvara(this.permissionario);

    } catch (e: any) {
      console.log(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  private async loadAlvara(permissionario: Permissionario) {

    const { data } =
      await this.alvaraService.indexByPermissionario(permissionario.id.toString()).pipe(first()).toPromise();

      console.log(data);
    if (data && data.length > 0) {
      this.alvaraAtual = data[0];

      this.alvaraAtual = SharedModule.formatAllFieldsDateToddMMyyyy(this.alvaraAtual);
    }

    ///////FORM
    this.form = this.formBuilder.group({
      data_retorno: new FormControl(this.alvaraAtual?.data_retorno ?? "",),
      data_emissao: new FormControl(this.alvaraAtual?.data_emissao ?? "",),
      data_vencimento: new FormControl(this.alvaraAtual?.data_vencimento ?? "",),
      observacao_retorno: new FormControl(this.alvaraAtual?.observacao_retorno ?? "",),
    })

    this.alvarasAnteriores = data.filter((e, i) => i!=0);
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      if (this.alvaraAtual && this.alvaraAtual.id) {

        this.alvaraAtual.data_emissao = formInput.data_emissao;
        this.alvaraAtual.data_retorno = formInput.data_retorno;
        this.alvaraAtual.data_vencimento = formInput.data_emissao;
        this.alvaraAtual.observacao_retorno = formInput.observacao_retorno;

        await this.alvaraService.update(this.alvaraAtual.id, this.alvaraAtual).pipe(first()).toPromise();
      } else {
        formInput.permissionario_id = this.permissionario.id;

        await this.alvaraService.create(formInput).pipe(first()).toPromise();
      }

      this.loadAlvara(this.permissionario);

      this.snackbarService.openSnackBarSucess('Alvará salvo!');
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  novo(){
    this.alvaraAtual = null;
    this.form.reset();
  }

  closeModal(event: any) {
    return this.modal.dismissAll()
  }

  openModal(content: any) {
    this.modal.open(content)
  }

}
