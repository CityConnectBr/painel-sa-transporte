/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserMensagensEnviadasComponent } from './user-mensagens-enviadas.component';

describe('UserMensagensEnviadasComponent', () => {
  let component: UserMensagensEnviadasComponent;
  let fixture: ComponentFixture<UserMensagensEnviadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMensagensEnviadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMensagensEnviadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
