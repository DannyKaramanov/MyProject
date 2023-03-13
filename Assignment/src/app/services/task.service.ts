import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/entities/task';
import { Observable, of, Subject, take } from 'rxjs';
import { map } from 'rxjs';
import { Employee } from 'src/entities/employee';

@Injectable()
export class TaskService {
  tasks: Task[] = [];
  tasksChanged = new Subject<Task[]>();

  url = 'https://ng-assignment-f62b5-default-rtdb.firebaseio.com/items.json';

  constructor(private http: HttpClient) {}

  createItem(task: Task): void {
    this.http
      .post<any>(this.url, {
        title: task.title,
        description: task.description,
        assignee: task.assignee,
        dueDate: task.dueDate,
      }).pipe(take(1))
      .subscribe();
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(
      `https://ng-assignment-f62b5-default-rtdb.firebaseio.com/items/${id}.json`
    );
  }

  updateItem(id: string, task: Task): void {
    this.http
      .put<any>(
        `https://ng-assignment-f62b5-default-rtdb.firebaseio.com/items/${id}.json`,
        {
          title: task.title,
          description: task.description,
          assignee: task.assignee,
          dueDate: task.dueDate,
        }
      ).pipe(take(1))
      .subscribe();
  }

  employeeUpdatedAssignedTasks(
    id: string,
    employee: Employee,
    numberTasks: number
  ): void {
    this.http
      .put<any>(
        `https://ng-assignment-f62b5-default-rtdb.firebaseio.com/employees/${id}.json`,
        {
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          dateOfBirth: employee.dateOfBirth,
          salary: employee.salary,
          numberTasks: numberTasks,
        }
      ).pipe(take(1))
      .subscribe();
  }

  getAllTasks(): Observable<Task[]> {
    let items: Task[] = [];
    let item: Task;
    this.http
      .get(this.url)
      .pipe(
        map((response: any) => {
          if (response) {
            Object.keys(response).forEach((key) => {
              const objectValues = response[key];
              item = {
                id: key,
                title: objectValues.title || '',
                description: objectValues.description || '',
                assignee: objectValues.assignee || '',
                dueDate: objectValues.dueDate || '',
              };
              items.push(item);
            });
          }
        })
      ).pipe(take(1))
      .subscribe();
    this.tasks = items;
    this.tasksChanged.next(this.tasks.slice());
    return of(items);
  }

  deleteItem(itemId: string): void {
    const headers = new HttpHeaders({ id: itemId });
    this.http
      .delete(
        `https://ng-assignment-f62b5-default-rtdb.firebaseio.com/items/${itemId}.json`,
        { headers }
      ).pipe(take(1))
      .subscribe(() => {
        this.getAllTasks();
        this.tasksChanged.next(this.tasks);
      });
  }
}
