import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from '../model/settings';
import { VocabularyService } from './vocabulary.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings = new BehaviorSubject<Settings>({
    fromLng: 'ru',
    toLng: 'en',
    wordsCount: 5,
    timeLeft: 15,
  })

  constructor() {}

  public setSettings(value: Settings) {
    this.settings.next(value)
  }

  public getSettings(): Settings {
    return this.settings.getValue()
  }

  public subscribe(callback: (data: Settings) => void) {
    this.settings.subscribe(callback)
  }
}
