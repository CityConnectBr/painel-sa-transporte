import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormularioService } from 'src/app/services/formulario.service';
import { SharedModule } from 'src/app/shared/shared-module';

@Component({
  selector: 'app-user-formulario16solressarcimento',
  templateUrl: './user-formulario16solressarcimento.component.html',
  styleUrls: ['./user-formulario16solressarcimento.component.css']
})
export class UserFormulario16solressarcimentoComponent implements OnInit {

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
      const formulario = await this.formularioService.getFormulario16().toPromise();
      const url = window.URL.createObjectURL(formulario);
      window.open(url);
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    }
    this.loading = false;
  }
}
