import { Component, OnInit, ViewChild, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { TeamService } from 'src/app/services/team/team.service';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-pro-list',
  templateUrl: './pro-list.component.html',
  styleUrls: ['./pro-list.component.less'],
})
export class ProListComponent implements OnInit {
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
    { title: '', index: 'proId', type: 'checkbox' },
    // { title: '用户ID', index: 'userId' },
    { title: '项目名称', index: 'proName' },
    { title: '队长名称', index: 'leaderName' },
    { title: '项目描述', index: 'proDescribe' },
    { title: '项目创建时间', index: 'proDate' },
    { title: '项目开始时间', index: 'proStartTime' },
    { title: '项目结束时间', index: 'proEndTime' },
    { title: '项目当前状态', index: 'proStatus' },
    { title: '所属团队id号', index: 'teamId' },
    { title: '项目类型', index: 'proType' },
    { title: '项目当前人数', index: 'proCurrentNum' },
    { title: '项目限制人数', index: 'proLimiedNum' },
    { title: '查看人数', index: 'seeNum' },
    { title: '技术类型', index: 'staffList' },
    { title: '需要人员类型', index: 'staff' },
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
    private projectService: ProjectService,
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getData();
    this.projectService.getproAll().subscribe(datas => {
      console.log('pro:', datas.data);
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
