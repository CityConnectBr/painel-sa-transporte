/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserMensagensEnvioPermissionarioComponent } from './user-mensagens-envio-permissionario.component';

describe('UserMensagensEnvioPermissionarioComponent', () => {
  let component: UserMensagensEnvioPermissionarioComponent;
  let fixture: ComponentFixture<UserMensagensEnvioPermissionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMensagensEnvioPermissionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMensagensEnvioPermissionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
