/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserAlvaraPagamentoInformarPagamentoComponent } from './user-alvara-pagamento-informar-pagamento.component';

describe('UserAlvaraPagamentoInformarPagamentoComponent', () => {
  let component: UserAlvaraPagamentoInformarPagamentoComponent;
  let fixture: ComponentFixture<UserAlvaraPagamentoInformarPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAlvaraPagamentoInformarPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAlvaraPagamentoInformarPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
