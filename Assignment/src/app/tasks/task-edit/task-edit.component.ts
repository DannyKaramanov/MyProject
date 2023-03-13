import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskService } from 'src/app/services/task.service';
import { Employee } from 'src/entities/employee';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit {
  id: string;
  editMode = false;
  taskForm: FormGroup;
  employees: Employee[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private employeesService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.taskService.getAllTasks();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  getAllEmployees() {
    this.employeesService
      .getAllEmployees()
      .pipe(
        map((response: any) => {
          if (response) {
            Object.keys(response).forEach((key) => {
              const objectValues = response[key];
              let employeeMapped = new Employee(
                objectValues.name,
                objectValues.email,
                objectValues.phone,
                objectValues.dateOfBirth,
                objectValues.salary,
                key,
                objectValues.numberTasks
              );
              this.employees.push(employeeMapped);
            });
          }
        })
      )
      .subscribe();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  initForm() {
    let title = '';
    let description = '';
    let assignee = '';
    let dueDate = '';

    if (this.editMode) {
      this.taskService.getTask(this.id).subscribe((responseTask) => {
        title = responseTask.title;
        description = responseTask.description;
        assignee = responseTask.assignee;
        dueDate = responseTask.dueDate;

        this.taskForm = new FormGroup({
          title: new FormControl(title, Validators.required),
          description: new FormControl(description, Validators.required),
          assignee: new FormControl(assignee, Validators.required),
          dueDate: new FormControl(new Date(), Validators.required),
        });
      });
    }

    this.taskForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      assignee: new FormControl(assignee, Validators.required),
      dueDate: new FormControl(new Date(), Validators.required),
    });
  }

  onSubmit() {
    let employeeSelected = this.employees.find(
      (employee) => employee.id === this.taskForm.value.assignee
    );
    if (this.editMode) {
      this.taskService.updateItem(this.id, this.taskForm.value);
    } else {
      this.taskService.createItem(this.taskForm.value);
    }
    this.taskForm.reset();
    this.taskService.employeeUpdatedAssignedTasks(
      employeeSelected.id,
      employeeSelected,
      employeeSelected.numberTasks + 1
    );
    this.router.navigate([''], { relativeTo: this.route });
  }
}
