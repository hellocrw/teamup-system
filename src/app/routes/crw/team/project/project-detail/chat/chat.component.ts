import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { CacheService } from '@delon/cache';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less'],
})
export class ChatComponent implements OnInit, OnDestroy {
  message?: string;

  proId = null;

  messages: Array<string> = [];

  userInfo: UserInfoDto = null;

  webSocket: WebSocket = null;

  constructor(private cache: CacheService, private messageService: MessageService) {}

  ngOnInit() {
    // 获取用户基本信息
    this.cache.get<UserInfoDto>('userInfo').subscribe(f => (this.userInfo = f));
    // 获取项目ID号
    this.proId = this.messageService.data;
    // 连接WebSocket
    this.conectWebSocket();
  }

  conectWebSocket(): void {
    if ('WebSocket' in window) {
      console.log('connecting');
      this.webSocket = new WebSocket('ws://127.0.0.1:8888/api/websocket/' + this.userInfo.userId);
    } else {
      alert('Not support websocket');
    }
    // error
    this.webSocket.onerror = () => console.log('error');
    // onopen
    this.webSocket.onopen = () => console.log('connect success');
    // onmessage
    this.webSocket.onmessage = event => {
      this.messages.push(event.data);
    };
    // onclose
    this.webSocket.onclose = () => console.log('close');
    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = () => this.webSocket.close();
  }

  // TODO
  // 将消息显示在网页上: 报错--> Cannot read property 'innerHTML' of null
  // setMessageInnerHTML(innerHTML): void {
  //   document.getElementById('message').innerHTML += innerHTML + '<br/>';
  // }

  ngOnDestroy(): void {
    this.webSocket.close();
  }

  sendMsg(): void {
    console.log('测试');
    if (this.webSocket.readyState === 1) {
      this.webSocket.send(this.message);
    } else {
      console.log(this.webSocket.readyState);
    }
  }
}
