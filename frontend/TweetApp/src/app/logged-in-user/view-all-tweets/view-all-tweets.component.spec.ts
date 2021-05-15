import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTweetsComponent } from './view-all-tweets.component';

describe('ViewAllTweetsComponent', () => {
  let component: ViewAllTweetsComponent;
  let fixture: ComponentFixture<ViewAllTweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllTweetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
