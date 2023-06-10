/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario9declaracaoatenddispostoComponent } from './user-formulario9declaracaoatenddisposto.component';

describe('UserFormulario9declaracaoatenddispostoComponent', () => {
  let component: UserFormulario9declaracaoatenddispostoComponent;
  let fixture: ComponentFixture<UserFormulario9declaracaoatenddispostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario9declaracaoatenddispostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario9declaracaoatenddispostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
