/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserMensagensEnvioFiscalComponent } from './user-mensagens-envio-fiscal.component';

describe('UserMensagensEnvioFiscalComponent', () => {
  let component: UserMensagensEnvioFiscalComponent;
  let fixture: ComponentFixture<UserMensagensEnvioFiscalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMensagensEnvioFiscalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMensagensEnvioFiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
