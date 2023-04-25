import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { CondutorService } from 'src/app/services/condutor.service';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    (async () => {
      this.loading = true;
      const idSelected: string = this.route.snapshot.paramMap.get('id');
      try{
        const condutor = await this.condutorService.get(parseInt(idSelected)).pipe(first()).toPromise();
        if(!condutor){
          this.toastr.error('Condutor não encontrado!');
          this.location.back()
        }

      } catch (e: any) {
        this.toastr.error('Ocorreu um problema ao carregar o Condutor selecionado!');
        this.location.back()
      }
      this.loading = false;
    })();
  }

}
