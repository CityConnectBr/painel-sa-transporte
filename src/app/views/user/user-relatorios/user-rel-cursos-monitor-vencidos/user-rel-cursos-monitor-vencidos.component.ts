import { Component, OnInit } from '@angular/core';
import { RelatorioService } from 'src/app/services/relatorio.service';

@Component({
  selector: 'app-user-rel-cursos-monitor-vencidos',
  templateUrl: './user-rel-cursos-monitor-vencidos.component.html',
  styleUrls: ['./user-rel-cursos-monitor-vencidos.component.css']
})
export class UserRelCursosMonitorVencidosComponent implements OnInit {

  loading: boolean = false;

  list: any[] = [];

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit() {
    this.gerarRelatorio();
  }

  gerarRelatorio() {
    this.relatorioService
      .getCurosDeMonitorExpirados()
      .subscribe((data) => {
        this.list = data;
      });
  }
}
