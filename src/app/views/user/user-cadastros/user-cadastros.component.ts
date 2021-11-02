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
    console.log("onActivate", event);
    this.showOutlet = true;
  }

  onDeactivate(event: any) {
    console.log("onDeactivate", event);
    this.showOutlet = false;
  }

}
