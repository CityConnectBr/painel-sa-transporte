import { NgModule, ModuleWithProviders } from '@angular/core';
import { InputComponent } from './input/input.component';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';
import { FooterSimpleComponent } from './footer-simple/footer-simple.component';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { LoadingSimpleComponent } from './loading-simple/loading-simple.component';
import { SearchComponent } from './search/search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PrintPageComponent } from './print-page/print-page.component';
import { QRCodeModule } from 'angularx-qrcode';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchPermissionarioComponent } from './search-permissionario/search-permissionario.component';
import { PermissionarioTableComponent } from './permissionario-table/permissionario-table.component';
import { SearchQuadroInfracoesComponent } from './search-quadro-infracoes/search-quadro-infracoes.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    InputComponent,
    LoadingComponent,
    ModalComponent,
    FooterSimpleComponent,
    LoadingSimpleComponent,
    SearchComponent,
    PaginationComponent,
    PrintPageComponent,
    SearchPermissionarioComponent,
    PermissionarioTableComponent,
    SearchQuadroInfracoesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    NgbCollapseModule,
    NgxMaskModule.forChild(),
  ],
  exports: [
    InputComponent,
    LoadingComponent,
    ModalComponent,
    FooterSimpleComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSimpleComponent,
    SearchComponent,
    PaginationComponent,
    PrintPageComponent,
    QRCodeModule,
    NgbCollapseModule,
    SearchPermissionarioComponent,
    PermissionarioTableComponent,
    SearchQuadroInfracoesComponent,
  ],
})
export class SharedModule {
  private readonly PASS_DEFAULT = '1';

