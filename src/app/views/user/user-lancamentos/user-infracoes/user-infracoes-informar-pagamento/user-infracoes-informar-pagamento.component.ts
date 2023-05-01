import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { InfracaoService } from 'src/app/services/infracao.service';
import { SharedModule } from 'src/app/shared/shared-module';

@Component({
  selector: 'app-user-infracoes-informar-pagamento[infracaoId]',
  templateUrl: './user-infracoes-informar-pagamento.component.html',
  styleUrls: ['./user-infracoes-informar-pagamento.component.css'],
})
export class UserInfracoesInformarPagamentoComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  errorMessage: string;

  @Input() public infracaoId: number;

  constructor(
    private formBuilder: FormBuilder,
    private infracaoService: InfracaoService,
    private modal: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const today = new Date();
    this.form = this.formBuilder.group({
      data_pagamento: [
        SharedModule.formatDateddMMyyyy(today),
        [Validators.required],
      ],
    });
  }

  salvar() {
    if (!this.form.valid) {
      this.toastr.error('Existem campos inválidos.');
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.infracaoService
      .informarPagamento(this.infracaoId, {
        data_pagamento: SharedModule.convertStringddMMyyyyToyyyyMMdd(
          this.form.value.data_pagamento
        ),
      })
      .subscribe(
        (res) => {
          this.loading = false;
          this.errorMessage = null;
          this.modal.dismissAll();
        },
        (err) => {
          this.loading = false;
          this.errorMessage = err.error.message;
          this.toastr.error(
            'Ocorreu um erro ao informar o pagamento da infração.'
          );
        }
      );
  }
}
