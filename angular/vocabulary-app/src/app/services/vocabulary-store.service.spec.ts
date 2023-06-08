import { TestBed } from '@angular/core/testing';

import { VocabularyStoreService } from './vocabulary-store.service';

describe('VocabularyStoreService', () => {
  let service: VocabularyStoreService;
  let mockCallback: any

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocabularyStoreService);

    mockCallback = jasmine.createSpy('callback')
    service.subscribe(mockCallback)

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        // @ts-expect-error
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        // @ts-expect-error
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        // @ts-expect-error
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have empty vocabulary', () => {
    const vocabulary = service.getAll()

    expect(mockCallback).not.toHaveBeenCalled()

    expect(vocabulary).toEqual([])
  })

  it('should save translation', () => {
    const item = {
      word: 'собака',
      translation: 'dog',
      fromLng: 'ru',
      toLng: 'en',
    }

    service.save(item)

    expect(mockCallback).toHaveBeenCalledTimes(1)

    const vocabulary = service.getAll()
    expect(vocabulary).toEqual([item])
  });

  it('should not save translation multiple times', () => {
    const item = {
      word: 'собака',
      translation: 'dog',
      fromLng: 'ru',
      toLng: 'en',
    }

    service.save(item)
    service.save(item)
    service.save(item)

    expect(mockCallback).toHaveBeenCalledTimes(1)

    const vocabulary = service.getAll()
    expect(vocabulary).toEqual([item])
  });

  it('should save many translations', () => {
    const item1 = {
      word: 'собака',
      translation: 'dog',
      fromLng: 'ru',
      toLng: 'en',
    }

    const item2 = {
      word: 'кошка',
      translation: 'cat',
      fromLng: 'ru',
      toLng: 'en',
    }

    service.save(item1)
    service.save(item2)

    expect(mockCallback).toHaveBeenCalledTimes(2)

    const vocabulary = service.getAll()
    expect(vocabulary).toEqual([item1, item2])
  });

  it('should remove item', () => {
    const item1 = {
      word: 'собака',
      translation: 'dog',
      fromLng: 'ru',
      toLng: 'en',
    }

    const item2 = {
      word: 'кошка',
      translation: 'cat',
      fromLng: 'ru',
      toLng: 'en',
    }

    service.save(item1)
    service.save(item2)

    service.remove(item2)

    expect(mockCallback).toHaveBeenCalledTimes(3)

    const vocabulary = service.getAll()
    expect(vocabulary).toEqual([item1])
  });

  it('should not remove item multiple times', () => {
    const item1 = {
      word: 'собака',
      translation: 'dog',
      fromLng: 'ru',
      toLng: 'en',
    }

    const item2 = {
      word: 'кошка',
      translation: 'cat',
      fromLng: 'ru',
      toLng: 'en',
    }

    service.save(item1)
    service.save(item2)

    service.remove(item2)
    service.remove(item2)
    service.remove(item2)

    expect(mockCallback).toHaveBeenCalledTimes(3)

    const vocabulary = service.getAll()
    expect(vocabulary).toEqual([item1])
  });

  it('should get item', () => {
    const item1 = {
      word: 'собака',
      translation: 'dog',
      fromLng: 'ru',
      toLng: 'en',
    }

    const item2 = {
      word: 'кошка',
      translation: 'cat',
      fromLng: 'ru',
      toLng: 'en',
    }

    service.save(item1)
    service.save(item2)

    const searchedItem = service.get('кошка', 'ru', 'en')
    expect(searchedItem).toEqual(item2)

    expect(mockCallback).toHaveBeenCalledTimes(2)
  });

  it('should not get unexisted item', () => {
    const item1 = {
      word: 'собака',
      translation: 'dog',
      fromLng: 'ru',
      toLng: 'en',
    }

    const item2 = {
      word: 'кошка',
      translation: 'cat',
      fromLng: 'ru',
      toLng: 'en',
    }

    service.save(item1)
    service.save(item2)

    const searchedItem = service.get('птица', 'ru', 'en')
    expect(searchedItem).toBeNull()

    expect(mockCallback).toHaveBeenCalledTimes(2)
  });
});
