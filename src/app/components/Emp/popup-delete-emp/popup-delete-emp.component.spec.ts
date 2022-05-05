import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteEmpComponent } from './popup-delete-emp.component';

describe('PopupDeleteEmpComponent', () => {
  let component: PopupDeleteEmpComponent;
  let fixture: ComponentFixture<PopupDeleteEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDeleteEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeleteEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
