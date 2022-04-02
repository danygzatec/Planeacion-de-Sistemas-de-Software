import { TestBed } from '@angular/core/testing';

import { MsalguardGuard } from './msalguard.guard';

describe('MsalguardGuard', () => {
  let guard: MsalguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MsalguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
