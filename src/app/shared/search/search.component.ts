import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() searchEmitter = new EventEmitter();
  @Input() withAtivo: boolean = false;
  @Input() placeholder = 'Pesquise aqui';
  @Input() periodo: boolean = false;
  @Output() dataInicialEmitter = new EventEmitter();
  @Output() dataFinalEmitter = new EventEmitter();

  textInput: string = '';
  ativo: number = 1;
  dataInicialInput: string = '';
  dataFinalInput: string = '';

  constructor() {}

  ngOnInit(): void {}

  public search() {
    if (this.withAtivo) {
      this.searchEmitter.emit({ text: this.textInput, ativo: this.ativo });
      return;
    }

    this.searchEmitter.emit(this.textInput);
  }

  public changeDataInicial() {
    if (this.dataInicialInput && this.dataInicialInput.length == 10) {
      this.dataInicialEmitter.emit(this.dataInicialInput);
    }
  }

  public changeDataFinal() {
    if (this.dataFinalInput && this.dataFinalInput.length == 10) {
      this.dataFinalEmitter.emit(this.dataFinalInput);
    }
  }
}
