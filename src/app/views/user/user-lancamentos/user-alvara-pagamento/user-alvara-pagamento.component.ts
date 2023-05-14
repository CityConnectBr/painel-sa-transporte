import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QrCodePix } from 'qrcode-pix';
import { SearchData } from 'src/app/services/basic-crud.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { LancamentoAlvaraDoPermissionarioService } from 'src/app/services/lancamentoalvaradopermissinario.service';
import { AlvaraDoPermissionario } from 'src/app/models/alvara-do-permissionario';

@Component({
  selector: 'app-user-alvara-pagamento',
  templateUrl: './user-alvara-pagamento.component.html',
  styleUrls: ['./user-alvara-pagamento.component.css'],
})
export class UserAlvaraPagamentoComponent implements OnInit, AfterViewInit {
  loading: boolean = false;

  dataSearch: SearchData;

  qrCodePix: any;

  alvaraSelecionado: AlvaraDoPermissionario;

  constructor(
    private alvaraDoPermissionarioService: LancamentoAlvaraDoPermissionarioService,
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadList(1);
  }

  ngAfterViewInit() {}

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.alvaraDoPermissionarioService
        .indexPendentes(page)
        .toPromise();
    } catch (e) {
      this.dataSearch = null;
    }
    this.loading = false;
  }

  public changePos(page: number) {
    this.loadList(page && page > 0 ? page : 1);
  }

  async getQrCode(modal, alvara: AlvaraDoPermissionario) {
    this.loading = true;

    if (!alvara) {
      this.toastr.error('Não foi possível gerar o QR Code');
      return;
    }

    const empresa = await this.empresaService
      .get(alvara.empresa_id)
      .toPromise();

    this.qrCodePix = QrCodePix({
      version: '01',
      key: alvara.chave_pix,
      name: empresa.nome,
      city: empresa.cidade,
      message: `Alvará - SA Transportes`,
      cep: empresa.cep,
      value: alvara.valor,
    });

    this.loading = false;
    this.modal.open(modal);
  }

  initLancamentoPagamento(modal: any, obj: any) {
    this.alvaraSelecionado = obj;
    this.modal
      .open(modal)
      .result.then((result) => {})
      .catch()
      .finally(() => {
        this.loadList(1);
      });
  }

  closeModal(event: any) {
    return this.modal.dismissAll();
  }

  copyCode() {
    navigator.clipboard.writeText(this.qrCodePix.payload());
    this.toastr.success('Código copiado com sucesso');
  }

  copyQrCode() {
    const canvas = document.querySelector('canvas');
    canvas.toBlob((blob) => {
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      this.toastr.success('QR Code copiado com sucesso');
    });
  }

  saveQrCode() {
    const canvas = document.querySelector('canvas');
    const image = canvas
      .toDataURL('image/png', 1.0)
      .replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = image;
    link.click();
  }
}
