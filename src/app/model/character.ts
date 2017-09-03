import { Thumbnail } from './thumbnail';

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: any;
  series: any;
  stories: any;
  events: Event;
  urls: any;
}
