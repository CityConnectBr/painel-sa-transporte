import { Component, OnInit, Input, Output } from '@angular/core';
import {EventEmitter} from "@angular/core"

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() modalID: string
  @Input() title: string
  @Input() close: boolean

  constructor(){}

  ngOnInit() {}

    @Output() closeModalEmit = new EventEmitter()

    closeModal(){
      this.closeModalEmit.emit()
  }


}
