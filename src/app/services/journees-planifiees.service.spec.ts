import { TestBed } from '@angular/core/testing';

import { JourneesPlanifieesService } from './journees-planifiees.service';

describe('JourneesPlanifieesService', () => {
  let service: JourneesPlanifieesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JourneesPlanifieesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
