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
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-permissionario-alterar-documentos',
  templateUrl: './user-permissionario-alterar-documentos.component.html',
  styleUrls: ['./user-permissionario-alterar-documentos.component.css']
})
export class UserPermissionarioAlterarDocumentosComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  permissionario: Permissionario;

  modalidades: Modalidade[];

  constructor(
    private formBuilder: FormBuilder,
    private permissionarioService: PermissionarioService,
    private modalidadeService: ModalidadeService,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = "";
    try {
      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.permissionario = await this.permissionarioService.get(idSelected).pipe(first()).toPromise();

      console.log(this.permissionario.atestado_de_saude);

      //convertendo de 1|0 para boolean
      Object.getOwnPropertyNames(this.permissionario).forEach(key => {
        if (this.permissionario[key] == 1 || this.permissionario[key] == 0) {
          this.permissionario[key] = this.permissionario[key] == 1 ? true : false;
        }
      });

      ///////FORM
      this.form = this.formBuilder.group({
        atestado_de_saude: new FormControl(this.permissionario.atestado_de_saude,),
        certidao_negativa: new FormControl(this.permissionario.certidao_negativa,),
        validade_certidao_negativa: new FormControl(this.permissionario.validade_certidao_negativa,),
        comprovante_de_endereco: new FormControl(this.permissionario.comprovante_de_endereco,),
        inscricao_do_cadastro_mobiliario: new FormControl(this.permissionario.inscricao_do_cadastro_mobiliario,),
        numero_do_cadastro_mobiliario: new FormControl(this.permissionario.numero_do_cadastro_mobiliario,),
        curso_primeiro_socorros: new FormControl(this.permissionario.curso_primeiro_socorros,),
        curso_primeiro_socorros_emissao: new FormControl(this.permissionario.curso_primeiro_socorros_emissao,),
        crlv: new FormControl(this.permissionario.crlv,),
        dpvat: new FormControl(this.permissionario.dpvat,),
        certificado_pontuacao_cnh: new FormControl(this.permissionario.certificado_pontuacao_cnh,),
        contrato_comodato: new FormControl(this.permissionario.contrato_comodato,),
        contrato_comodato_validade: new FormControl(this.permissionario.contrato_comodato_validade,),
        ipva: new FormControl(this.permissionario.ipva,),
        relacao_dos_alunos_transportados: new FormControl(this.permissionario.relacao_dos_alunos_transportados,),
        laudo_vistoria_com_aprovacao_da_sa_trans: new FormControl(this.permissionario.laudo_vistoria_com_aprovacao_da_sa_trans,),
        ciretran_vistoria: new FormControl(this.permissionario.ciretran_vistoria,),
        ciretran_autorizacao: new FormControl(this.permissionario.ciretran_autorizacao,),
        selo_gnv: new FormControl(this.permissionario.selo_gnv,),
        selo_gnv_validade: new FormControl(this.permissionario.selo_gnv_validade,),
        taximetro_tacografo: new FormControl(this.permissionario.taximetro_tacografo,),
        taximetro_tacografo_numero: new FormControl(this.permissionario.taximetro_tacografo_numero,),
        taximetro_tacografo_afericao: new FormControl(this.permissionario.taximetro_tacografo_afericao,),
        classificacao_do_processo: new FormControl(this.permissionario.classificacao_do_processo,),
        numero_do_processo: new FormControl(this.permissionario.numero_do_processo,),
        data_processo_seletivo: new FormControl(this.permissionario.data_processo_seletivo,),
        inicio_atividades: new FormControl(this.permissionario.inicio_atividades,),
        termino_atividades: new FormControl(this.permissionario.termino_atividades,),
        termino_atividades_motivo: new FormControl(this.permissionario.termino_atividades_motivo,),
        data_transferencia: new FormControl(this.permissionario.data_transferencia,)
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

      if (formInput.curso_primeiro_socorros_emissao != null && formInput.curso_primeiro_socorros_emissao != '')
        formInput.curso_primeiro_socorros_emissao = SharedModule.convertStringddMMyyyyToyyyyMMdd(formInput.curso_primeiro_socorros_emissao);

      if (formInput.contrato_comodato_validade != null && formInput.contrato_comodato_validade != '')
        formInput.contrato_comodato_validade = SharedModule.convertStringddMMyyyyToyyyyMMdd(formInput.contrato_comodato_validade);

      if (formInput.selo_gnv_validade != null && formInput.selo_gnv_validade != '')
        formInput.selo_gnv_validade = SharedModule.convertStringddMMyyyyToyyyyMMdd(formInput.selo_gnv_validade);

        if (formInput.data_transferencia != null && formInput.data_transferencia != '')
        formInput.data_transferencia = SharedModule.convertStringddMMyyyyToyyyyMMdd(formInput.data_transferencia);

      if (formInput.validade_certidao_negativa != null && formInput.validade_certidao_negativa != '')
        formInput.validade_certidao_negativa = SharedModule.convertStringddMMyyyyToyyyyMMdd(formInput.validade_certidao_negativa);

      //convertendo de string para boolean
      Object.getOwnPropertyNames(formInput).forEach(key => {
        if (formInput[key]!=null && (formInput[key] == 'true' || formInput[key] == 'false')) {
          formInput[key] = formInput[key] == 'true' ? true : false;
        }
      });

      await this.permissionarioService.updateDocumentos(this.permissionario.id, formInput).toPromise();
      this.snackbarService.openSnackBarSucess('Permissionário salvo!');
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

}
