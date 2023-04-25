import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { PontoService } from 'src/app/services/ponto.service';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    (async () => {
      this.loading = true;
      const idSelected: string = this.route.snapshot.paramMap.get('id');
      try{
        const condutor = await this.pontoService.get(parseInt(idSelected)).pipe(first()).toPromise();
        if(!condutor){
          this.toastr.error('Ponto não encontrado!');
          this.location.back()
        }

      } catch (e: any) {
        this.toastr.error('Ocorreu um problema ao carregar o Ponto selecionado!');
        this.location.back()
      }
      this.loading = false;
    })();
  }

}
