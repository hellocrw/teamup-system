import { Component, OnInit } from '@angular/core';
import { STColumn, STChange } from '@delon/abc';
import { NzMessageService, UploadFile, UploadChangeParam } from 'ng-zorro-antd';
import { FilesService } from 'src/app/services/files/files.service';
import { FilesDto } from 'src/app/dto/FilesDto';
import { MessageService } from 'src/app/services/message/message.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { ProjectDto } from 'src/app/dto/projectDto';
import { CacheService } from '@delon/cache';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less'],
  providers: [DatePipe],
})
export class FilesComponent implements OnInit {
  // url = `/users?results=3`;
  params = { a: 1, b: 2 };

  userInfo: UserInfoDto;

  proId: string;

  project: ProjectDto;

  files: FilesDto[] = [];

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  // mock
  columns: STColumn[] = [
    // { title: '编号', index: 'fileId' },
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
          pop: {
            title: '确定删除吗',
          },
          click: (e: any) => {
            this.filesService.deleteByFileId(e.fileId).subscribe();
            this.files = this.files.filter(file => e.fileId !== file.fileId);
          },
        },
      ],
    },
  ];

  _click(e: STChange) {
    // console.log(e);
  }

  /**
   * 文件信息保存
   */
  handleChange(info: UploadChangeParam): void {
    if (info.type === 'success') {
      // 保存文件数据
      const file: FilesDto = this.initFilesData();
      file.fileName = info.file.name;
      file.fileLink = 'D:/upload/' + info.file.name;
      file.proId = this.project.proId;
      file.proName = this.project.proName;
      file.userId = this.userInfo.userId;
      file.userName = this.userInfo.userName;
      file.uploadTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.filesService.saveFile(file).subscribe(res => {
        this.files.push(res.data);
        this.files = [...this.files];
      });
    }
    console.log(info);
  }

  constructor(
    private msg: NzMessageService,
    private filesService: FilesService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private cache: CacheService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.proId = this.messageService.data;
    this.getDatas();
  }

  getDatas(): void {
    // 获取用户信息
    this.cache.get<UserInfoDto>('userInfo').subscribe(f => (this.userInfo = f));
    // 获取项目信息
    this.projectService.getProjectByProId(this.proId).subscribe(res => (this.project = res.data));
    // 获取文件信息
    this.filesService.getFilesByProId(this.proId).subscribe(res => (this.files = res.data));
  }

  /**
   * 初始化表单数据
   */
  initFilesData(item?: FilesDto): FilesDto {
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
