/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserRelCursosCondutorVencidosComponent } from './user-rel-cursos-condutor-vencidos.component';

describe('UserRelCursosCondutorVencidosComponent', () => {
  let component: UserRelCursosCondutorVencidosComponent;
  let fixture: ComponentFixture<UserRelCursosCondutorVencidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRelCursosCondutorVencidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRelCursosCondutorVencidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
