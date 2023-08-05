import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, first, map } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModalidadeServiceWithoutCrud {
  mainService: MainService;
  constructor(injector: Injector, private httpClient: HttpClient) {
    this.mainService = injector.get<MainService>(MainService);
  }

  index(): Observable<any[]> {
    return this.httpClient
      .get<any>(
        `${environment.apiUrl}/api/admin/modalidades`,
        this.mainService.getHttpOptions
      )
      .pipe(
        first(),
        map((result) => result['data'])
      );
  }
}
