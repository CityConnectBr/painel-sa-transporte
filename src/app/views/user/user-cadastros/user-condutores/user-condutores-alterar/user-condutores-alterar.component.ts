import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { CondutorService } from 'src/app/services/condutor.service';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-condutores-alterar',
  templateUrl: './user-condutores-alterar.component.html',
  styleUrls: ['./user-condutores-alterar.component.css']
})
export class UserCondutoresAlterarComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private condutorService: CondutorService,
    private snackbarService: SnackBarService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    (async () => {
      this.loading = true;
      const idSelected: string = this.route.snapshot.paramMap.get('id');
      try{
        const condutor = await this.condutorService.get(parseInt(idSelected)).pipe(first()).toPromise();
        if(!condutor){
          this.snackbarService.openSnackBarError('Condutor não encontrado!');
          this.location.back()
        }

      } catch (e: any) {
        this.snackbarService.openSnackBarError('Ocorreu um problema ao carregar o Condutor selecionado!');
        this.location.back()
      }
      this.loading = false;
    })();
  }

}
