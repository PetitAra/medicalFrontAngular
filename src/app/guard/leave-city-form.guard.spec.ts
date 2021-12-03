import { TestBed } from '@angular/core/testing';

import { LeaveCityFormGuard } from './leave-city-form.guard';

describe('LeaveCityFormGuard', () => {
  let guard: LeaveCityFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LeaveCityFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
