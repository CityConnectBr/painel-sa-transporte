import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SearchData } from 'src/app/services/basic-crud.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user-usuarios',
  templateUrl: './user-usuarios.component.html',
  styleUrls: ['./user-usuarios.component.css'],
})
export class UserUsuariosComponent implements OnInit {
  loading: boolean = false;

  searchText: string = '';
  dataSearch: SearchData;

  formAssinatura: FormGroup;

  assinatura: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadList(1);

    this.formAssinatura = this.formBuilder.group({
      assinatura: ['', [Validators.required]],
      usuario_id: ['', [Validators.required]],
    });
  }

  public async loadList(page: number) {
    this.loading = true;
    try {
      this.dataSearch = await this.usuarioService
        .search(this.searchText, page)
        .toPromise();
    } catch (e) {
      this.dataSearch = null;
    }
    this.loading = false;
  }

  public search(text: string = '') {
    this.searchText = text;
    this.loadList(1);
  }

  public changePos(page: number) {
    this.loadList(page && page > 0 ? page : 1);
  }

  alterar(id: number) {
    this.router.navigate(['alterar/' + id], { relativeTo: this.route });
  }

  iniAlterarAssinatura(modal: any, id: number) {
    this.formAssinatura.reset();
    this.formAssinatura.controls['usuario_id'].setValue(id);
    this.openModal(modal);
  }

  async salvarAssinatura() {
    this.loading = true;
    try {
      if (this.formAssinatura.invalid) {
        this.toastr.error('Arquivo não selecionado', 'Erro');
        return;
      }

      await this.usuarioService
        .saveAssinatura(
          this.formAssinatura.controls['usuario_id'].value,
          this.formAssinatura.controls['assinatura'].value
        )
        .toPromise();

      this.toastr.success('Assinatura alterada com sucesso', 'Sucesso');
    } catch (e: any) {
      this.modal.dismissAll();
    } finally {
      this.loading = false;
    }
  }

  visualizarAssinatura(modal: any, id: string) {
    this.usuarioService.getAssinatura(id).subscribe((resultBlob: Blob) => {
      this.assinatura = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(resultBlob));
      this.openModal(modal);
    });
  }

  closeModal(event: any) {
    return this.modal.dismissAll();
  }

  openModal(content: any) {
    this.modal.open(content);
  }

  handleFileInput(event: any){
    if (event.target.files && event.target.files[0]) {
      this.formAssinatura.controls['assinatura'].setValue(event.target.files[0]);
    }
  }
}
