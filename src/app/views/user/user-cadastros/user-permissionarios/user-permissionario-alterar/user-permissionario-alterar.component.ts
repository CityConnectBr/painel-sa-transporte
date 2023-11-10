import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { ToastrService } from 'ngx-toastr';
import { ModalidadeService } from 'src/app/services/modalidade.service';
@Component({
  selector: 'app-user-permissionario-alterar',
  templateUrl: './user-permissionario-alterar.component.html',
  styleUrls: ['./user-permissionario-alterar.component.css'],
})
export class UserPermissionarioAlterarComponent implements OnInit {
  loading: boolean = false;

  isTransporteEscolar: boolean = false;

  @ViewChild('fichaPermissionario') fichaPermissionario: any;

  permissionarioId: string;

  constructor(
    private route: ActivatedRoute,
    private permissionarioService: PermissionarioService,
    private modalidadeService: ModalidadeService,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    (async () => {
      this.loading = true;
      this.permissionarioId = this.route.snapshot.paramMap.get('id');
      try {
        const permissionario = await this.permissionarioService
          .get(parseInt(this.permissionarioId))
          .pipe(first())
          .toPromise();
        if (!permissionario) {
          this.toastr.error('Permissionário não encontrado!');
          this.location.back();
        }

        if (permissionario.modalidade_id) {
          const modalidade = await this.modalidadeService
            .get(permissionario.modalidade_id)
            .pipe(first())
            .toPromise();
          if (modalidade) {
            this.isTransporteEscolar =
              modalidade.identificador === 'e' ||
              modalidade.identificador === 'g';
          }
        }
      } catch (e: any) {
        this.toastr.error(
          'Ocorreu um problema ao carregar o Permissionário selecionado!'
        );
        this.location.back();
      }
      this.loading = false;
    })();
  }

  imprimirFicha() {
    this.fichaPermissionario.gerarFicha();
  }
}
