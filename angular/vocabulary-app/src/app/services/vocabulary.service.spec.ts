import { TestBed } from '@angular/core/testing';

import { VocabularyService } from './vocabulary.service';

describe('VocabularyService', () => {
  let service: VocabularyService;
  let mockCallback: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocabularyService);

    mockCallback = jasmine.createSpy('callback');
    service.subscribe(mockCallback);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
