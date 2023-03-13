import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/entities/employee';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent {
  id: string;
  editMode = false;
  createForm = this.formBuilder.group({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    salary: '',
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.editMode) {
      this.employeeService
        .getEmployee(this.id)
        .subscribe((responseEmployee) => {
          this.createForm = this.formBuilder.group({
            name: responseEmployee.name,
            email: responseEmployee.email,
            phone: responseEmployee.phone,
            dateOfBirth: responseEmployee.dateOfBirth,
            salary: responseEmployee.salary,
          });
        });
    }
  }

  onSubmit(): void {
    let employee = new Employee(
      this.createForm.value.name,
      this.createForm.value.email,
      this.createForm.value.phone,
      this.createForm.value.dateOfBirth,
      this.createForm.value.salary
    );

    if (this.editMode) {
      this.employeeService.updateEmloyee(this.id, employee);
    } else {
      employee.numberTasks = 0;
      this.employeeService.createEmployee(employee);
    }
    this.createForm.reset();
    this.router.navigate([''], { relativeTo: this.route });
  }
}
