/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserFormulario4TransfpermtransptaxiComponent } from './user-formulario4-transfpermtransptaxi.component';

describe('UserFormulario4TransfpermtransptaxiComponent', () => {
  let component: UserFormulario4TransfpermtransptaxiComponent;
  let fixture: ComponentFixture<UserFormulario4TransfpermtransptaxiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormulario4TransfpermtransptaxiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario4TransfpermtransptaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
