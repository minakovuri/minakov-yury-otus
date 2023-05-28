import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslationItem, Vocabulary } from '../model/vocabulary';

@Injectable({
  providedIn: 'root'
})
export class VocabularyStoreService {
  private STORAGE_BASE_ITEM_NAME = 'vocabulary-app.storage'
  private changes = new Subject<Vocabulary>

  private saveVocabulary(vocabulary: Vocabulary): void {
    const serializedVocabulary = JSON.stringify(vocabulary)
    localStorage.setItem(this.STORAGE_BASE_ITEM_NAME, serializedVocabulary)
  }

  public save(item: TranslationItem): void {
    const vocabulary = this.getAll()

    if (this.get(item.word, item.fromLng, item.toLng)) {
      return
    }

    vocabulary.push(item)

    this.saveVocabulary(vocabulary)

    this.changes.next(vocabulary)
  }

  public remove(item: TranslationItem): void {
    let vocabulary = this.getAll()

    if (!this.get(item.word, item.fromLng, item.toLng)) {
      return
    }

    vocabulary = vocabulary.filter(_item => JSON.stringify(_item) !== JSON.stringify(item))

    this.saveVocabulary(vocabulary)

    this.changes.next(vocabulary)
  }

  public get(word: string, fromLng: string, toLng: string): TranslationItem|null {
    const vocabulary = this.getAll()

    const item = vocabulary.find(_item => _item.word === word && _item.fromLng === fromLng && _item.toLng === toLng) || null

    return item
  }

  public getAll(): Vocabulary {
    const serializedVocabulary = localStorage.getItem(this.STORAGE_BASE_ITEM_NAME)

    if (!serializedVocabulary) {
      return []
    }

    const vocabulary: Vocabulary = JSON.parse(serializedVocabulary)

    return vocabulary
  }

  public subscribe(callback: (data: Vocabulary) => void): void {
    this.changes.subscribe(callback)
  }
}
