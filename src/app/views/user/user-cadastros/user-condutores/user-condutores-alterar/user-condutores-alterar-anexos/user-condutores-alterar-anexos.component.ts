import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { AnexoDoCondutor } from 'src/app/models/anexo-do-condutor';
import { Condutor } from 'src/app/models/condutores';
import { AnexoDoCondutorService } from 'src/app/services/anexo-do-condutor.service';
import { CondutorService } from 'src/app/services/condutor.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-condutores-alterar-anexos',
  templateUrl: './user-condutores-alterar-anexos.component.html',
  styleUrls: ['./user-condutores-alterar-anexos.component.css']
})
export class UserCondutoresAlterarAnexosComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  condutor: Condutor;

  anexosDoCondutor: AnexoDoCondutor[];

  fileToUpload: File | null = null;

  idParaDelecao: string;

  constructor(
    private formBuilder: FormBuilder,
    private condutorService: CondutorService,
    private anexoDoCondutorService: AnexoDoCondutorService,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
    private modal: NgbModal,
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = "";
    try {
      const idSelected: string = this.route.parent.snapshot.paramMap.get('id');
      this.condutor = await this.condutorService.get(idSelected).pipe(first()).toPromise();

      await this.load();

      ///////FORM
      this.form = this.formBuilder.group({
        file: new FormControl("", {
          validators: [Validators.required],
        }),
        descricao: new FormControl("", {
          validators: [Validators.required, Validators.maxLength(60)],
        }),
      });
    } catch (e: any) {
      console.error(e);
      this.errorMessage = "Ocorreu um erro ao montar a página";
    }
    this.loading = false;
  }

  private async load() {

    const { data } =
      await this.anexoDoCondutorService.indexByCondutor(this.condutor.id.toString()).pipe(first()).toPromise();

    this.anexosDoCondutor = data;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      formInput.condutor_id = this.condutor.id;
      await this.anexoDoCondutorService.createWithUpload(formInput, this.fileToUpload).pipe(first()).toPromise();

      this.load();

      this.snackbarService.openSnackBarSucess('Anexo salvo!');
      this.form.reset();
    } catch (e: any) {
      console.error(e);
      //this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  async download(id: string) {
    this.anexoDoCondutorService.get(id)
      .subscribe((resultBlob: Blob) => {
        var downloadURL = URL.createObjectURL(resultBlob);
        window.open(downloadURL);
      });
  }

  setIdParaDelecao(id: string) {
    this.idParaDelecao = id;
  }

  async deletar() {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.anexoDoCondutorService.delete(this.idParaDelecao).pipe(first()).toPromise();

      this.load();

      this.snackbarService.openSnackBarSucess('Anexo deletado!');
      this.closeModal(null);
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  closeModal(event: any) {
    return this.modal.dismissAll()
  }

  openModal(content: any) {
    this.modal.open(content)
  }

  handleFileInput(event: any){
    if (event.target.files && event.target.files[0]) {
      this.fileToUpload = event.target.files[0];
    }
  }

}
