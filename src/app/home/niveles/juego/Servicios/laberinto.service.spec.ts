import { TestBed } from '@angular/core/testing';

import { LaberintoService } from './laberinto.service';

describe('LaberintoService', () => {
  let service: LaberintoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaberintoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
