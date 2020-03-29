import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { CacheService } from '@delon/cache';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';

@Component({
  selector: 'app-account-center-articles',
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAccountCenterArticlesComponent implements OnInit {
  userInfo: any;

  list: any[];
  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef) {
    this.http.get('/api/list', { count: 8 }).subscribe((res: any) => {
      this.list = res;
      this.cdr.detectChanges();
    });
  }
  ngOnInit(): void {}
}
