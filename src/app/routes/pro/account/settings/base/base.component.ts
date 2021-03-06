import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { zip } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { CacheService } from '@delon/cache';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';

@Component({
  selector: 'app-account-settings-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAccountSettingsBaseComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private msg: NzMessageService,
    private cache: CacheService,
  ) {}
  avatar = '';
  userLoading = true;
  user: any;
  userInfo: UserInfoDto;

  // #region geo

  provinces: any[] = [];
  cities: any[] = [];

  ngOnInit(): void {
    this.cache.get<UserInfoDto>('userInfo').subscribe(f => (this.userInfo = f));
    this.userLoading = false;
    // zip(this.http.get('/user/current'), this.http.get('/geo/province')).subscribe(([user, province]: any) => {
    //   this.userLoading = false;
    //   this.user = user;
    //   this.provinces = province;
    //   this.choProvince(user.geographic.province.key, false);
    //   this.cdr.detectChanges();
    // });
  }

  choProvince(pid: string, cleanCity = true) {
    // this.http.get(`/geo/${pid}`).subscribe((res: any) => {
    //   this.cities = res;
    //   if (cleanCity) this.user.geographic.city.key = '';
    //   this.cdr.detectChanges();
    // });
  }

  // #endregion

  save() {
    // this.msg.success(JSON.stringify(this.user));
    this.msg.success('信息已更新');
    return false;
  }
}
