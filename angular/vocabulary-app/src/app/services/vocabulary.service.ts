import { Injectable } from '@angular/core';
import { VocabularyStoreService } from './vocabulary-store.service';
import { TranslationService } from './translation.service';
import { TranslationItem, Vocabulary } from '../model/vocabulary';
import { Subject } from 'rxjs';

const RECENT_ITEMS_COUNT = 5

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  private changes = new Subject<Vocabulary>

  constructor(
    private vocabularyStore: VocabularyStoreService,
    private translation: TranslationService
  ) {
    translation.subscribe(item => vocabularyStore.save(item))
    vocabularyStore.subscribe(vocabulary => this.changes.next(vocabulary))
  }

  public translate(phrase: string, fromLng: string, toLng: string): void {
    // need polyfill for firefox
    //const segmenter = new Intl.Segmenter(fromLng, { granularity: 'word' })

    const chunks = phrase.trim().split(/[ ,.!?:;]/)

    for (const chunk of chunks) {
      this.translation.translate(chunk, fromLng, toLng)
    }
  }

  public subscribe(callback: (data: Vocabulary) => void) {
    this.changes.subscribe(callback)
  }

  public getRecent(): Vocabulary {
    const vocabulary = this.vocabularyStore.getAll()

    return vocabulary
      .reverse()
      .slice(0, RECENT_ITEMS_COUNT)
  }

  public get(fromLng: string, toLng: string): Vocabulary {
    const vocabulary = this.vocabularyStore.getAll()
    return vocabulary.filter(item => item.fromLng === fromLng && item.toLng === toLng)
  }

  public getItem(word: string, fromLng: string, toLng: string): TranslationItem|null {
    const vocabulary = this.get(fromLng, toLng)
    return vocabulary.find(item => item.word === word && item.fromLng === fromLng && item.toLng === toLng) || null
  }

  public getItemsCount(): number {
    const vocabulary = this.vocabularyStore.getAll()
    return vocabulary.length
  }
}
