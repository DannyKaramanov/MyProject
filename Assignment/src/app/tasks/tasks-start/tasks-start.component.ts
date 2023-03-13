import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Task } from 'src/entities/task';

@Component({
  selector: 'app-tasks-start',
  templateUrl: './tasks-start.component.html',
  styleUrls: ['./tasks-start.component.scss'],
})
export class TasksStartComponent implements OnInit, OnDestroy {
  items$!: Observable<Task[]>;
  subscription: Subscription;
  keyword = '';

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.taskService.tasksChanged.subscribe(
      (tasks: Task[]) => {
        this.items$ = of(tasks);
      }
    );
    this.getAllItems();
  }

  getAllItems(): void {
    this.items$ = this.taskService.getAllTasks();
  }

  viewTask(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  editTask(id: string): void {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  onTaskDelete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete this task?',
        buttonText: {
          ok: 'Save',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.taskService.deleteItem(id);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
