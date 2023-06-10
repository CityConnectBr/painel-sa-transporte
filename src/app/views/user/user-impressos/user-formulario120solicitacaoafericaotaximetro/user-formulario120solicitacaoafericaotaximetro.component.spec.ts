/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario120solicitacaoafericaotaximetroComponent } from './user-formulario120solicitacaoafericaotaximetro.component';

describe('UserFormulario120solicitacaoafericaotaximetroComponent', () => {
  let component: UserFormulario120solicitacaoafericaotaximetroComponent;
  let fixture: ComponentFixture<UserFormulario120solicitacaoafericaotaximetroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario120solicitacaoafericaotaximetroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario120solicitacaoafericaotaximetroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
