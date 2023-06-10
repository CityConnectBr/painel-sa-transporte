import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'src/app/services/basic-crud.service';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { PrintPageComponent } from 'src/app/shared/print-page/print-page.component';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-rel-entrada-saida-veiculos',
  templateUrl: './user-rel-entrada-saida-veiculos.component.html',
  styleUrls: ['./user-rel-entrada-saida-veiculos.component.css']
})
export class UserRelEntradaSaidaVeiculosComponent implements OnInit {

  loading: boolean = false;

  searchText: string = "";
  dataSearch: SearchData;

  form: FormGroup
  errorMessage: string

  maskMountYear = SharedModule.textMaskMountYear;

  @ViewChild(PrintPageComponent) child!: PrintPageComponent;

  constructor(
    private relatorioService: RelatorioService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    ///////FORM
    this.form = this.formBuilder.group({
      referencia: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  public generateReport(inputForm) {
    this.loading = true;
    this.errorMessage = "";
    try {
      if(!this.form.valid){
        this.toastr.error("Existem campos inválidos!");
        this.loading = false;
        return;
      }

      if(!inputForm.referencia.match(SharedModule.monthYearPattern)){
        this.toastr.error("Valor inválido!");
        this.loading = false;
        return;
      }

    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;  }

  public clearReport() {
    this.dataSearch = null;
  }

  public printDiv() {
    this.child.printDiv();
  }

}
