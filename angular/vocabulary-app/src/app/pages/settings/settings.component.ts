import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  fromLng = new FormControl('ru', {nonNullable: true});
  toLng = new FormControl('en', {nonNullable: true});
  wordsCount = new FormControl(5, {nonNullable: true});
  timeLeft = new FormControl(15, {nonNullable: true});

  constructor(
    private settings: SettingsService
  ) {}

  save() {
    this.settings.setSettings({
      fromLng: this.fromLng.value,
      toLng: this.toLng.value,
      wordsCount: this.wordsCount.value,
      timeLeft: this.timeLeft.value,
    })
  }
}
