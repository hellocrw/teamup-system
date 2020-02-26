import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STColumn } from '@delon/abc';

@Component({
  selector: 'app-team-management-list',
  templateUrl: './team-management-list.component.html',
  styleUrls: ['./team-management-list.component.less']
})
export class TeamManagementListComponent implements OnInit {

  users: any[] = Array(10)
    .fill({})
    .map((_item: any, idx: number) => {
      return {
        id: idx + 1,
        name: `name ${idx + 1}`,
        age: Math.ceil(Math.random() * 10) + 20,
      };
    });
  columns: STColumn[] = [
    { title: '序号', type: 'no' },
    { title: '项目详情', index: 'id' },
    { title: '项目描述', index: 'name' },
    {
      title: '操作区',
      buttons: [
        {
          text: 'Edit',
          icon: 'edit',
          type: 'modal',
          modal: {
            // component: DemoModalComponent,
          },
          click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`),
        },
        {
          text: 'Drawer',
          type: 'drawer',
          drawer: {
            title: '编辑',
            // component: DemoDrawerComponent,
          },
          click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`),
        },
        {
          icon: 'check-circle',
          click: record => this.message.info(`check-${record.name}`),
          iif: record => record.id % 2 === 0,
          iifBehavior: 'disabled',
          tooltip: `Is disabled button`,
        },
        {
          icon: 'delete',
          type: 'del',
          pop: {
            title: 'Yar you sure?',
            okType: 'danger',
            icon: 'star',
          },
          click: (record, _modal, comp) => {
            this.message.success(`成功删除【${record.name}】`);
            comp!.removeRow(record);
          },
          iif: record => record.id % 2 === 0,
        },
        {
          text: '更多',
          children: [
            {
              text: record => (record.id === 1 ? `过期` : `正常`),
              click: record => this.message.error(`${record.id === 1 ? `过期` : `正常`}[${record.name}]`),
            },
            {
              text: `审核`,
              click: record => this.message.info(`check-${record.name}`),
              iif: record => record.id % 2 === 0,
              iifBehavior: 'disabled',
              tooltip: 'This is tooltip',
            },
            {
              type: 'divider',
            },
            {
              text: `重新开始`,
              icon: 'edit',
              click: record => this.message.success(`重新开始【${record.name}】`),
            },
          ],
        },
      ],
    },
  ];

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  constructor(private message: NzMessageService) { }

}
