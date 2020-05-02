import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { STChange, STData, STComponent, STColumn } from '@delon/abc';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { tap, map } from 'rxjs/operators';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';

@Component({
  selector: 'app-dashboard-v1',
  templateUrl: './v1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardV1Component implements OnInit {
  q: any = {
    pi: 1,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
  };
  // user: any[] = [];
  user: any[] = [];
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
    // { title: '', index: 'userId', type: 'checkbox' },
    // { title: '用户ID', index: 'userId' },
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
    // {
    //   title: '操作',
    //   buttons: [
    //     {
    //       text: '修改',
    //       click: (item: any) => this.msg.success(`配置${item.no}`),
    //     },
    //     {
    //       text: '删除',
    //       click: (item: any) => this.msg.success(`订阅警报${item.no}`),
    //     },
    //   ],
    // },
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
    this.userService.getUserInfo().subscribe(datas => {
      console.log('user:', datas.data);
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
