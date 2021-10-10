import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { EmpresaVistoriadora } from 'src/app/models/empresa-vistoriadora';
import { Vistoriador } from 'src/app/models/vistoriador';
import { EmpresaVistoriadoraService } from 'src/app/services/empresa_vistoriadora.service';
import { VistoriadorService } from 'src/app/services/vistoriador.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-vistoriadores-crud',
  templateUrl: './user-vistoriadores-crud.component.html',
  styleUrls: ['./user-vistoriadores-crud.component.css']
})
export class UserVistoriadoresCrudComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  crudObj: Vistoriador;

  subjectEmpresa: Subject<any> = new Subject();

  empresasPesquisados: Map<String, String> = new Map();
  empresaSelecionada: EmpresaVistoriadora;

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaVistoriadoraService,
    private vistoriadorService: VistoriadorService,
    private location: Location,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
    private modal: NgbModal,
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = "";

    try {
      this.subjectEmpresa
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.searchEmpresa();
        }
        );

      const idSelected: string = this.route.snapshot.paramMap.get('id');

      ///////FORM
      this.form = this.formBuilder.group({
        nome: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
        }),
        cargo: new FormControl('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
        }),
        empresa: new FormControl("", {
          validators: [],
        }),
      });

      ///////SET IN FORM
      if (idSelected) {
        this.crudObj = await this.vistoriadorService.get(parseInt(idSelected)).toPromise();
        if(this.crudObj.empresa_vistoriadora_id){
          this.empresaSelecionada = await this.empresaService.get(this.crudObj.empresa_vistoriadora_id).pipe(first()).toPromise();
          this.setEmpresa(this.empresaSelecionada.id);
          this.form.controls['empresa'].setValue(this.empresaSelecionada.nome);
        }

        this.form.controls['nome'].setValue(this.crudObj.nome);
        this.form.controls['cargo'].setValue(this.crudObj.cargo);
      }

    } catch (e: any) {
      console.log(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  ngOnDestroy() {
    this.subjectEmpresa.unsubscribe();
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {

      if(this.empresaSelecionada){
        formInput.empresa_vistoriadora_id = this.empresaSelecionada.id;
      }else{
        formInput.empresa_vistoriadora_id = null;
      }

      if (this.crudObj) {
        await this.vistoriadorService.update(this.crudObj.id, formInput).toPromise();
      } else {
        await this.vistoriadorService.create(formInput).toPromise();
      }
      this.snackbarService.openSnackBarSucess('Vistoriador salva!');
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
      await this.vistoriadorService.delete(this.crudObj.id).toPromise();
      this.modal.dismissAll()
      this.snackbarService.openSnackBarSucess('Excluido com Sucesso!');
      this.location.back()
    } catch (e: any) {
      this.modal.dismissAll()
      this.errorMessage = "Este não pode ser excluido!";
    }
    this.loading = false;
  }

  public async searchEmpresa() {
    try {
      this.empresaSelecionada = null;
      const result = await this.empresaService.index()
        .pipe(first())
        .toPromise();

      this.empresasPesquisados.clear();
      result.forEach((empresa: EmpresaVistoriadora) => {
        this.empresasPesquisados.set(`${empresa.id}`, empresa.nome);
      });

    } catch (e: any) {
      this.snackbarService.openSnackBarError("Ocorreu um erro ao pesquisar.");
    }
  }

  public keyUpEmpresa() {
    this.subjectEmpresa.next();
  }

  public async setEmpresa(event) {
    try {
      if (event) {
        this.form.controls['empresa'].setValue("Carregando...");
        this.empresaSelecionada = await this.empresaService.get(event).pipe(first()).toPromise();
        this.form.controls['empresa'].setValue(this.empresaSelecionada.nome);
      }
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
  }

  public setFocusEmpresaInput(focus: boolean) {
    if (focus) {
      this.searchEmpresa();
    }
  }

  closeModal(event: any) {
    return this.modal.dismissAll()
  }

  openModal(content: any) {
    this.modal.open(content)
  }

}
