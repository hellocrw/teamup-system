import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from 'src/app/services/project/project.service';
import { ProjectDto } from 'src/app/dto/projectDto';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements OnInit {
  teamId: string;
  projects: ProjectDto[];

  initLoading = true; // bug
  loadingMore = false;
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];

  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.log('init');
    this.getData();
    // this.route.queryParamMap.subscribe((params: ParamMap) => {
    //   this.teamId = params.get('teamId');
    //   this.projectService.getProjectByTeamId(this.teamId).subscribe(res => {
    //     this.projects = res.data;
    //     console.log('projects', this.projects);
    //   });
    // });
  }

  getData(): void {
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.projectService.getProjectByTeamId(this.teamId).subscribe(res => {
      this.projects = res.data;
      console.log('projects', this.projects);
    });
    // this.http.get(fakeDataUrl).subscribe((res: any) => callback(res));
  }

  onLoadMore(): void {
    this.loadingMore = true;
    // this.list = this.data.concat([...Array(count)].fill({}).map(() => ({ loading: true, name: {} })));
    // this.http.get(fakeDataUrl).subscribe((res: any) => {
    //   this.data = this.data.concat(res.results);
    //   this.list = [...this.data];
    //   this.loadingMore = false;
    // });
  }

  edit(item: any): void {
    this.msg.success(item.email);
  }
  toProjectDetail(proId: string): void {
    this.router.navigateByUrl('/team/');
  }
}
