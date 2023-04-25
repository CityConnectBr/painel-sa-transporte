import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { FMP } from 'src/app/models/fmp';
import { Moeda } from 'src/app/models/moeda';
import { FMPService } from 'src/app/services/fmp.service';
import { MoedaService } from 'src/app/services/moeda.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-fmp-crud',
  templateUrl: './user-fmp-crud.component.html',
  styleUrls: ['./user-fmp-crud.component.css']
})
export class UserFmpCrudComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: FMP;

  moedas: Moeda[];

  maskDate = SharedModule.textMaskDate;

  constructor(
    private formBuilder: FormBuilder,
    private fmpService: FMPService,
    private moedaService: MoedaService,
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
      this.moedas = await this.moedaService.index().pipe(first()).toPromise();
      const idSelected: string = this.route.snapshot.paramMap.get('id');

      ///////FORM
      this.form = this.formBuilder.group({
        descricao: new FormControl('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
        }),
        data_inicial: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.datePattern)],
        }),
        data_final: new FormControl('', {
          validators: [Validators.required, Validators.pattern(SharedModule.datePattern)],
        }),
        valor: new FormControl('', {
          validators: [Validators.required],
        }),
        moeda_id: new FormControl('', {
          validators: [Validators.required],
        }),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.fmpService.get(parseInt(idSelected)).toPromise();

        //formatando datas
        this.crudObj = SharedModule.formatAllFieldsDateToddMMyyyy(this.crudObj);

        this.form.controls['descricao'].setValue(this.crudObj.descricao);
        this.form.controls['data_inicial'].setValue(this.crudObj.data_inicial);
        this.form.controls['data_final'].setValue(this.crudObj.data_final);
        this.form.controls['valor'].setValue(this.crudObj.valor);
        this.form.controls['moeda_id'].setValue(this.crudObj.moeda_id);
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

      formInput = SharedModule.convertAllFieldsddMMyyyyToyyyyMMdd(formInput);

      if (this.crudObj) {
        await this.fmpService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.fmpService.create(formInput).toPromise();
      }
      this.toastr.success('FMP salvo!');
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
      await this.fmpService.delete(this.crudObj.id).toPromise();
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
