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

  newPhrase = new FormControl('');
  fromLng = new FormControl('ru', {nonNullable: true});
  toLng = new FormControl('en', {nonNullable: true});

  constructor(
    private vocabularyService: VocabularyService
  ) {
    this.vocabulary = vocabularyService.getRecent()

    this.vocabularyService.subscribe(() => this.vocabulary = vocabularyService.getRecent())
  }

  translate() {
    const newPhrase = this.newPhrase.value
    const fromLng = this.fromLng.value
    const toLng = this.toLng.value

    if (!newPhrase) {
      alert('Cannot translate empty phrase')
      return
    }
    
    this.vocabularyService.translate(newPhrase, fromLng, toLng)
  }
}
