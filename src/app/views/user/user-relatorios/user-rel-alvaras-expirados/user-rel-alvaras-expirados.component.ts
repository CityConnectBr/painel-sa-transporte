import { Component, OnInit } from '@angular/core';
import { RelatorioService } from 'src/app/services/relatorio.service';

@Component({
  selector: 'app-user-rel-alvaras-expirados',
  templateUrl: './user-rel-alvaras-expirados.component.html',
  styleUrls: ['./user-rel-alvaras-expirados.component.css']
})
export class UserRelAlvarasExpiradosComponent implements OnInit {

  loading: boolean = false;

  alvarasExpirados: any[] = [];

  constructor(
    private relatorioService: RelatorioService,
  ) { }

  ngOnInit() {
    this.gerarRelatorio();
  }

  gerarRelatorio() {
    this.relatorioService.getAlvarasExpirados().subscribe(
      (data) => {
        this.alvarasExpirados = data;
      }
    )
  }

}
