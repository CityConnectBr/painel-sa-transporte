import { ModalidadeService } from './../../../../services/modalidade.service';
import { Component, OnInit } from '@angular/core';
import { Modalidade } from 'src/app/models/modalidade';
import { RelatorioService } from 'src/app/services/relatorio.service';

@Component({
  selector: 'app-user-rel-alvaras-expirados',
  templateUrl: './user-rel-alvaras-expirados.component.html',
  styleUrls: ['./user-rel-alvaras-expirados.component.css'],
})
export class UserRelAlvarasExpiradosComponent implements OnInit {
  loading: boolean = false;

  alvarasExpirados: any[] = [];
  alvarasExpiradosToShow: any[] = [];

  modalidades: Modalidade[];

  modalidade: string = '';

  constructor(
    private relatorioService: RelatorioService,
    private modalidadeService: ModalidadeService
  ) {}

  ngOnInit() {
    this.gerarRelatorio();

    this.loadModalidades();
  }

  gerarRelatorio() {
    this.relatorioService.getAlvarasExpirados().subscribe((data) => {
      this.alvarasExpirados = data;
      this.alvarasExpiradosToShow = data;
    });
  }

  loadModalidades() {
    this.modalidadeService.index().subscribe((data) => {
      this.modalidades = data;
    });
  }

  filter() {
    this.alvarasExpiradosToShow = this.alvarasExpirados.filter((alvara) => {
      if (this.modalidade) {
        if (alvara.permissionario.modalidade_id == this.modalidade) {
          return false;
        }
      }

      return true;
    });
  }
}
