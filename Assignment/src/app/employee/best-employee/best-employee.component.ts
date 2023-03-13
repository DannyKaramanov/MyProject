import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { map } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/entities/employee';

@Component({
  selector: 'app-best-employee',
  templateUrl: './best-employee.component.html',
  styleUrls: ['./best-employee.component.scss'],
})
export class BestEmployeeComponent implements OnInit {
  bestEmployee: Employee;
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeService
      .getAllEmployees()
      .pipe(
        map((response: any) => {
          let employees: Employee[] = [];
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
              employees.push(employeeMapped);
            });
          }
          return employees;
        })
      )
      .subscribe((mappedEmployees) => {
        mappedEmployees.sort((a, b) => (b.numberTasks, 10 - a.numberTasks, 10));
        this.bestEmployee = mappedEmployees[0];
      });
  }
}
