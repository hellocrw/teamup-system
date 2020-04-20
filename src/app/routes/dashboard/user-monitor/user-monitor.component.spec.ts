import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMonitorComponent } from './user-monitor.component';

describe('UserMonitorComponent', () => {
  let component: UserMonitorComponent;
  let fixture: ComponentFixture<UserMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
