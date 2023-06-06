import { TestBed } from '@angular/core/testing';

import { ManageGuard } from './manage.guard';

describe('ManageGuard', () => {
  let guard: ManageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
