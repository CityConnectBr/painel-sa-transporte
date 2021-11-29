import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-lancamentos',
  templateUrl: './user-lancamentos.component.html',
  styleUrls: ['./user-lancamentos.component.css']
})
export class UserLancamentosComponent implements OnInit {

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
