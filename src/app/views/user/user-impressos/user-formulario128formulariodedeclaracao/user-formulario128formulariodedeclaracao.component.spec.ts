/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario128formulariodedeclaracaoComponent } from './user-formulario128formulariodedeclaracao.component';

describe('UserFormulario128formulariodedeclaracaoComponent', () => {
  let component: UserFormulario128formulariodedeclaracaoComponent;
  let fixture: ComponentFixture<UserFormulario128formulariodedeclaracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario128formulariodedeclaracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario128formulariodedeclaracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
