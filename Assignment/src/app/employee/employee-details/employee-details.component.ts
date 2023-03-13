import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { take } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/entities/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent {
  id: string;
  employee: Employee;
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.employeeService.getEmployee(this.id).pipe(take(1)).subscribe((viewEmployee) => {
        this.employee = viewEmployee;
      });
    });
  }
}
