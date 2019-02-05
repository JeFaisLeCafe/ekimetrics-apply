import {Post} from './post';

export interface MyPost extends Post {
  category_id: number;
  comments_count: number;
  created_at: string;
  day: string;
  id: number;
  name: string;
  screenshot_url: any;
  tagline: string;
  thumbnail: any;
  topics: any;
  votes_count: number;
}
