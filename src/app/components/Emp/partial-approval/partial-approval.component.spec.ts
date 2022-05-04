import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialApprovalComponent } from './partial-approval.component';

describe('PartialApprovalComponent', () => {
  let component: PartialApprovalComponent;
  let fixture: ComponentFixture<PartialApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
