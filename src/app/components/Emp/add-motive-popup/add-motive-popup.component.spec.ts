import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMotivePopupComponent } from './add-motive-popup.component';

describe('AddMotivePopupComponent', () => {
  let component: AddMotivePopupComponent;
  let fixture: ComponentFixture<AddMotivePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMotivePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMotivePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
