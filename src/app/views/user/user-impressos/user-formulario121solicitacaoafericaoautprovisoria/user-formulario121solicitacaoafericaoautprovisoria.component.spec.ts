/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario121solicitacaoafericaoautprovisoriaComponent } from './user-formulario121solicitacaoafericaoautprovisoria.component';

describe('UserFormulario121solicitacaoafericaoautprovisoriaComponent', () => {
  let component: UserFormulario121solicitacaoafericaoautprovisoriaComponent;
  let fixture: ComponentFixture<UserFormulario121solicitacaoafericaoautprovisoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario121solicitacaoafericaoautprovisoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario121solicitacaoafericaoautprovisoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
