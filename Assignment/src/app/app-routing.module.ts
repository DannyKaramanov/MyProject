import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BestEmployeeComponent } from './employee/best-employee/best-employee.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeStartComponent } from './employee/employee-start/employee-start.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TasksStartComponent } from './tasks/tasks-start/tasks-start.component';
import { TasksComponent } from './tasks/tasks.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    component: TasksComponent,
    children: [
      { path: '', component: TasksStartComponent },
      { path: 'new', component: TaskEditComponent },
      { path: ':id', component: TaskDetailsComponent },
      { path: ':id/edit', component: TaskEditComponent },
    ],
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    children: [
      { path: '', component: EmployeeStartComponent },
      { path: 'new', component: EmployeeEditComponent },
      { path: ':id', component: EmployeeDetailsComponent },
      { path: ':id/edit', component: EmployeeEditComponent },
    ],
  },
  { path: 'best-employee', component: BestEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
