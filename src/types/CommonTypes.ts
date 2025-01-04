export interface Loader {
  start: () => void;
  stop: () => void;
}

export interface HistoryItem {
  id: string;
  date: string;
  verse: string;
  verse_reference: string;
  comment_count: number;
  is_favorite: boolean;
}

export interface VerseState {
  comment_count: number;
  context_chapter: string;
  context_chapter_link: string;
  date: string;
  id: string;
  is_favorite: boolean;
  reflection: string;
  reflection_link: string;
  verse: string;
  verse_reference: string;
  video_link: string;
}
