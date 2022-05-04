import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Evaluacion360Component } from './evaluacion360.component';

describe('Evaluacion360Component', () => {
  let component: Evaluacion360Component;
  let fixture: ComponentFixture<Evaluacion360Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Evaluacion360Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Evaluacion360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
