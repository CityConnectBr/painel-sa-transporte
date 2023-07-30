/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserPermissionarioAlterarAlunosComponent } from './user-permissionario-alterar-alunos.component';

describe('UserPermissionarioAlterarAlunosComponent', () => {
  let component: UserPermissionarioAlterarAlunosComponent;
  let fixture: ComponentFixture<UserPermissionarioAlterarAlunosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPermissionarioAlterarAlunosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermissionarioAlterarAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
