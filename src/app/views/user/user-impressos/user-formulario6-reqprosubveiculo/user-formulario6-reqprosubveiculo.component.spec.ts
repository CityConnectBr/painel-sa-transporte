/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario6ReqprosubveiculoComponent } from './user-formulario6-reqprosubveiculo.component';

describe('UserFormulario6ReqprosubveiculoComponent', () => {
  let component: UserFormulario6ReqprosubveiculoComponent;
  let fixture: ComponentFixture<UserFormulario6ReqprosubveiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario6ReqprosubveiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario6ReqprosubveiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
