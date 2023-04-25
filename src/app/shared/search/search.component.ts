import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchEmitter = new EventEmitter();

  textInput: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  public search() {
    this.searchEmitter.emit(this.textInput);
  }

}
