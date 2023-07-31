/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario135alvaraPermissaoComponent } from './user-formulario135alvara-permissao.component';

describe('UserFormulario135alvaraPermissaoComponent', () => {
  let component: UserFormulario135alvaraPermissaoComponent;
  let fixture: ComponentFixture<UserFormulario135alvaraPermissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario135alvaraPermissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario135alvaraPermissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
