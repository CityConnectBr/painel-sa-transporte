import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormularioService } from 'src/app/services/formulario.service';
import { SharedModule } from 'src/app/shared/shared-module';

@Component({
  selector: 'app-user-formulario18soltranspensino',
  templateUrl: './user-formulario18soltranspensino.component.html',
  styleUrls: ['./user-formulario18soltranspensino.component.css']
})
export class UserFormulario18soltranspensinoComponent implements OnInit {

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
      const formulario = await this.formularioService.getFormulario18().toPromise();
      const url = window.URL.createObjectURL(formulario);
      window.open(url);
    } catch (e) {
      this.toastr.error(SharedModule.handleError(e));
    }
    this.loading = false;
  }
}
