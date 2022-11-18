import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseGamesComponent } from './browse-games.component';

describe('BrowseGamesComponent', () => {
  let component: BrowseGamesComponent;
  let fixture: ComponentFixture<BrowseGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
