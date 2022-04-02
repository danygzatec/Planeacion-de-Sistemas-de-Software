import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarEquiposComponent } from './consultar-equipos.component';

describe('ConsultarEquiposComponent', () => {
  let component: ConsultarEquiposComponent;
  let fixture: ComponentFixture<ConsultarEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
