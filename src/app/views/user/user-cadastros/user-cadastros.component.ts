import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-cadastros',
  templateUrl: './user-cadastros.component.html',
  styleUrls: ['./user-cadastros.component.css']
})
export class UserCadastrosComponent implements OnInit {

  constructor() { }

  showOutlet: boolean = false;

  ngOnInit(): void {
  }

  onActivate(event: any) {
    this.showOutlet = true;
  }

  onDeactivate(event: any) {
    this.showOutlet = false;
  }

}
