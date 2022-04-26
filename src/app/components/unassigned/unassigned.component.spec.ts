import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedComponent } from './unassigned.component';

describe('UnassignedComponent', () => {
  let component: UnassignedComponent;
  let fixture: ComponentFixture<UnassignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnassignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
