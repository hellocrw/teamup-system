import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectDto } from 'src/app/dto/projectDto';

@Component({
  selector: 'app-project-apply-view',
  templateUrl: './project-apply-view.component.html',
  styleUrls: ['./project-apply-view.component.less'],
})
export class ProjectApplyViewComponent implements OnInit {
  proId: string;
  project: ProjectDto = null;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

  ngOnInit() {
    this.project = this.initData();
    this.proId = this.route.snapshot.paramMap.get('proId');
    this.getData();
  }

  initData(item?: ProjectDto): ProjectDto {
    return {
      proId: item ? item.proId : null,
      proName: item ? item.proName : null,
      leaderName: item ? item.leaderName : null,
      proDescribe: item ? item.proDescribe : null,
      proDate: item ? item.proDate : null,
      proStartTime: item ? item.proStartTime : null,
      proEndTime: item ? item.proEndTime : null,
      proStatus: item ? item.proStatus : null,
      teamId: item ? item.teamId : null,
      proType: item ? item.proType : null,
      proCurrentNum: item ? item.proCurrentNum : null,
      proLimiedNum: item ? item.proLimiedNum : null,
      seeNum: item ? item.seeNum : null,
      staff: item ? item.staff : null,
      staffList: item ? item.staffList : null,
    };
  }

  getData(): void {
    this.projectService.getProjectByProId(this.proId).subscribe(res => (this.project = res.data));
  }
}
