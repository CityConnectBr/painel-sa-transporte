import { Component, OnInit } from '@angular/core';
import { RelatorioService } from 'src/app/services/relatorio.service';

@Component({
  selector: 'app-user-rel-documentos-permissionario-expirados',
  templateUrl: './user-rel-documentos-permissionario-expirados.component.html',
  styleUrls: ['./user-rel-documentos-permissionario-expirados.component.css'],
})
export class UserRelDocumentosPermissionarioExpiradosComponent
  implements OnInit
{
  loading: boolean = false;

  list: any[] = [];

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit() {
    this.gerarRelatorio();
  }

  gerarRelatorio() {
    this.relatorioService
      .getDocumentosPermissionarioExpirados()
      .subscribe((data) => {
        this.list = data;
      });
  }

  isExpirado(data: Date) {
    return new Date(data) < new Date();
  }
}
