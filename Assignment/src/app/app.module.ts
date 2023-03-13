import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksStartComponent } from './tasks/tasks-start/tasks-start.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from './services/task.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ItemCardComponent } from './tasks/item-card/item-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeComponent } from './employee/employee/employee.component';
import { EmployeeStartComponent } from './employee/employee-start/employee-start.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeeService } from './services/employee.service';
import { MatSelectModule } from '@angular/material/select';
import { BestEmployeeComponent } from './employee/best-employee/best-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TasksStartComponent,
    TaskEditComponent,
    TaskDetailsComponent,
    ItemCardComponent,
    ConfirmationDialogComponent,
    HeaderComponent,
    EmployeeComponent,
    EmployeeStartComponent,
    EmployeeEditComponent,
    EmployeeDetailsComponent,
    BestEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
  ],
  providers: [TaskService, EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
