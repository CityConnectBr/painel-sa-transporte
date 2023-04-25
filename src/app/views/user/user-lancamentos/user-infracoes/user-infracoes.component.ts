import { Infracao } from './../../../../models/infracao';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QrCodePix } from 'qrcode-pix';
import { SearchData } from 'src/app/services/basic-crud.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { InfracaoService } from 'src/app/services/infracao.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-infracoes',
  templateUrl: './user-infracoes.component.html',
  styleUrls: ['./user-infracoes.component.css'],
})
export class UserInfracoesComponent implements OnInit, AfterViewInit {
  loading: boolean = false;

  searchText: string = '';
  dataSearch: SearchData;

  qrCodePix: any;

  constructor(
    private infracaoService: InfracaoService,
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
      this.dataSearch = await this.infracaoService
        .search(this.searchText, page)
        .toPromise();
    } catch (e) {
      this.dataSearch = null;
    }
    this.loading = false;
  }

  public search(text: string = '') {
    this.searchText = text;
    this.loadList(1);
  }

  public changePos(page: number) {
    this.loadList(page && page > 0 ? page : 1);
  }

  alterar(id: number) {
    this.router.navigate(['alterar/' + id], { relativeTo: this.route });
  }

  async getQrCode(modal, id: number) {
    this.loading = true;

    const infracao: Infracao = await this.infracaoService.get(id).toPromise();
    if (!infracao) {
      this.toastr.error(
        'Não foi possível gerar o QR Code'
      );
      return;
    }

    const empresa = await this.empresaService
      .get(infracao.empresa_id)
      .toPromise();

    this.qrCodePix = QrCodePix({
      version: '01',
      key: infracao.chave_pix,
      name: empresa.nome,
      city: empresa.cidade,
      message: `Multa - SA Transportes`,
      cep: empresa.cep,
      value: infracao.valor_final,
    });

    this.loading = false;
    this.modal.open(modal);
  }

  initLancamentoPagamento(id: number) {}

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
