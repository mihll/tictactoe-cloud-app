import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleInfoDialogComponent } from './simple-info-dialog.component';

describe('SimpleInfoDialogComponent', () => {
  let component: SimpleInfoDialogComponent;
  let fixture: ComponentFixture<SimpleInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleInfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
