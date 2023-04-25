import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';import { first } from 'rxjs/operators';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Condutor } from 'src/app/models/condutores';

@Component({
  selector: 'app-user-permissionario-alterar-condutores',
  templateUrl: './user-permissionario-alterar-condutores.component.html',
  styleUrls: ['./user-permissionario-alterar-condutores.component.css']
})
export class UserPermissionarioAlterarCondutoresComponent implements OnInit {

  condutores: Condutor[];

  condutorSelecionado: Condutor;

  constructor(
    private permissionarioService: PermissionarioService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modal: NgbModal,
  ) { }

  async ngOnInit() {
    try {
      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');

      this.condutores = await this.permissionarioService.indexCondutores(idSelected).pipe(first()).toPromise();

    } catch (e: any) {
      this.toastr.error("Ocorreu um erro ao montar a página");
    }
  }

  showCondutor(modal, condutor: Condutor){
    this.condutorSelecionado = condutor;
    this.openModal(modal)
  }

  closeModal(event: any) {
    return this.modal.dismissAll()
  }

  openModal(content: any) {
    this.modal.open(content)
  }

}
