import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { VocabularyService } from './vocabulary.service';
import { BehaviorSubject } from 'rxjs';
import { TranslationItem, Vocabulary } from '../model/vocabulary';

@Injectable({
  providedIn: 'root'
})
export class ExcerciseService {
  status = new BehaviorSubject<'not-started'|'playing'|'ended'>('not-started')
  timeLeft = new BehaviorSubject<number>(90)
  score = new BehaviorSubject<number>(0)
  task = new BehaviorSubject<TranslationItem>({
    word: '',
    translation: '',
    fromLng: '',
    toLng: '',
  })

  private tasks: Vocabulary = []
  private taskIndex: number = -1

  constructor(
    private settings: SettingsService,
    private vocabulary: VocabularyService,
  ) {
    settings.subscribe(({timeLeft}) => this.timeLeft.next(timeLeft))
  }

  private startCountdown() {
    const settings = this.settings.getSettings()

    let timeLeft = settings.timeLeft

    const intervalId = setInterval(() => {
      if (this.status.getValue() !== 'playing') {
        clearInterval(intervalId)
        return
      }

      // уменьшаем таймер каждую секунду
      timeLeft--
      this.timeLeft.next(timeLeft)

      if (timeLeft <= 0) {
        clearInterval(intervalId)
        this.status.next('ended')
      }
    }, 1000)
  }

  private generateTasks() {
    const {wordsCount, fromLng, toLng} = this.settings.getSettings()
    const vocabulary = this.vocabulary.get(fromLng, toLng)

    if (this.tasks.length) {
      this.tasks = []
    }

    const generatedWordsCount = Math.min(wordsCount, vocabulary.length)
    const uniqueItems = new Set<TranslationItem>()

    while (true) {
      const randomItem = vocabulary[Math.floor(Math.random() * vocabulary.length)]

      if (!uniqueItems.has(randomItem)) {
        uniqueItems.add(randomItem)
        this.tasks.push(randomItem)
      }

      if (this.tasks.length === generatedWordsCount) {
        break
      }
    }
  }

  private updateTask() {
    this.taskIndex++

    const task = this.tasks[this.taskIndex]
    
    if (task) {
      this.task.next(task)
    }
    else {
      this.status.next('ended')
    }
  }

  private checkAnswer(word: string, translation: string) {
    const {fromLng, toLng} = this.settings.getSettings()

    const item = this.vocabulary.getItem(word, fromLng, toLng)

    if (!item) {
      throw Error('cannot find item')
    }

    if (item.translation === translation) {
      this.score.next(this.score.getValue() + 1)
    }
  }

  public start() {
    this.score.next(0)

    this.generateTasks()
    this.updateTask()

    this.startCountdown()

    this.status.next('playing')
  }

  public answer(word: string, translation: string) {
    if (this.timeLeft.getValue() <= 0) {
      return
    }

    this.checkAnswer(word, translation)

    this.updateTask()
  }
}
