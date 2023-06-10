/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario16solressarcimentoComponent } from './user-formulario16solressarcimento.component';

describe('UserFormulario16solressarcimentoComponent', () => {
  let component: UserFormulario16solressarcimentoComponent;
  let fixture: ComponentFixture<UserFormulario16solressarcimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario16solressarcimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario16solressarcimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
