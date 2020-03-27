import { Component, OnInit, ViewChild, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.less'],
})
export class TeamListComponent implements OnInit {
  q: any = {
    pi: 1,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
  };
  // user: any[] = [];
  user: any[] = [
    // {
    //   userId: '1',
    //   userName: 'crw',
    //   gender: '男',
    //   university: '广东金融学院',
    //   college: '互联网学院',
    //   profession: '计算机科学与技术',
    //   grade: '16',
    //   userClass: '1',
    //   userNo: '161543108',
    //   userTel: '18814231208',
    //   email: '2388092655@qq.com',
    //   ability: 'java,springboot',
    // },
    // {
    //   userId: '2',
    //   userName: 'crw',
    //   gender: '男',
    //   university: '广东金融学院',
    //   college: '互联网学院',
    //   profession: '计算机科学与技术',
    //   grade: '16',
    //   userClass: '1',
    //   userNo: '161543108',
    //   userTel: '18814231208',
    //   email: '2388092655@qq.com',
    //   ability: 'java,springboot',
    // }
  ];
  loading = false;
  status = [
    { index: 0, text: '关闭', value: false, type: 'default', checked: false },
    {
      index: 1,
      text: '运行中',
      value: false,
      type: 'processing',
      checked: false,
    },
    { index: 2, text: '已上线', value: false, type: 'success', checked: false },
    { index: 3, text: '异常', value: false, type: 'error', checked: false },
  ];
  @ViewChild('st', { static: true })
  st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'teamId', type: 'checkbox' },
    // { title: '用户ID', index: 'userId' },
    { title: '团队名称', index: 'teamName' },
    { title: '队长', index: 'leaderId' },
    { title: '团队描述', index: 'teamDescribe' },
    { title: '团队类型', index: 'teamType' },
    { title: '团队人数', index: 'teamNumber' },
    { title: '团队创建日期', index: 'teamDate' },
    { title: '团队状态', index: 'status' },
    { title: '人员类型', index: 'staff' },
    { title: '性质', index: 'teamNature' },
    { title: '团队标签', index: 'teamLabel' },
    { title: '查看人数', index: 'seeNum' },
    {
      title: '操作',
      buttons: [
        {
          text: '修改',
          click: (item: any) => this.msg.success(`配置${item.no}`),
        },
        {
          text: '删除',
          click: (item: any) => this.msg.success(`订阅警报${item.no}`),
        },
      ],
    },
  ];
  selectedRows: STData[] = [];
  description = '';
  totalCallNo = 0;
  expandForm = false;

  constructor(
    private teamService: TeamService,
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getData();
    this.teamService.getTeamAll().subscribe(datas => {
      // console.log('team:', datas.data);
      this.user = datas.data;
    });
  }

  getData() {
    this.loading = true;
    this.q.statusList = this.status.filter(w => w.checked).map(item => item.index);
    if (this.q.status !== null && this.q.status > -1) {
      this.q.statusList.push(this.q.status);
    }
    // this.http.get('/rule', this.q)
    //   .pipe(
    //     map((list: any[]) =>
    //       list.map(i => {
    //         const statusItem = this.status[i.status];
    //         i.statusText = statusItem.text;
    //         i.statusType = statusItem.type;
    //         return i;
    //       }),
    //     ),
    //     tap(() => (this.loading = false)),
    //   ).subscribe(res => {
    //     this.data = res;
    //     console.log(this.data);
    //     this.cdr.detectChanges();
    //   });
  }

  stChange(e: STChange) {
    switch (e.type) {
      case 'checkbox':
        this.selectedRows = e.checkbox!;
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  remove() {
    this.http.delete('/rule', { nos: this.selectedRows.map(i => i.no).join(',') }).subscribe(() => {
      this.getData();
      this.st.clearCheck();
    });
  }

  approval() {
    this.msg.success(`审批了 ${this.selectedRows.length} 笔`);
  }

  add(tpl: TemplateRef<{}>) {
    this.modalSrv.create({
      nzTitle: '新建规则',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.http.post('/rule', { description: this.description }).subscribe(() => this.getData());
      },
    });
  }

  reset() {
    // wait form reset updated finished
    setTimeout(() => this.getData());
  }
}
