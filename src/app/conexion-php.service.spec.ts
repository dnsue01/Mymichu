import { TestBed } from '@angular/core/testing';

import { ConexionPhpService } from './conexion-php.service';

describe('ConexionPhpService', () => {
  let service: ConexionPhpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexionPhpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
