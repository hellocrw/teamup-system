import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { ProBasicListEditComponent } from 'src/app/routes/pro/list/basic-list/edit/edit.component';
import { TeamService } from 'src/app/services/team/team.service';
import { CacheService } from '@delon/cache';
import { TeamDto } from 'src/app/dto/TeamDto';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.less'],
})
export class ProjectListComponent implements OnInit {
  userId: any;
  teams: TeamDto[] = [];
  q: any = {
    status: 'all',
  };
  loading = false;
  data: any[] = [];

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modal: ModalHelper,
    private cdr: ChangeDetectorRef,
    private teamService: TeamService,
    private cache: CacheService,
  ) {}

  ngOnInit() {
    this.cache.get('userId').subscribe(f => (this.userId = f));
    this.getData();
  }

  getData() {
    this.loading = true;
    /**
     * 获取所有团队信息
     */
    this.teamService.getTeamProByUserId(this.userId).subscribe(res => {
      this.teams = res.data;
      console.log('teams:', this.teams);
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  openEdit(record: any = {}) {
    this.modal.create(ProBasicListEditComponent, { record }, { size: 'md' }).subscribe(res => {
      if (record.id) {
        record = { ...record, id: 'mock_id', percent: 0, ...res };
      } else {
        this.data.splice(0, 0, res);
        this.data = [...this.data];
      }
      this.cdr.detectChanges();
    });
  }

  delete(item) {
    console.log('删除');
  }
}
