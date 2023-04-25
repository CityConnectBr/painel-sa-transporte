import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { MarcaModeloDeVeiculo } from 'src/app/models/marca-modelo-de-veiculo';
import { MarcaModeloDeVeiculoService } from 'src/app/services/marca-modelo-de-veiculo.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-marcas-modelos-de-veiculos-crud',
  templateUrl: './user-marcas-modelos-de-veiculos-crud.component.html',
  styleUrls: ['./user-marcas-modelos-de-veiculos-crud.component.css']
})
export class UserMarcasModelosDeVeiculosCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: MarcaModeloDeVeiculo;

  constructor(
    private formBuilder: FormBuilder,
    private marcaModeloVeiculoService: MarcaModeloDeVeiculoService,
    private location: Location,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modal: NgbModal,
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = "";

    try {
      const idSelected: string = this.route.snapshot.paramMap.get('id');

      ///////FORM
      this.form = this.formBuilder.group({
        descricao: new FormControl('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
        }),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.marcaModeloVeiculoService.get(parseInt(idSelected)).toPromise();

        this.form.controls['descricao'].setValue(this.crudObj.descricao);
      }

    } catch (e: any) {
      console.error(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {

      if (this.crudObj) {
        await this.marcaModeloVeiculoService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.marcaModeloVeiculoService.create(formInput).toPromise();
      }
      this.toastr.success('Marca/Modelo salvo!');
      this.location.back()
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  async excluir() {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.marcaModeloVeiculoService.delete(this.crudObj.id).toPromise();
      this.modal.dismissAll()
      this.toastr.success('Excluido com Sucesso!');
      this.location.back()
    } catch (e: any) {
      this.modal.dismissAll()
      this.errorMessage = "Este não pode ser excluido!";
    }
    this.loading = false;
  }

  closeModal(event: any) {
    return this.modal.dismissAll()
  }

  openModal(content: any) {
    this.modal.open(content)
  }

}
