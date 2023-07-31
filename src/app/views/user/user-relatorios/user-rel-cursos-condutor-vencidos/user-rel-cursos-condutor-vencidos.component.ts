import { Component, OnInit } from '@angular/core';
import { RelatorioService } from 'src/app/services/relatorio.service';

@Component({
  selector: 'app-user-rel-cursos-condutor-vencidos',
  templateUrl: './user-rel-cursos-condutor-vencidos.component.html',
  styleUrls: ['./user-rel-cursos-condutor-vencidos.component.css'],
})
export class UserRelCursosCondutorVencidosComponent implements OnInit {
  loading: boolean = false;

  list: any[] = [];

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit() {
    this.gerarRelatorio();
  }

  gerarRelatorio() {
    this.relatorioService
      .getCurosDeCondutorExpirados()
      .subscribe((data) => {
        this.list = data;
      });
  }
}
