/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario127declaracaoparatransporteescolarComponent } from './user-formulario127declaracaoparatransporteescolar.component';

describe('UserFormulario127declaracaoparatransporteescolarComponent', () => {
  let component: UserFormulario127declaracaoparatransporteescolarComponent;
  let fixture: ComponentFixture<UserFormulario127declaracaoparatransporteescolarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario127declaracaoparatransporteescolarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario127declaracaoparatransporteescolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
