import { TestBed } from '@angular/core/testing';

import { UserRanksResolver } from './user-ranks.resolver';

describe('UserRanksResolver', () => {
  let resolver: UserRanksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserRanksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
