import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedTeamComponent } from './unassigned-team.component';

describe('UnassignedTeamComponent', () => {
  let component: UnassignedTeamComponent;
  let fixture: ComponentFixture<UnassignedTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnassignedTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
