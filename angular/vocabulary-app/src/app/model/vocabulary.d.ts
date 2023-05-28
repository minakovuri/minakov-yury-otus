export interface TranslationItem {
    word: string,
    translation: string,
    fromLng: string,
    toLng: string,
  }
  
export type Vocabulary = TranslationItem[]