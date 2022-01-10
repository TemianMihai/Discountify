export interface QuestionModel {
  answer: string;
  question: string;
}

export interface LinkModel {
  href: string;
  title: string;
}

export interface IdeaModel {
  idea: string;
}

export enum AttachmentKind {
  Wordlist = "WORD_LIST",
  Wordbook = "WORDBOOK"
}

export interface AttachmentModel {
  url?: string;
  size: number;
  name: string;
  extension: string;
}

export interface AttachmentValue {
  kind: AttachmentKind;
  attachment: AttachmentModel;
}

export interface PlaceModel {
  city?: string;
  country?: string;
}
