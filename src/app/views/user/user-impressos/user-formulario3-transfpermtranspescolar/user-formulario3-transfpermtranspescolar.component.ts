import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormularioService } from 'src/app/services/formulario.service';
import { SharedModule } from 'src/app/shared/shared-module';

@Component({
  selector: 'app-user-formulario3-transfpermtranspescolar',
  templateUrl: './user-formulario3-transfpermtranspescolar.component.html',
  styleUrls: ['./user-formulario3-transfpermtranspescolar.component.css']
})
export class UserFormulario3TransfpermtranspescolarComponent implements OnInit {

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
      const formulario = await this.formularioService.getFormulario3().toPromise();
      const url = window.URL.createObjectURL(formulario);
      window.open(url);
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    }
    this.loading = false;
  }
}
