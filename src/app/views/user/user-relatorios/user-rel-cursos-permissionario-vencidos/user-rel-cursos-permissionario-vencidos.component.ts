import { Component, OnInit } from '@angular/core';
import { RelatorioService } from 'src/app/services/relatorio.service';

@Component({
  selector: 'app-user-rel-cursos-permissionario-vencidos',
  templateUrl: './user-rel-cursos-permissionario-vencidos.component.html',
  styleUrls: ['./user-rel-cursos-permissionario-vencidos.component.css']
})
export class UserRelCursosPermissionarioVencidosComponent implements OnInit {

  loading: boolean = false;

  list: any[] = [];

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit() {
    this.gerarRelatorio();
  }

  gerarRelatorio() {
    this.relatorioService
      .getCurosDePermissionarioExpirados()
      .subscribe((data) => {
        this.list = data;
      });
  }
}
