/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserMensagensEnvioMonitorComponent } from './user-mensagens-envio-monitor.component';

describe('UserMensagensEnvioMonitorComponent', () => {
  let component: UserMensagensEnvioMonitorComponent;
  let fixture: ComponentFixture<UserMensagensEnvioMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMensagensEnvioMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMensagensEnvioMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
