/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario18soltranspensinoComponent } from './user-formulario18soltranspensino.component';

describe('UserFormulario18soltranspensinoComponent', () => {
  let component: UserFormulario18soltranspensinoComponent;
  let fixture: ComponentFixture<UserFormulario18soltranspensinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario18soltranspensinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario18soltranspensinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
