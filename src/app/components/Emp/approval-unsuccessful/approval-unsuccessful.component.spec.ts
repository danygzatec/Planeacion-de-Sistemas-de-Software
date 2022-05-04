import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalUnsuccessfulComponent } from './approval-unsuccessful.component';

describe('ApprovalUnsuccessfulComponent', () => {
  let component: ApprovalUnsuccessfulComponent;
  let fixture: ComponentFixture<ApprovalUnsuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalUnsuccessfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalUnsuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
