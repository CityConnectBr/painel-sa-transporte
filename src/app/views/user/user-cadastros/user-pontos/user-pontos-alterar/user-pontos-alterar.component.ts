import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { PontoService } from 'src/app/services/ponto.service';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-pontos-alterar',
  templateUrl: './user-pontos-alterar.component.html',
  styleUrls: ['./user-pontos-alterar.component.css']
})
export class UserPontosAlterarComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pontoService: PontoService,
    private snackbarService: SnackBarService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    (async () => {
      this.loading = true;
      const idSelected: string = this.route.snapshot.paramMap.get('id');
      try{
        const condutor = await this.pontoService.get(parseInt(idSelected)).pipe(first()).toPromise();
        if(!condutor){
          this.snackbarService.openSnackBarError('Ponto não encontrado!');
          this.location.back()
        }

      } catch (e: any) {
        this.snackbarService.openSnackBarError('Ocorreu um problema ao carregar o Ponto selecionado!');
        this.location.back()
      }
      this.loading = false;
    })();
  }

}
