import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Modalidade } from 'src/app/models/modalidade';
import { Permissionario } from 'src/app/models/permissionario';
import { ModalidadeService } from 'src/app/services/modalidade.service';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-permissionario-alterar-falecimento',
  templateUrl: './user-permissionario-alterar-falecimento.component.html',
  styleUrls: ['./user-permissionario-alterar-falecimento.component.css']
})
export class UserPermissionarioAlterarFalecimentoComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  permissionario: Permissionario;

  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private permissionarioService: PermissionarioService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = "";
    try {
      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.permissionario = await this.permissionarioService.get(idSelected).pipe(first()).toPromise();

      //formatando datas
      this.permissionario = SharedModule.formatAllFieldsDateToddMMyyyy(this.permissionario);

      ///////FORM
      this.form = this.formBuilder.group({
        data_obito: new FormControl(this.permissionario.data_obito, {
          validators: [Validators.required],
        }),
        certidao_de_obito: new FormControl(this.permissionario.certidao_de_obito, {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
        }),
        nome_inventariante: new FormControl(this.permissionario.nome_inventariante, {
          validators: [Validators.maxLength(40)],
        }),
        grau_de_paretesco_inventariante: new FormControl(this.permissionario.grau_de_paretesco_inventariante, {
          validators: [Validators.maxLength(15)],
        }),
        numero_do_processo_do_inventario: new FormControl(this.permissionario.numero_do_processo_do_inventario, {
          validators: [Validators.maxLength(15)],
        }),
        parecer_do_juiz_sobre_inventario: new FormControl(this.permissionario.parecer_do_juiz_sobre_inventario, {
          validators: [Validators.maxLength(500)],
        }),
      })

    } catch (e: any) {
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      await this.permissionarioService.updateFalecimento(this.permissionario.id, formInput).toPromise();
      this.toastr.success('Permissionário salvo!');
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

}
