import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksStartComponent } from './tasks-start.component';

describe('TasksStartComponent', () => {
  let component: TasksStartComponent;
  let fixture: ComponentFixture<TasksStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
