import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { UserRoleDto } from 'src/app/dto/UserRoleDto';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

@Component({
  selector: 'passport-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class UserRegisterComponent implements OnInit, OnDestroy {
  constructor(
    fb: FormBuilder,
    private router: Router,
    public http: _HttpClient,
    public msg: NzMessageService,
    private userInfoService: UserInfoService,
  ) {
    this.form = fb.group({
      username: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
      password: [null, [Validators.required, Validators.minLength(6), UserRegisterComponent.checkPassword.bind(this)]],
      confirm: [null, [Validators.required, Validators.minLength(6), UserRegisterComponent.passwordEquar]],
      // gender: [null, [Validators.required]],
      // mobilePrefix: ['+86'],
      // mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      // captcha: [null, [Validators.required]],
    });
  }
  // #region fields

  get username() {
    return this.form.controls.username;
  }
  get password() {
    return this.form.controls.password;
  }
  get confirm() {
    return this.form.controls.confirm;
  }
  userRole: UserRoleDto = null;
  // get mobile() {
  //   return this.form.controls.mobile;
  // }
  // get captcha() {
  //   return this.form.controls.captcha;
  // }
  form: FormGroup;
  error = '';
  type = 0;
  visible = false;
  status = 'pool';
  progress = 0;
  passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception',
  };

  // #endregion

  // #region get captcha

  count = 0;
  interval$: any;

  static checkPassword(control: FormControl) {
    if (!control) return null;
    const self: any = this;
    self.visible = !!control.value;
    if (control.value && control.value.length > 9) {
      self.status = 'ok';
    } else if (control.value && control.value.length > 5) {
      self.status = 'pass';
    } else {
      self.status = 'pool';
    }

    if (self.visible) {
      self.progress = control.value.length * 10 > 100 ? 100 : control.value.length * 10;
    }
  }

  static passwordEquar(control: FormControl) {
    if (!control || !control.parent) {
      return null;
    }
    if (control.value !== control.parent.get('password')!.value) {
      return { equar: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.userRole = this.initData();
  }

  initData(item?: UserRoleDto): UserRoleDto {
    return {
      id: item ? item.id : null,
      username: item ? item.username : null,
      password: item ? item.password : null,
      auth: item ? item.auth : null,
    };
  }

  // getCaptcha() {
  //   if (this.mobile.invalid) {
  //     this.mobile.markAsDirty({ onlySelf: true });
  //     this.mobile.updateValueAndValidity({ onlySelf: true });
  //     return;
  //   }
  //   this.count = 59;
  //   this.interval$ = setInterval(() => {
  //     this.count -= 1;
  //     if (this.count <= 0) clearInterval(this.interval$);
  //   }, 1000);
  // }

  // #endregion

  submit() {
    this.error = '';
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
    if (this.form.invalid) {
      return;
    }

    const data = this.form.value;
    // TODO
    console.log('data->', data);
    this.userRole.username = data.username;
    this.userRole.password = data.password;

    this.userInfoService.register(this.userRole).subscribe(res => {
      this.router.navigateByUrl('/passport/register-result', {
        queryParams: { email: this.userRole.username },
      });
    });

    // this.http.post('/register', data).subscribe(() => {
    //   this.router.navigateByUrl('/passport/register-result', {
    //     queryParams: { email: data.username },
    //   });
    // });
  }

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
