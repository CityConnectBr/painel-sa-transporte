import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-veiculos-alterar',
  templateUrl: './user-veiculos-alterar.component.html',
  styleUrls: ['./user-veiculos-alterar.component.css']
})
export class UserVeiculosAlterarComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private veiculoService: VeiculoService,
    private toastr: ToastrService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    (async () => {
      this.loading = true;
      const idSelected: string = this.route.snapshot.paramMap.get('id');
      try{
        const veiculo = await this.veiculoService.get(parseInt(idSelected)).pipe(first()).toPromise();
        if(!veiculo){
          this.toastr.error('Veículo não encontrado!');
          this.location.back()
        }

      } catch (e: any) {
        this.toastr.error('Ocorreu um problema ao carregar o Veículo selecionado!');
        this.location.back()
      }
      this.loading = false;
    })();
  }

}
