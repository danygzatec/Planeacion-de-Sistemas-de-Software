import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalSuccessfulComponent } from './approval-successful.component';

describe('ApprovalSuccessfulComponent', () => {
  let component: ApprovalSuccessfulComponent;
  let fixture: ComponentFixture<ApprovalSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalSuccessfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
