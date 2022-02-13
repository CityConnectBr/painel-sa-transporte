import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css']
})
export class PrintPageComponent implements OnInit {

  @Input() title: string;
  @Input() reference: string;
  @Input() printButton: boolean = false;

  actualDate: Date;

  constructor() {
    this.actualDate = new Date();
  }

  ngOnInit(): void {
  }

  printDiv() {
    const printContent = document.getElementById("printDivReportId");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

}
