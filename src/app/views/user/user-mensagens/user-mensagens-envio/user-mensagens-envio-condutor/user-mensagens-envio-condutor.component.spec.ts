/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserMensagensEnvioCondutorComponent } from './user-mensagens-envio-condutor.component';

describe('UserMensagensEnvioCondutorComponent', () => {
  let component: UserMensagensEnvioCondutorComponent;
  let fixture: ComponentFixture<UserMensagensEnvioCondutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMensagensEnvioCondutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMensagensEnvioCondutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
