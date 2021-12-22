import { TestBed } from '@angular/core/testing';

import { SemainesPlanifieesService } from './semaines-planifiees.service';

describe('SemainesPlanifieesService', () => {
  let service: SemainesPlanifieesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemainesPlanifieesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
