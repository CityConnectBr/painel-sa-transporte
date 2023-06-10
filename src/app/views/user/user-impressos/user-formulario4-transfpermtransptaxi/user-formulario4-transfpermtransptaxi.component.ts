import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormularioService } from 'src/app/services/formulario.service';
import { SharedModule } from 'src/app/shared/shared-module';

@Component({
  selector: 'app-user-formulario4-transfpermtransptaxi',
  templateUrl: './user-formulario4-transfpermtransptaxi.component.html',
  styleUrls: ['./user-formulario4-transfpermtransptaxi.component.css']
})
export class UserFormulario4TransfpermtransptaxiComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private formularioService: FormularioService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.loadFormulario();
  }

  async loadFormulario(){
    this.loading = true;
    try {
      const formulario = await this.formularioService.getFormulario4().toPromise();
      const url = window.URL.createObjectURL(formulario);
      window.open(url);
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    }
    this.loading = false;
  }
}