  static emailPatern =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  static numberPatern = /^[0-9]*$/;
  static numberPaternWithDot = /^[0-9.]*$/;
  static numberPaternWithDotAndComma = /^[0-9.,]*$/;
  static CPFPatern = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/;
  static CPFCNPJPatern =
    /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;
  static passPatern =
    /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  static telefonePattern = /\(\d{2}\)\s?\d{4,5}-\d{4}/;
  static dateHourFromAPIPattern =
    /^\d{4}-(((0)[0-9])|((1)[0-2]))-([0-2][0-9]|(3)[0-1])T(.*)$/;
  static dateFromAPIPattern =
    /^\d{4}-(((0)[0-9])|((1)[0-2]))-([0-2][0-9]|(3)[0-1])$/;
  static datePattern =
    /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  static monthYearPattern = /^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  static hourPattern = /^[0-2][0-9]\:[0-6][0-9]$/;
  static dateWithoutDivisorPattern =
    /^([0-2][0-9]|(3)[0-1])(((0)[0-9])|((1)[0-2]))\d{4}$/;
  static cepPattern = /^([0-9]{5}-[0-9]{3})|([0-9]{8})$/;
  static emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  static cpfPattern = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/;
  static cnpjPattern = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})|(\d{14})$/;

  static textMaskCPFPattern = [
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    '.',
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    '.',
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    '-',
    /[0-9]/,
    /[0-9]/,
  ];
  //static textMaskCNPJPattern = [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  static textMaskPhone8Dattern = [
    '(',
    /[0-9]/,
    /[0-9]/,
    ')',
    ' ',
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    '-',
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
  ];
  static textMaskPhone9Dattern = [
    '(',
    /[0-9]/,
    /[0-9]/,
    ')',
    ' ',
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    '-',
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
  ];
  static textMaskDate = [
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  static textMaskHour = [/[0-2]/, /[0-9]/, ':', /[0-6]/, /[0-9]/];
  static textMaskCEPPattern = [
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    '-',
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
  ];
  static textMaskMountYear = [
    /[0-1]/,
    /[0-9]/,
    '/',
    /[0-2]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
  ];

  static msgError: { [key: string]: string } = {
    'code-c-1': 'Não existem mais conteúdos para exibição!',
    'code-c-2': 'Conteudo não finalizado!',
  };

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }

  static isDateddMMyyyy(value: string): boolean {
    const datePattern =
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    if (!value) return false;

    return value.match(datePattern) ? true : false;
  }

  static setAllFieldsFromFormAsTouched(form: FormGroup) {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  static noAccent(source: string): string {
    source = source.replace(/[àáâãäå]/g, 'a');
    source = source.replace(/[ÀÁÂÃÄÅ]/g, 'A');
    source = source.replace(/[èéêë]/g, 'e');
    source = source.replace(/[ËÉÊÈ]/g, 'E');
    source = source.replace(/[ìíîï]/g, 'i');
    source = source.replace(/[ÌÍÎÏ]/g, 'I');
    source = source.replace(/[ðòóôõöø]/g, 'o');
    source = source.replace(/[ÐÒÓÔÕÖØ]/g, 'O');
    source = source.replace(/[ùúûü]/g, 'u');
    source = source.replace(/[ÙÚÛÜ]/g, 'U');
    source = source.replace(/[ýýÿ]/g, 'y');
    source = source.replace(/[ÝÝŸ]/g, 'Y');
    source = source.replace(/[ç]/g, 'c');
    source = source.replace(/[Ç]/g, 'C');
    source = source.replace(/[ñ]/g, 'n');
    source = source.replace(/[Ñ]/g, 'N');
    source = source.replace(/[š]/g, 's');
    source = source.replace(/[Š]/g, 'S');
    source = source.replace(/[ž]/g, 'z');
    source = source.replace(/[Ž]/g, 'Z');
    source = source.replace(/[æ]/g, 'ae');
    source = source.replace(/[Æ]/g, 'AE');
    source = source.replace(/[œ]/g, 'oe');
    source = source.replace(/[Œ]/g, 'OE');
    return source;
  }

  static readonly estadosCivil = new Map([
    ['S', 'Solteiro(a)'],
    ['C', 'Casado(a)'],
    ['Di', 'Divorciado(a)'],
    ['V', 'Viúvo(a)'],
    ['De', 'Desquitado(a)'],
    ['M', 'Maritalmente'],
    ['O', 'Outro'],
  ]);

  static readonly UFs = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MS',
    'MT',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  static cleanString(txt: string): string {
    return txt
      .trim()
      .replace('-', '')
      .replace('.', '')
      .replace(' ', '')
      .replace('(', '')
      .replace(')', '');
  }

  static htmlEntities(str: string) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  static encrypt(txt: string, pass: string): string {
    return txt;
    //return CryptoJS.AES.encrypt(txt, pass).toString();
  }

  static decrypt(txt: string, pass: string): string {
    return txt;
    //return CryptoJS.AES.decrypt(txt, pass).toString(CryptoJS.enc.Utf8);
  }

  static convertDateTimeToDate(dateTime: any) {
    return new Date(0).setUTCSeconds(dateTime['seconds']);
  }

  static convertAPITimeToDate(str: string): Date | undefined {
    if (
      str.match(this.dateFromAPIPattern) ||
      str.match(this.dateFromAPIPattern)
    ) {
      let yyyy: string = str.substring(0, 4);
      let mm: string = str.substring(5, 7);
      let dd: string = str.substring(8, 10);

      return new Date(mm + '/' + dd + '/' + yyyy);
    }

    return undefined;
  }

  static convertStringddMMyyyyToDate(str: string): Date | undefined {
    if (str.match(this.datePattern)) {
      str = str.replace('/', '');
      str = str.replace('/', '');
    }

    if (str.match(this.dateWithoutDivisorPattern)) {
      let dd: string = str.substring(0, 2);
      let mm: string = str.substring(2, 4);
      let yyyy: string = str.substring(4, 8);
      return new Date(mm + '/' + dd + '/' + yyyy);
    }

    return undefined;
  }

  static convertStringddMMyyyyToyyyyMMdd(str: string): string | undefined {
    if (str.match(this.datePattern)) {
      str = str.replace('/', '');
      str = str.replace('/', '');
    }

    if (str.match(this.dateWithoutDivisorPattern)) {
      let dd: string = str.substring(0, 2);
      let mm: string = str.substring(2, 4);
      let yyyy: string = str.substring(4, 8);
      return yyyy + '-' + mm + '-' + dd;
    }

    return undefined;
  }

  static formatAllFieldsDateToddMMyyyy(obj: any): any {
    //formatando datas
    Object.getOwnPropertyNames(obj).forEach((key) => {
      if (
        obj[key] &&
        obj[key].toString().match(SharedModule.dateFromAPIPattern)
      ) {
        obj[key] = SharedModule.formatDateddMMyyyy(obj[key]);
      }
    });

    return obj;
  }

  static convertAllFieldsTrueFalseToBoolean(obj: any): any {
    Object.getOwnPropertyNames(obj).forEach((key) => {
      if (obj[key] != null && (obj[key] == 'true' || obj[key] == 'false')) {
        obj[key] = obj[key] == 'true' ? true : false;
      }
    });

    return obj;
  }

  static convertAllFields01ToBoolean(obj: any): any {
    Object.getOwnPropertyNames(obj).forEach((key) => {
      if (key.toLowerCase() != 'id' || key.toLowerCase().indexOf('_id') == -1) {
        if (obj[key] == 1 || obj[key] == 0) {
          obj[key] = obj[key] == 1 ? true : false;
        }
      }
    });

    return obj;
  }

  static convertAllFieldsddMMyyyyToyyyyMMdd(obj: any): any {
    Object.getOwnPropertyNames(obj).forEach((key) => {
      if (
        obj[key] != null &&
        obj[key].toString().match(SharedModule.datePattern)
      ) {
        obj[key] = SharedModule.convertStringddMMyyyyToyyyyMMdd(obj[key]);
      }
    });

    return obj;
  }

  static formatDateddMMyyyy(value: string | number | Date): string | undefined {
    try {
      if (!value) return;

      return formatDate(value, 'dd/MM/yyyy', 'pt-br');
    } catch (e) {
      console.error(e);
    }
  }

  static formatDateddDEMMMMDEyyyy(value: Date | any): string | undefined {
    try {
      if (!value) return;

      return formatDate(value, "dd 'de' MMMM 'de' yyyy", 'pt-br');
    } catch (e) {
      console.error(e);
    }
  }

  static formatHourFromAPIToHHmm(value: string): string | undefined {
    try {
      if (!value) return;

      return value.substr(0, 5);
    } catch (e) {
      console.error(e);
    }
  }

  static convertDateToyyyyMMdd(value: Date): string | undefined {
    try {
      if (!value) return;

      return formatDate(value, 'yyyy-MM-dd', 'pt-br');
    } catch (e) {
      console.error(e);
    }
  }

  static formatCEP(value: string): string | undefined {
    try {
      if (value && value.length == 8 && !value.includes('-')) {
        return `${value.substring(0, 5)}-${value.substring(5, 8)}`;
      }

      return value;
    } catch (e) {
      console.error(e);
    }
    return value;
  }

  static handleError(error: any): string {
    let errorMessage: string = '';

    if (error.error['message'] || error.error['messages']) {
      console.error(error);
      if (
        error.error['internal_code'] &&
        this.msgError[error.error['internal_code']]
      ) {
        return this.msgError[error.error['internal_code']];
      } else if (error.error['messages']) {
        const mapped: string[] = Object.keys(error.error['messages']).map(
          (key) => error.error['messages'][key]
        );
        return mapped.map((x) => x).join(', <br>');
      } else {
        return error.error['message'];
      }
    } else {
      if (error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        console.error(error);
        errorMessage = 'Ocorreu um erro ao realizar a ação.'; //error.error.message;
      } else if (error instanceof HttpErrorResponse) {
        if (error.status >= 500) {
          console.error(
            `Código do erro: ${error.status}`,
            `menssagem: ${error.message}`
          );
          errorMessage = 'Ocorreu um erro com o servidor.';
        } else if (error.status >= 400) {
          console.error(error);
          errorMessage = error.message;
        } else {
          console.error(error);
          errorMessage = 'Ocorreu um erro ao se comunicar com o servidor.';
        }
      } else {
        console.error(error);
        throw error;
      }
    }

    return errorMessage;
  }

  static generateRamdonPass(length: number, onlyNumber: boolean = false) {
    var chars = onlyNumber
      ? '123456789'
      : 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
    var pass = '';
    for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    return pass;
  }

  get getLocalKey(): string {
    try {
      var autoK = localStorage.getItem('autoLk');
      if (autoK) {
        return SharedModule.decrypt(autoK, this.PASS_DEFAULT);
      }
    } catch (e) {}

    const nAutoK = SharedModule.generateRamdonPass(32);
    localStorage.setItem(
      'autoLk',
      SharedModule.encrypt(nAutoK, this.PASS_DEFAULT)
    );
    return nAutoK;
  }

  static getStatusSolicitacao(status: string): string {
    if (status && status == 'A') {
      return 'Aceito';
    } else if (status && status == 'R') {
      return 'Recusado';
    } else if (status && status == 'C') {
      return 'Cancelado';
    }
    return 'Aberto';
  }

  static correncyToNumber(value: string): number {
    if (!value) return 0;

    return parseFloat(value.replace(/\./g, '').replace(',', '.'));
  }

  static numberToCorrency(value: number): string {
    if (!value) return '0,00';

    return value.toLocaleString('pt-br', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  static detectTipoPix(value: string): number {
    if (!value) return 0;

    if (value.match(SharedModule.telefonePattern)) {
      return 0;
    } else if (value.match(SharedModule.emailPattern)) {
      return 1;
    } else if (value.match(SharedModule.cpfPattern)) {
      return 2;
    } else if (value.match(SharedModule.cnpjPattern)) {
      return 3;
    } else {
      return 4;
    }
  }

  static getVencimentoPorPlaca(plate: string): number {
    const lastChar = plate.substr(plate.length - 1);

    if (lastChar == '1' || lastChar == '2') {
      return 7;
    } else if (lastChar == '3' || lastChar == '4') {
      return 8;
    } else if (lastChar == '5' || lastChar == '6') {
      return 9;
    } else if (lastChar == '7' || lastChar == '8') {
      return 10;
    } else if (lastChar == '9') {
      return 11;
    } else if (lastChar == '0') {
      return 12;
    }
  }
}
