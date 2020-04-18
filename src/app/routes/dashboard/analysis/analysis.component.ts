import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { STColumn, STComponent, STData, STChange } from '@delon/abc';
import { getTimeDistance, deepCopy } from '@delon/util';
import { _HttpClient } from '@delon/theme';
import { I18NService } from '@core';
import { yuan } from '@shared';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

@Component({
  selector: 'app-dashboard-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAnalysisComponent implements OnInit {
  q: any = {
    pi: 1,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
  };
  data: any[] = [];
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
    { title: '', index: 'userId', type: 'checkbox' },
    // { title: '用户ID', index: 'id' },
    { title: '用户名称', index: 'userName' },
    { title: '性别', index: 'gender' },
    { title: '学校', index: 'university' },
    { title: '学院', index: 'college' },
    { title: '专业', index: 'profession' },
    { title: '年级', index: 'grade' },
    { title: '班级', index: 'userClass' },
    {
      title: '学号',
      index: 'userNo',
      // type: 'number',
      // sorter: (a: any, b: any) => a.userNo - b.userNo,
    },
    { title: '联系方式', index: 'userTel' },
    { title: '邮箱', index: 'email' },
    { title: '掌握技能', index: 'ability' },
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
    private userService: UserInfoService,
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.userService.getAdminInfo().subscribe(datas => {
      this.data = datas.data;
      console.log('admin:', this.data);
    });
    // this.q.statusList = this.status.filter(w => w.checked).map(item => item.index);
    // if (this.q.status !== null && this.q.status > -1) {
    //   this.q.statusList.push(this.q.status);
    // }
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
