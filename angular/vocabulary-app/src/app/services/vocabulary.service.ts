import { Injectable } from '@angular/core';
import { VocabularyStoreService } from './vocabulary-store.service';
import { TranslationService } from './translation.service';
import { Vocabulary } from '../model/vocabulary';
import { Subject } from 'rxjs';

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
}
