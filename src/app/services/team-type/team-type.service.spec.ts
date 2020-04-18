import { TestBed } from '@angular/core/testing';

import { TeamTypeService } from './team-type.service';

describe('TeamTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamTypeService = TestBed.get(TeamTypeService);
    expect(service).toBeTruthy();
  });
});
