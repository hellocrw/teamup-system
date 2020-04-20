import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FilesService } from 'src/app/services/files/files.service';
import { MessageService } from 'src/app/services/message/message.service';
import { FilesDto } from 'src/app/dto/FilesDto';
import { STChange, STColumn } from '@delon/abc';

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

  // mock
  columns: STColumn[] = [
    { title: '编号', index: 'fileId' },
    { title: '文件名称', index: 'fileName' },
    { title: '上传者', index: 'userName' },
    { title: '上传时间', index: 'uploadTime' },
    {
      title: '操作',
      buttons: [
        {
          text: '下载',
          type: 'link',
          click: (e: any) => console.log('下载文件', e),
        },
        {
          text: '删除',
          type: 'link',
          click: (e: any) => console.log('下载文件', e),
        },
      ],
    },
  ];

  _click(e: STChange) {
    console.log(e);
  }

  constructor(
    private msg: NzMessageService,
    private filesService: FilesService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    // this.proId = this.messageService.data;
    this.getDatas();
  }

  getDatas(): void {
    this.filesService.getFilesByProId('1').subscribe(res => (this.files = res.data));
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
