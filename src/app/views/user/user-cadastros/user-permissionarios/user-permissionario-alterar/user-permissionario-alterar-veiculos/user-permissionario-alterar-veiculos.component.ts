import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Veiculo } from 'src/app/models/veiculo';
import { ToastrService } from 'ngx-toastr';import { debounceTime, first } from 'rxjs/operators';
import { PermissionarioService } from 'src/app/services/permissionario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-permissionario-alterar-veiculos',
  templateUrl: './user-permissionario-alterar-veiculos.component.html',
  styleUrls: ['./user-permissionario-alterar-veiculos.component.css']
})
export class UserPermissionarioAlterarVeiculosComponent implements OnInit {

  veiculos: Veiculo[];

  veiculoSelecionado: Veiculo;

  constructor(
    private permissionarioService: PermissionarioService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modal: NgbModal,
  ) { }

  async ngOnInit() {
    try {
      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');

      this.veiculos = await this.permissionarioService.indexVeiculos(idSelected).pipe(first()).toPromise();

    } catch (e: any) {
      this.toastr.error("Ocorreu um erro ao montar a página");
    }
  }

  showVeiculo(modal, veiculo: Veiculo){
    this.veiculoSelecionado = veiculo;
    this.openModal(modal)
  }

  closeModal(event: any) {
    return this.modal.dismissAll()
  }

  openModal(content: any) {
    this.modal.open(content)
  }

}
