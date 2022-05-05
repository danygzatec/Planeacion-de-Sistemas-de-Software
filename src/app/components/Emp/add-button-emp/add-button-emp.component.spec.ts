import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddButtonEmpComponent } from './add-button-emp.component';

describe('AddButtonEmpComponent', () => {
  let component: AddButtonEmpComponent;
  let fixture: ComponentFixture<AddButtonEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddButtonEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddButtonEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
