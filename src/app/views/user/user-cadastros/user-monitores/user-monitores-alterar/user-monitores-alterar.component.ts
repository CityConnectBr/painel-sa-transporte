import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { MonitorService } from 'src/app/services/monitor.service';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-monitores-alterar',
  templateUrl: './user-monitores-alterar.component.html',
  styleUrls: ['./user-monitores-alterar.component.css']
})
export class UserMonitoresAlterarComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private monitorService: MonitorService,
    private snackbarService: SnackBarService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    (async () => {
      this.loading = true;
      const idSelected: string = this.route.snapshot.paramMap.get('id');
      try{
        const condutor = await this.monitorService.get(parseInt(idSelected)).pipe(first()).toPromise();
        if(!condutor){
          this.snackbarService.openSnackBarError('Monitor não encontrado!');
          this.location.back()
        }

      } catch (e: any) {
        this.snackbarService.openSnackBarError('Ocorreu um problema ao carregar o Monitor selecionado!');
        this.location.back()
      }
      this.loading = false;
    })();
  }

}
