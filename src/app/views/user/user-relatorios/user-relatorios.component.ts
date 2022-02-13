import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-relatorios',
  templateUrl: './user-relatorios.component.html',
  styleUrls: ['./user-relatorios.component.css']
})
export class UserRelatoriosComponent implements OnInit {

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
