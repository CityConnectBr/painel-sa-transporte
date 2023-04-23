import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, first } from 'rxjs/operators';
import { AnexoDoMonitor } from 'src/app/models/anexo-do-monitor';
import { Monitor } from 'src/app/models/monitor';
import { AnexoDoMonitorService } from 'src/app/services/anexo-do-monitor.service';
import { MonitorService } from 'src/app/services/monitor.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { SnackBarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-monitores-alterar-anexos',
  templateUrl: './user-monitores-alterar-anexos.component.html',
  styleUrls: ['./user-monitores-alterar-anexos.component.css']
})
export class UserMonitoresAlterarAnexosComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup
  errorMessage: string

  monitor: Monitor;

  anexosDoMonitor: AnexoDoMonitor[];

  fileToUpload: File | null = null;

  idParaDelecao: string;

  constructor(
    private formBuilder: FormBuilder,
    private monitorService: MonitorService,
    private anexoDoMonitorService: AnexoDoMonitorService,
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
      this.monitor = await this.monitorService.get(idSelected).pipe(first()).toPromise();

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
      await this.anexoDoMonitorService.indexByCondutor(this.monitor.id.toString()).pipe(first()).toPromise();

    this.anexosDoMonitor = data;
  }

  async salvar(formInput: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      formInput.monitor_id = this.monitor.id;
      await this.anexoDoMonitorService.createWithUpload(formInput, this.fileToUpload).pipe(first()).toPromise();

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
    this.anexoDoMonitorService.get(id)
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
      await this.anexoDoMonitorService.delete(this.idParaDelecao).pipe(first()).toPromise();

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
