/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario132termodecredenciamentoComponent } from './user-formulario132termodecredenciamento.component';

describe('UserFormulario132termodecredenciamentoComponent', () => {
  let component: UserFormulario132termodecredenciamentoComponent;
  let fixture: ComponentFixture<UserFormulario132termodecredenciamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario132termodecredenciamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario132termodecredenciamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
