import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Modalidade } from 'src/app/models/modalidade';
import { ModalidadeServiceWithoutCrud } from './modalidade.service';

@Component({
  selector: 'app-search-permissionario',
  templateUrl: './search-permissionario.component.html',
  styleUrls: ['./search-permissionario.component.css'],
})
export class SearchPermissionarioComponent implements OnInit {
  @Output() searchEmitter = new EventEmitter();
  @Input() withAtivo: boolean = false;
  @Input() placeholder = 'Pesquise aqui';
  @Input() selecionarSomenteModalidadeExceto: string = '';

  textInput: string = '';
  ativo: number = 1;
  modalidade: string = '';

  modalidades: Modalidade[];

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    this.loadModalidades();
  }

  public search() {
    if (this.withAtivo) {
      this.searchEmitter.emit({
        text: this.textInput,
        ativo: this.ativo,
        modalidade: this.modalidade,
      });
      return;
    }

    this.searchEmitter.emit(this.textInput);
  }

  loadModalidades() {
    const service = this.injector.get(ModalidadeServiceWithoutCrud);

    service.index().subscribe((data) => {
      if (this.selecionarSomenteModalidadeExceto) {
        data = data.filter(
          (m) => m.id != this.selecionarSomenteModalidadeExceto
        );
      }

      this.modalidades = data;

      if (this.selecionarSomenteModalidadeExceto) {
        this.modalidade = this.modalidades[0].id;
        this.search();
      }

    });
  }
}
