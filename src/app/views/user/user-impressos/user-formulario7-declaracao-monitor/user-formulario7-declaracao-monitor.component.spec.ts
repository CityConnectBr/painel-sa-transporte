import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormulario7DeclaracaoMonitorComponent } from './user-formulario7-declaracao-monitor.component';

describe('UserFormulario7DeclaracaoMonitorComponent', () => {
  let component: UserFormulario7DeclaracaoMonitorComponent;
  let fixture: ComponentFixture<UserFormulario7DeclaracaoMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormulario7DeclaracaoMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormulario7DeclaracaoMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
