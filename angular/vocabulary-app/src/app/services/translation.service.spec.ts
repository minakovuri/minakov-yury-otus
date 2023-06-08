import { TestBed } from '@angular/core/testing';

import { TranslationService } from './translation.service';

describe('TranslateService', () => {
  let service: TranslationService;
  let mockCallback: any

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationService);

    mockCallback = jasmine.createSpy('callback')
    service.subscribe(mockCallback)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should translate from ru to en', (done) => {
    service.translate('собака', 'ru', 'en')
      .then(() => {
        const expected = {
          word: 'собака',
          translation: 'dog',
          fromLng: 'ru',
          toLng: 'en',
        }
        expect(mockCallback).toHaveBeenCalledOnceWith(expected)
        done()
      })
  });

  it('should translate from en to ru', (done) => {
    service.translate('cat', 'en', 'ru')
      .then(() => {
        const expected = {
          word: 'cat',
          translation: 'кот',
          fromLng: 'en',
          toLng: 'ru',
        }
        expect(mockCallback).toHaveBeenCalledOnceWith(expected)
        done()
      })
  });
});
