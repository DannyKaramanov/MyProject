import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeStartComponent } from './employee-start.component';

describe('EmployeeStartComponent', () => {
  let component: EmployeeStartComponent;
  let fixture: ComponentFixture<EmployeeStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
