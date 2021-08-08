import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedModule } from 'src/app/shared/shared-module';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  form: FormGroup
  errorMessage: string
  loading:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    //private loginService: LoginService,
    private router: Router,
    //private localStorageService: LocalStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: new FormControl('', {
        validators: [Validators.required],
      }),
      password: this.formBuilder.control('', [Validators.required]),
    })
  }

  async login(v: any) {
    this.loading = true;
    this.errorMessage = "";
    try {
      await this.authService.login(v['login'], v['password']).toPromise();

      this.router.navigate(['user/']);
    } catch (e: any) {
      if (e instanceof HttpErrorResponse && e["status"] == 401) {
        this.errorMessage = "Login ou senha inválido!";
      } else {
        this.errorMessage = SharedModule.handleError(e);
      }
    }
    this.loading = false;
  }

}
