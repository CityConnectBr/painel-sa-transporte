/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserRelCursosMonitorVencidosComponent } from './user-rel-cursos-monitor-vencidos.component';

describe('UserRelCursosMonitorVencidosComponent', () => {
  let component: UserRelCursosMonitorVencidosComponent;
  let fixture: ComponentFixture<UserRelCursosMonitorVencidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRelCursosMonitorVencidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRelCursosMonitorVencidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
