import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedModule } from 'src/app/shared/shared-module';

@Component({
  selector: 'app-user-recuperar-senha',
  templateUrl: './user-recuperar-senha.component.html',
  styleUrls: ['./user-recuperar-senha.component.css']
})
export class UserRecuperarSenhaComponent implements OnInit {

  formEmailRecoveryCode: FormGroup
  formRecoveryCode: FormGroup
  formNewPassword: FormGroup
  errorMessage: string
  loading: boolean = false;

  codigoEnviado = false;
  codigoVerificado = false;

  constructor(
    private formBuilder: FormBuilder,
    //private loginService: LoginService,
    private router: Router,
    //private localStorageService: LocalStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.formEmailRecoveryCode = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
    })
    this.formRecoveryCode = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      code: new FormControl('', {
        validators: [Validators.required],
      }),
    })
    this.formNewPassword = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      code: new FormControl('', {
        validators: [Validators.required],
      }),
      password: this.formBuilder.control('', [Validators.required, Validators.pattern(SharedModule.passPatern)]),
    })
  }

  async enviarCodigo(v: any) {
    this.loading = true;
    this.errorMessage = "";
    this.codigoEnviado = false;
    this.codigoVerificado = false;
    this.formEmailRecoveryCode.reset();
    this.formRecoveryCode.reset();
    this.formNewPassword.reset();
    try {
      await this.authService.generateRecoveryCode(v['email']).toPromise();

      this.formRecoveryCode.controls['email'].setValue(v['email']);

      this.codigoEnviado = true;
    } catch (e: any) {
      console.error(e);
      this.errorMessage = "Ocorreu um problema ao enviar o código!";
    }
    this.loading = false;
  }

  async verificarCodigo(v: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.authService.checkRecoveryCode(v['email'], v['code']).toPromise();

      this.formNewPassword.controls['email'].setValue(v['email']);
      this.formNewPassword.controls['code'].setValue(v['code']);

      this.codigoVerificado = true;
    } catch (e: any) {
      console.error(e);
      this.errorMessage = "Ocorreu um problema ao validar o código!";
    }
    this.loading = false;
  }

  async salvarSenha(v: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.authService.recoveryPassword(v['email'], v['code'], v['password']).toPromise();

      this.router.navigate(['/login']);
    } catch (e: any) {
      console.error(e);
      this.errorMessage = "Ocorreu um problema ao validar o código!";
    }
    this.loading = false;
  }

}
