import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExcerciseService } from 'src/app/services/excercise.service';
import { SettingsService } from 'src/app/services/settings.service';

interface TimeLeft {
  min: number,
  sec: number,
}

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoComponent {
  status: 'not-started'|'playing'|'ended' = 'not-started'

  timeLeft: TimeLeft = {min: 0, sec: 0}
  tasksLeft = 0
  score: number = 0

  fromLng: string = ''
  toLng: string = ''

  wordToTranslate = new FormControl('', {nonNullable: true});
  answerValue = new FormControl('', {nonNullable: true});

  constructor(
    private excersise: ExcerciseService,
    private settings: SettingsService,
  ) {}

  ngOnInit() {
    this.excersise.timeLeft.subscribe(value => {
      const min = Math.floor(value / 60);
      const sec = Math.floor(value % 60);

      this.timeLeft = {
        min,
        sec,
      }
    })

    this.excersise.tasksLeft.subscribe(value => this.tasksLeft = value)

    this.excersise.status.subscribe(value => {
      this.status = value

      if (value === 'ended') {
        this.answerValue.setValue('')
        this.wordToTranslate.setValue('')
      }
    })

    this.excersise.task.subscribe(task => this.wordToTranslate.setValue(task.word))

    this.excersise.score.subscribe(score => this.score = score)

    const {fromLng, toLng} = this.settings.getSettings()

    this.fromLng = fromLng
    this.toLng = toLng
  }

  ngOnDestroy() {
    this.excersise.reset()
  }

  start() {
    this.excersise.start()
  }

  answer() {
    this.excersise.answer(this.wordToTranslate.value, this.answerValue.value)

    this.answerValue.setValue('')
  }
}
