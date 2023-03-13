import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Employee } from 'src/entities/employee';

@Component({
  selector: 'app-employee-start',
  templateUrl: './employee-start.component.html',
  styleUrls: ['./employee-start.component.scss'],
})
export class EmployeeStartComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeService
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
                key
              );
              this.employees.push(employeeMapped);
            });
          }
        })
      )
      .subscribe();
  }

  viewEmployee(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  editEmployee(id: string): void {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  onEmployeeDelete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete this employee?',
        buttonText: {
          ok: 'Save',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.employeeService.deleteEmployee(id);
        this.employees = this.employees.filter(
          (employee) => employee.id !== id
        );
      }
    });
  }
}
