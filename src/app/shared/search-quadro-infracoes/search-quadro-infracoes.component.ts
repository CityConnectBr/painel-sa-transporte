import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-search-quadro-infracoes',
  templateUrl: './search-quadro-infracoes.component.html',
  styleUrls: ['./search-quadro-infracoes.component.css']
})
export class SearchQuadroInfracoesComponent implements OnInit {
  @Output() searchEmitter = new EventEmitter();
  @Input() placeholder = 'Pesquise aqui';

  textInput: string = '';
  modalidade: string = 't';

  constructor(private injector: Injector) {}

  ngOnInit(): void {
  }

  public search() {
      this.searchEmitter.emit({
        text: this.textInput,
        modalidade: this.modalidade,
      });
      return;
  }
}
