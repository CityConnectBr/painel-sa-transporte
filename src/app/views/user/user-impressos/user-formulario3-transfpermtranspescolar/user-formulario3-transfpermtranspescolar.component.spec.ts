/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario3TransfpermtranspescolarComponent } from './user-formulario3-transfpermtranspescolar.component';

describe('UserFormulario3TransfpermtranspescolarComponent', () => {
  let component: UserFormulario3TransfpermtranspescolarComponent;
  let fixture: ComponentFixture<UserFormulario3TransfpermtranspescolarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario3TransfpermtranspescolarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario3TransfpermtranspescolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
