import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslationItem } from '../model/vocabulary';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private baseUrl = 'https://api.mymemory.translated.net'
  private changes = new Subject<TranslationItem>

  public async translate(word: string, fromLng: string, toLng: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/get?q=${word}&langpair=${fromLng}|${toLng}`)
    const data = await res.json()

    const translation = data.responseData.translatedText.toLowerCase()

    this.changes.next({
      word,
      translation,
      fromLng,
      toLng,
    })
  }

  public subscribe(callback: (data: TranslationItem) => void): void {
    this.changes.subscribe(callback)
  }
}
