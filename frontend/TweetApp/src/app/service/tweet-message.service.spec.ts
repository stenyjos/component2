import { TestBed } from '@angular/core/testing';

import { TweetMessageService } from './tweet-message.service';

describe('TweetMessageService', () => {
  let service: TweetMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
