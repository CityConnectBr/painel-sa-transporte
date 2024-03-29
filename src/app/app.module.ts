import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared-module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptores/auth.interceptor';
import { UserLoginComponent } from './views/user/user-login/user-login.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LoggedInGuard } from './security/loggedin.guard';
import { UserRecuperarSenhaComponent } from './views/user/user-recuperar-senha/user-recuperar-senha.component';
import { ClipboardModule } from 'ngx-clipboard';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from "ngx-currency";
import { ToastrModule } from 'ngx-toastr';

registerLocaleData(localePt, 'pt');

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRecuperarSenhaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    SharedModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    NoopAnimationsModule,
    ClipboardModule,
    PdfViewerModule,
    NgxCurrencyModule,
  ],
  providers: [
    LoggedInGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
