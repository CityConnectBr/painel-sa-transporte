import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { SolicitacaoDeAlteracao } from 'src/app/models/solicitacao';
import { ArquivoService } from 'src/app/services/arquivo.service';
import { SearchData } from 'src/app/services/basic-crud.service';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-solicitacoes',
  templateUrl: './user-solicitacoes.component.html',
  styleUrls: ['./user-solicitacoes.component.css']
})
export class UserSolicitacoesComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  dataSearch: SearchData;

  solicitacao: SolicitacaoDeAlteracao;

  imageFile: any | null = null;
  fotoAnterior: any | null = null;
  novaFoto: any | null = null;

  alteracaoDeFoto: boolean = false;
  isCadastro: boolean = false;

  modals: NgbModalRef[] = [];

  statusSelecionado: string = "";//somente abertos

  constructor(
    private formBuilder: FormBuilder,
    private solicitacaoService: SolicitacaoService,
    private snackbarService: SnackBarService,
    private arquivoService: ArquivoService,
    private modal: NgbModal,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadList(1);
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.solicitacaoService.search(this.statusSelecionado, page).toPromise();

      ///////FORM
      this.form = this.formBuilder.group({
        decisao: new FormControl("", {
          validators: [Validators.required],
        }),
        motivo: new FormControl(""),
      })
    } catch (e) {
      this.dataSearch = null;
    }
    this.loading = false;
  }

  public search() {
    this.loadList(1);
  }

  public changePos(page: number) {
    this.loadList(page && page > 0 ? page : 1);
  }

  async visualizar(solicitacao: SolicitacaoDeAlteracao, modal) {
    this.loading = true;
    this.alteracaoDeFoto = false;
    try {
      this.solicitacao = solicitacao;

      this.isCadastro = this.solicitacao.referencia_id ? true : false;

      if (this.solicitacao.tipo.nome.indexOf("foto") != -1) {
        this.alteracaoDeFoto = true;
        const blob = await this.arquivoService.get(this.solicitacao.arquivo1_uid).pipe(first()).toPromise();
        this.novaFoto = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      }

      this.openModal(modal);
    } catch (e) {
    }
    this.loading = false;
  }

  async finalizar(formInput) {
    this.loading = true;
    this.errorMessage = "";
    try {
      if ((formInput.decisao == 'R' || formInput.decisao == 'C') &&
        (!formInput.motivo || formInput.motivo == '')) {
        this.snackbarService.openSnackBarError("Nenhum motivo digitado!");
        this.loading = false;
        return;
      }

      if (this.isSolicitacaoValidacao()) {
        this.router.navigate(["/user/lancamentos/infracoes/novo"], { queryParams: { solicitacaoId: this.solicitacao.id } });
        this.closeModal(null);
        return;
      }

      await this.solicitacaoService.finish(this.solicitacao.id,
        {
          status: formInput.decisao,
          motivo_recusado: formInput.motivo
        }).toPromise();
      this.snackbarService.openSnackBarSucess('Solicitação finalizada!');
      this.closeModal(null);
      await this.loadList(1);
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  async visualizarComprovante(id: String, modal) {
    try {
      const blob = await this.arquivoService.get(id).pipe(first()).toPromise();
      this.imageFile = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      this.openModal(modal);
    } catch (e: any) {
      this.imageFile = null;
      this.closeModal(null);
    }
  }

  getSolicitante(solicitacao: SolicitacaoDeAlteracao) {
    if (solicitacao && solicitacao.permissionario) {
      return solicitacao.permissionario.nome_razao_social;
    } else if (solicitacao && solicitacao.condutor) {
      return solicitacao.condutor.nome;
    } else if (solicitacao && solicitacao.fiscal) {
      return solicitacao.fiscal.nome;
    } else {
      return "--"
    }
  }

  getAlvo(solicitacao: SolicitacaoDeAlteracao) {
    if (solicitacao && solicitacao.permissionario_referencia) {
      return solicitacao.permissionario_referencia.nome_razao_social;
    } else if (solicitacao && solicitacao.condutor_referencia) {
      return solicitacao.condutor_referencia.nome;
    } else if (solicitacao && solicitacao.monitor_referencia) {
      return solicitacao.monitor_referencia.nome;
    } else if (solicitacao && solicitacao.fiscal_referencia) {
      return solicitacao.fiscal_referencia.nome;
    } else if (solicitacao && solicitacao.veiculo_referencia) {
      if (solicitacao.veiculo_referencia.placa)
        return `Placa: ${solicitacao.veiculo_referencia.placa}`;
      else if (solicitacao.veiculo_referencia.cod_renavam)
        return `Renavan: ${solicitacao.veiculo_referencia.cod_renavam}`;
    } else {
      return "--"
    }
  }

  getAlvoObj(solicitacao: SolicitacaoDeAlteracao) {
    if (solicitacao && solicitacao.permissionario_referencia) {
      return solicitacao.permissionario_referencia;
    } else if (solicitacao && solicitacao.condutor_referencia) {
      return solicitacao.condutor_referencia;
    } else if (solicitacao && solicitacao.monitor_referencia) {
      return solicitacao.monitor_referencia;
    } else if (solicitacao && solicitacao.fiscal_referencia) {
      return solicitacao.fiscal_referencia;
    } else {
      return "--"
    }
  }

  getStatus(status: String) {
    if (status && status == "A") {
      return "Aceito";
    } else if (status && status == "R") {
      return "Recusado";
    } else if (status && status == "C") {
      return "Cancelado";
    }
    return "Aberto";
  }

  getCampos(solicitacao: SolicitacaoDeAlteracao) {
    const campos: { nome: String, valorOriginal: String, novoValor: String }[] = [];

    for (let i = 1; i < 26; i++) {
      const desc = solicitacao.tipo[`desc_campo${i}`];
      const campo = solicitacao.tipo[`nome_campo${i}`];
      let valorDoCampo;

      if (solicitacao.tipo == null) {
        //VALOR ATUAL
        if (solicitacao && solicitacao.endereco) {
          valorDoCampo = solicitacao.endereco[campo];
        } else if (solicitacao && solicitacao.permissionario_referencia) {
          valorDoCampo = solicitacao.permissionario_referencia[campo];
        } else if (solicitacao && solicitacao.condutor_referencia) {
          valorDoCampo = solicitacao.condutor_referencia[campo];
        } else if (solicitacao && solicitacao.monitor_referencia) {
          valorDoCampo = solicitacao.monitor_referencia[campo];
        } else if (solicitacao && solicitacao.fiscal_referencia) {
          valorDoCampo = solicitacao.fiscal_referencia[campo];
        } else if (solicitacao && solicitacao.veiculo_referencia) {
          valorDoCampo = solicitacao.veiculo_referencia[campo];
        }
      } else {
        valorDoCampo = solicitacao[`valor_anterior_campo${i}`];
      }

      if (campo) {
        campos.push({ nome: desc, valorOriginal: valorDoCampo ?? "", novoValor: solicitacao[`campo${i}`] });
      }
    }


    return campos;
  }

  getComprovantes(solicitacao: SolicitacaoDeAlteracao) {
    const comprovantes: { nome: String, arquivo: String }[] = [];

    for (let i = 1; i < 5; i++) {
      const arquivo = solicitacao[`arquivo${i}_uid`];
      const nomeDoComprovante = solicitacao.tipo[`desc_arquivo${i}`];

      if (nomeDoComprovante) {
        comprovantes.push({ nome: nomeDoComprovante, arquivo: arquivo });
      }
    }

    return comprovantes;
  }

  formatValue(value: String): String {

    try {
      if (value) {
        if (SharedModule.dateFromAPIPattern.exec(value.toString())) {
          return SharedModule.formatDateddMMyyyy(value.toString());
        } else if (SharedModule.CPFCNPJPatern.exec(value.toString())) {
          //TODO!
        } else if (SharedModule.telefonePattern.exec(value.toString())) {
          //TODO!
        }
      }
    } catch (e) { }

    return value;
  }

  isSolicitacaoValidacao(): boolean {
    try {
      if (this.solicitacao && this.solicitacao.tipo_solicitacao_id == '60') {
        return true;
      }
    } catch (e: any) { }
    return false;
  }

  closeModal(pop: boolean = false) {
    if (pop) {
      this.modals[this.modals.length - 1].close();
    } else {
      this.modal.dismissAll();
      this.modals = [];
    }
  }

  openModal(content: any) {
    this.modals.push(this.modal.open(content));
  }

}
