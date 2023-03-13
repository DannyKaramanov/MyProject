import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { take } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/entities/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  id: string;
  @Input()
  task: Task;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      this.id = params['id'];
      this.taskService.getTask(this.id).subscribe((viewTask) => {
        this.task = viewTask;
      });
    });
  }
}
