import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarcaModeloDeCarroceria } from 'src/app/models/marca-modelo-de-carroceria';
import { MarcaModeloDeChassi } from 'src/app/models/marca-modelo-de-chassi';
import { MarcaModeloDeCarroceriaService } from 'src/app/services/marca-modelo-de-carroceria.service';
import { MarcaModeloDeChassiService } from 'src/app/services/marca-modelo-de-chassi.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-marcas-modelos-de-carroceria-crud',
  templateUrl: './user-marcas-modelos-de-carroceria-crud.component.html',
  styleUrls: ['./user-marcas-modelos-de-carroceria-crud.component.css']
})
export class UserMarcasModelosDeCarroceriaCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: MarcaModeloDeCarroceria;

  constructor(
    private formBuilder: FormBuilder,
    private marcaModeloCarroceriaService: MarcaModeloDeCarroceriaService,
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
        modelo: new FormControl('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
        }),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.marcaModeloCarroceriaService.get(parseInt(idSelected)).toPromise();

        this.form.controls['descricao'].setValue(this.crudObj.descricao);
        this.form.controls['modelo'].setValue(this.crudObj.descricao);
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
        await this.marcaModeloCarroceriaService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.marcaModeloCarroceriaService.create(formInput).toPromise();
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
      await this.marcaModeloCarroceriaService.delete(this.crudObj.id).toPromise();
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
