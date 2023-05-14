import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LancamentoAlvaraDoPermissionarioService } from 'src/app/services/lancamentoalvaradopermissinario.service';
import { SharedModule } from 'src/app/shared/shared-module';

@Component({
  selector: 'app-user-alvara-pagamento-informar-pagamento',
  templateUrl: './user-alvara-pagamento-informar-pagamento.component.html',
  styleUrls: ['./user-alvara-pagamento-informar-pagamento.component.css'],
})
export class UserAlvaraPagamentoInformarPagamentoComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  errorMessage: string;

  @Input() public alvaraId: string;

  constructor(
    private formBuilder: FormBuilder,
    private alvaraDoPermissionarioService: LancamentoAlvaraDoPermissionarioService,
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
    this.alvaraDoPermissionarioService
      .informarPagamento(this.alvaraId, {
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
            'Ocorreu um erro ao informar o pagamento do alvará.'
          );
        }
      );
  }
}
