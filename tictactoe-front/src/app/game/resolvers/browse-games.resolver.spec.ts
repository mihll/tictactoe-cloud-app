import { TestBed } from '@angular/core/testing';

import { BrowseGamesResolver } from './browse-games.resolver';

describe('BrowseGamesResolver', () => {
  let resolver: BrowseGamesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BrowseGamesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
