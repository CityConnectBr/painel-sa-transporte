/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario5ReqsubstveiculoComponent } from './user-formulario5-reqsubstveiculo.component';

describe('UserFormulario5ReqsubstveiculoComponent', () => {
  let component: UserFormulario5ReqsubstveiculoComponent;
  let fixture: ComponentFixture<UserFormulario5ReqsubstveiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario5ReqsubstveiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario5ReqsubstveiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
