import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FilesService } from 'src/app/services/files/files.service';
import { MessageService } from 'src/app/services/message/message.service';
import { FilesDto } from 'src/app/dto/FilesDto';
import { STChange, STColumn } from '@delon/abc';
import { TeamService } from 'src/app/services/team/team.service';
import { TeamDto } from 'src/app/dto/TeamDto';
import { CacheService } from '@delon/cache';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files-management',
  templateUrl: './files-management.component.html',
  styleUrls: ['./files-management.component.less'],
})
export class FilesManagementComponent implements OnInit {
  // url = `/users?results=3`;
  params = { a: 1, b: 2 };

  proId: string;

  files: FilesDto[] = [];
  teams: TeamDto[] = [];

  // mock
  columns: STColumn[] = [
    { title: '', index: 'teamId', type: 'checkbox' },
    { title: '团队名称', index: 'teamName' },
    { title: '创建人', index: 'leaderName' },
    { title: '团队范围', index: 'teamScope' },
    { title: '团队类型', index: 'teamType' },
    { title: '组队时间', index: 'teamDate' },
    { title: '团队性质', index: 'teamNature' },
    {
      title: '操作',
      buttons: [
        {
          text: '通过',
          type: 'link',
          click: (e: any) => {
            this.teamService.agree(e.teamId).subscribe();
            this.teams = this.teams.filter(team => team.teamId !== e.teamId);
          },
        },
        {
          text: '不通过',
          type: 'link',
          click: (e: any) => {
            this.teamService.disagree(e.teamId).subscribe();
            this.teams = this.teams.filter(team => team.teamId !== e.teamId);
          },
        },
      ],
    },
  ];

  constructor(
    private msg: NzMessageService,
    private filesService: FilesService,
    private teamService: TeamService,
    private messageService: MessageService,
    private cache: CacheService,
    private router: Router,
  ) {}

  ngOnInit() {
    // this.proId = this.messageService.data;
    this.getDatas();
  }

  _click(e: STChange) {
    console.log('getE:', e);
    // this.router.navigateByUrl(`/team/team-detail/${e.click.item.teamId}`);
  }

  getDatas(): void {
    this.cache.get<UserInfoDto>('userInfo').subscribe(userInfo =>
      this.teamService.getTeamByAdmin(userInfo.userId).subscribe(res => {
        this.teams = res.data;
        console.log(this.teams);
        this.teams = this.teams.filter(team => team.status === '0');
      }),
    );
    // this.filesService.getFilesByProId('1').subscribe(res => (this.files = res.data));
  }

  initDatas(item: FilesDto): FilesDto {
    return {
      fileId: item ? item.fileId : null,
      fileName: item ? item.fileName : null,
      userId: item ? item.userId : null,
      userName: item ? item.userName : null,
      fileLink: item ? item.fileLink : null,
      proId: item ? item.proId : null,
      proName: item ? item.proName : null,
      uploadTime: item ? item.uploadTime : null,
    };
  }
}
