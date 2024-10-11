import type { Highlighter } from '../typings.ts';

export class NullHighlighter implements Highlighter {

  highlight(text: string): string {
    return text;
  }

}
