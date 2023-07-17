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

  textInput: string = '';
  ativo: number = 1;

  constructor() {}

  ngOnInit(): void {}

  public search() {
    if (this.withAtivo) {
      this.searchEmitter.emit({ text: this.textInput, ativo: this.ativo });
      return;
    }

    this.searchEmitter.emit(this.textInput);
  }
}
