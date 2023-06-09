/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario3TransfpermtransptaxiComponent } from './user-formulario3-transfpermtransptaxi.component';

describe('UserFormulario3TransfpermtransptaxiComponent', () => {
  let component: UserFormulario3TransfpermtransptaxiComponent;
  let fixture: ComponentFixture<UserFormulario3TransfpermtransptaxiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario3TransfpermtransptaxiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario3TransfpermtransptaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
