import { TestBed } from '@angular/core/testing';

import { AutentificarUsuarioGuard } from './autentificar-usuario.guard';

describe('AutentificarUsuarioGuard', () => {
  let guard: AutentificarUsuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutentificarUsuarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
