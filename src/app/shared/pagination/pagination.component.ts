import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() backEnabled: boolean = true;
  @Input() nextEnabled: boolean = true;
  @Input() actualPage: number = 0;

  @Output() changePos = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public back() {
    if (this.backEnabled)
      this.changePos.emit(this.actualPage - 1);
  }

  public next() {
    if (this.nextEnabled)
      this.changePos.emit(this.actualPage + 1);
  }

}
