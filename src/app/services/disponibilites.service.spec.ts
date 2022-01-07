import { TestBed } from '@angular/core/testing';

import { DisponibilitesService } from './disponibilites.service';

describe('DisponibilitesService', () => {
  let service: DisponibilitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisponibilitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
