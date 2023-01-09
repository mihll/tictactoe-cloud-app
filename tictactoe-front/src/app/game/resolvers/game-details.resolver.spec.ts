import { TestBed } from '@angular/core/testing';

import { GameDetailsResolver } from './game-details.resolver';

describe('GameDetailsResolver', () => {
  let resolver: GameDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GameDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
