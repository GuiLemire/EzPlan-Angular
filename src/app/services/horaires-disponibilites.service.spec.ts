import { TestBed } from '@angular/core/testing';

import { HorairesDisponibilitesService } from './horaires-disponibilites.service';

describe('HorairesDisponibilitesService', () => {
  let service: HorairesDisponibilitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorairesDisponibilitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
