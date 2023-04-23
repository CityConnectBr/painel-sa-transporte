import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { AnexoDoVeiculo } from 'src/app/models/anexo-do-veiculo';
import { Veiculo } from 'src/app/models/veiculo';
import { AnexoDoVeiculoService } from 'src/app/services/anexo-do-veiculo.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-veiculos-alterar-anexos',
  templateUrl: './user-veiculos-alterar-anexos.component.html',
  styleUrls: ['./user-veiculos-alterar-anexos.component.css']
})
export class UserVeiculosAlterarAnexosComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  veiculo: Veiculo;

  anexosDoVeiculo: AnexoDoVeiculo[];

  fileToUpload: File | null = null;

  idParaDelecao: string;

  constructor(
    private formBuilder: FormBuilder,
    private veiculoService: VeiculoService,
    private anexoDoVeiculoService: AnexoDoVeiculoService,
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
      this.veiculo = await this.veiculoService.get(idSelected).pipe(first()).toPromise();

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
      await this.anexoDoVeiculoService.indexByPermissionario(this.veiculo.id.toString()).pipe(first()).toPromise();

    this.anexosDoVeiculo = data;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      formInput.veiculo_id = this.veiculo.id;

      await this.anexoDoVeiculoService.createWithUpload(formInput, this.fileToUpload).pipe(first()).toPromise();

      this.load();

      this.snackbarService.openSnackBarSucess('Anexo salvo!');
      this.form.reset();
    } catch (e: any) {
      this.errorMessage = SharedModule.handleError(e);
    }
    this.loading = false;
  }

  async download(id: string) {
    this.anexoDoVeiculoService.get(id)
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
      await this.anexoDoVeiculoService.delete(this.idParaDelecao).pipe(first()).toPromise();

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
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  }

}
