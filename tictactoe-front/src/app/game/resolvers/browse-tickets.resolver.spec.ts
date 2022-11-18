import { TestBed } from '@angular/core/testing';

import { BrowseTicketsResolver } from './browse-tickets.resolver';

describe('BrowseTicketsResolver', () => {
  let resolver: BrowseTicketsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BrowseTicketsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
