import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProMonitorComponent } from './pro-monitor.component';

describe('ProMonitorComponent', () => {
  let component: ProMonitorComponent;
  let fixture: ComponentFixture<ProMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
