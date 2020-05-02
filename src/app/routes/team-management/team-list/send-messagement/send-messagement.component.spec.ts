import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessagementComponent } from './send-messagement.component';

describe('SendMessagementComponent', () => {
  let component: SendMessagementComponent;
  let fixture: ComponentFixture<SendMessagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMessagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMessagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
