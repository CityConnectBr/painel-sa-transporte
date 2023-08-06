/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserRelDocumentosPermissionarioExpiradosComponent } from './user-rel-documentos-permissionario-expirados.component';

describe('UserRelDocumentosPermissionarioExpiradosComponent', () => {
  let component: UserRelDocumentosPermissionarioExpiradosComponent;
  let fixture: ComponentFixture<UserRelDocumentosPermissionarioExpiradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRelDocumentosPermissionarioExpiradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRelDocumentosPermissionarioExpiradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
