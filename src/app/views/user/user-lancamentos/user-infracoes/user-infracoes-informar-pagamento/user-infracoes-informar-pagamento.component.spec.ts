/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserInfracoesInformarPagamentoComponent } from './user-infracoes-informar-pagamento.component';

describe('UserInfracoesInformarPagamentoComponent', () => {
  let component: UserInfracoesInformarPagamentoComponent;
  let fixture: ComponentFixture<UserInfracoesInformarPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfracoesInformarPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfracoesInformarPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
