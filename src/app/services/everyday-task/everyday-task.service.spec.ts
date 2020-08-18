import { TestBed } from '@angular/core/testing';

import { EverydayTaskService } from './everyday-task.service';

describe('EverydayTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EverydayTaskService = TestBed.get(EverydayTaskService);
    expect(service).toBeTruthy();
  });
});
