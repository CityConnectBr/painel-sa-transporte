/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario131substituicaodeveiculoComponent } from './user-formulario131substituicaodeveiculo.component';

describe('UserFormulario131substituicaodeveiculoComponent', () => {
  let component: UserFormulario131substituicaodeveiculoComponent;
  let fixture: ComponentFixture<UserFormulario131substituicaodeveiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario131substituicaodeveiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario131substituicaodeveiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
