import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Vocabulary } from 'src/app/model/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent {
  vocabulary: Vocabulary = [];

  translationWord = new FormControl('');
  fromLng = new FormControl('ru', {nonNullable: true});
  toLng = new FormControl('en', {nonNullable: true});

  constructor(
    private vocabularyService: VocabularyService
  ) {
    this.vocabulary = vocabularyService.getRecent()

    this.vocabularyService.subscribe(() => this.vocabulary = vocabularyService.getRecent())
  }

  translate() {
    const translationWord = this.translationWord.value
    const fromLng = this.fromLng.value
    const toLng = this.toLng.value

    if (!translationWord) {
      alert('Cannot translate empty word')
      return
    }

    if (this.vocabularyService.getItem(translationWord, fromLng, toLng)) {
      alert('This word translated recently')
      return
    }
    
    this.vocabularyService.translate(translationWord, fromLng, toLng)
  }
}
