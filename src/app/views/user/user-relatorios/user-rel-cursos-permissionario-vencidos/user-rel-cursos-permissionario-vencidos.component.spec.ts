/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserRelCursosPermissionarioVencidosComponent } from './user-rel-cursos-permissionario-vencidos.component';

describe('UserRelCursosPermissionarioVencidosComponent', () => {
  let component: UserRelCursosPermissionarioVencidosComponent;
  let fixture: ComponentFixture<UserRelCursosPermissionarioVencidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRelCursosPermissionarioVencidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRelCursosPermissionarioVencidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
