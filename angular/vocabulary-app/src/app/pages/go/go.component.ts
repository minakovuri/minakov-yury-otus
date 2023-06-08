import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExcerciseService } from 'src/app/services/excercise.service';

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
  startAvailable: boolean = true
  answerAvailable: boolean = false
  timeLeft: TimeLeft = {min: 0, sec: 0}
  score: number = 0

  wordToTranslate = new FormControl('', {nonNullable: true});
  answerValue = new FormControl('', {nonNullable: true});

  constructor(
    private excersise: ExcerciseService
  ) {
    excersise.timeLeft.subscribe(value => {
      const min = Math.floor(value / 60);
      const sec = Math.floor(value % 60);

      this.timeLeft = {
        min,
        sec,
      }
    })

    excersise.status.subscribe(value => {
      if (value === 'playing') {
        this.startAvailable = false
        this.answerAvailable = true
      }
      else if (value === 'ended') {
        this.answerAvailable = false
      }
    })

    excersise.task.subscribe(task => {
      this.wordToTranslate.setValue(task.word)
      this.answerValue.setValue('')
    })

    excersise.score.subscribe(score => this.score = score)
  }

  start() {
    this.excersise.start()
  }

  answer() {
    this.excersise.answer(this.wordToTranslate.value, this.answerValue.value)

    this.answerValue.setValue('')
  }
}
