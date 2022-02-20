import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-impressos',
  templateUrl: './user-impressos.component.html',
  styleUrls: ['./user-impressos.component.css']
})
export class UserImpressosComponent implements OnInit {

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
