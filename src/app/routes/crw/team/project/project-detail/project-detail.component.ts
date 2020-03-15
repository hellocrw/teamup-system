import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.less']
})
export class ProjectDetailComponent implements OnInit {

  proId: string;

  project: any[] = [];

  tabs: any[] = [
    {
      key: 'task',
      tab: '任务',
    },
    {
      key: 'files',
      tab: '文件',
    },
    {
      key: 'notifice',
      tab: '公告',
    },
  ];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.proId = this.route.snapshot.paramMap.get('proId');
    // this.router.navigateByUrl(`/team/project/project-detail/${this.proId}/task`);
    this.getDatas();
  }

  getDatas(): void {
    this.projectService.getProjectTaskByProId(this.proId).subscribe(datas => {
      this.project = datas.data;
      console.log('project:', this.project);
    })
  }

  to(key: string): void {
    console.log(key);
    this.router.navigateByUrl(`/team/project/project-detail/${this.proId}/${key}`);
  }

  onActivate(event): void {
    console.log('create', event);
  }

  onDeactivate(event): void {
    console.log('destroy', event);
  }

}
