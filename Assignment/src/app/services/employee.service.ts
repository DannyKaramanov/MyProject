import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from 'src/entities/employee';

@Injectable()
export class EmployeeService {
  employees: Employee[] = [];
  employeesChanged = new Subject<Employee[]>();
  url =
    'https://ng-assignment-f62b5-default-rtdb.firebaseio.com/employees.json';

  constructor(private http: HttpClient) {}

  createEmployee(employee: Employee): void {
    this.http
      .post<Employee>(this.url, {
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        dateOfBirth: employee.dateOfBirth,
        salary: employee.salary,
        numberTasks: employee.numberTasks,
      })
      .subscribe();
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(
      `https://ng-assignment-f62b5-default-rtdb.firebaseio.com/employees/${id}.json`
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `https://ng-assignment-f62b5-default-rtdb.firebaseio.com/employees.json`
    );
  }

  updateEmloyee(id: string, employee: Employee): void {
    this.http
      .put<any>(
        `https://ng-assignment-f62b5-default-rtdb.firebaseio.com/employees/${id}.json`,
        {
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          dateOfBirth: employee.dateOfBirth,
          salary: employee.salary,
        }
      )
      .subscribe();
  }

  deleteEmployee(employeeId: string): void {
    const headers = new HttpHeaders({ id: employeeId });
    this.http
      .delete(
        `https://ng-assignment-f62b5-default-rtdb.firebaseio.com/employees/${employeeId}.json`,
        { headers }
      )
      .subscribe(() => {
        this.getAllEmployees();
      });
  }
}
