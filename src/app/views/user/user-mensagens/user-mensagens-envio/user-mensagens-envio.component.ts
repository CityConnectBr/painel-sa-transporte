import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { MensagemService } from 'src/app/services/mensagem.service';
import { ToastrService } from 'ngx-toastr';
import { Destinatario, Mensagem } from 'src/app/models/mensagem';

@Component({
  selector: 'app-user-mensagens-envio',
  templateUrl: './user-mensagens-envio.component.html',
  styleUrls: ['./user-mensagens-envio.component.css'],
})
export class UserMensagensEnvioComponent implements OnInit {
  destinatarios: Destinatario[] = [];

  tabs = [true, false, false, false];

  formMensagem = this.formBuilder.group({
    assunto: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    conteudo: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
    email: ['true', [Validators.required]],
    push: ['true', [Validators.required]],
  });

  constructor(
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  setTab(index: number) {
    this.tabs = [false, false, false, false];
    this.tabs[index] = true;
  }

  enviarIni(modal) {
    this.openModal(modal);
  }

  async enviar() {
    this.closeModal();

    const mensagem: Mensagem = {
      assunto: this.formMensagem.value.assunto,
      conteudo: this.formMensagem.value.conteudo,
      email: this.formMensagem.value.email == 'true' ? true : false,
      push: this.formMensagem.value.push == 'true' ? true : false,
      destinatarios: this.destinatarios,
    };

    this.mensagemService.create(mensagem).subscribe(
      (response) => {
        this.toastr.success('Mensagem enviada com sucesso!');
        this.limpar();
      },
      (error) => {
        this.toastr.error('Erro ao enviar mensagem!');
      }
    );

  }

  limpar() {
    this.destinatarios = [];
  }

  remover(index: number) {
    this.destinatarios.splice(index, 1);
  }

  closeModal() {
    return this.modal.dismissAll();
  }

  openModal(content: any) {
    this.modal.open(content);
  }
}
