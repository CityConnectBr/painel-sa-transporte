/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserRelAlvarasExpiradosComponent } from './user-rel-alvaras-expirados.component';

describe('UserRelAlvarasExpiradosComponent', () => {
  let component: UserRelAlvarasExpiradosComponent;
  let fixture: ComponentFixture<UserRelAlvarasExpiradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRelAlvarasExpiradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRelAlvarasExpiradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
