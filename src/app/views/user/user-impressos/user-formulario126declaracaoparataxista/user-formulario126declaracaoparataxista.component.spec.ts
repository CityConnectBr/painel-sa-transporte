/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario126declaracaoparataxistaComponent } from './user-formulario126declaracaoparataxista.component';

describe('UserFormulario126declaracaoparataxistaComponent', () => {
  let component: UserFormulario126declaracaoparataxistaComponent;
  let fixture: ComponentFixture<UserFormulario126declaracaoparataxistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario126declaracaoparataxistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario126declaracaoparataxistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
