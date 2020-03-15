import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ProjectService } from 'src/app/services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectDetailComponent } from '../project-detail.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {

  @ViewChild('projectDetail', { static: true })
  projectDetail: ProjectDetailComponent

  index = 0;

  proId: string;

  // project: any;

  task: any[];

  @ViewChild('taskModalComponent', { static: true })
  taskModalComponent: TaskModalComponent;

  @ViewChild('taskDetailComponent', { static: true })
  taskDetailComponent: TaskDetailComponent;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    // console.log('pro', this.projectDetail.project);  
    // this.getData();  
  }

  // getData(): void {
  //   this.projectService.getProjectByProId(this.proId).subscribe(datas => {
  //     this.task = datas.data;
  //     console.log("task", this.task);
  //   });
  // }

  create(): void {
    console.log('create');
    this.taskModalComponent.isVisible = true;
  }

  /**
   * 跳转到任务详情页面
   * @param taskId 任务ID
   */
  toTaskDetail(taskId: string) {
    this.taskDetailComponent.isVisible = true;
  }

}
