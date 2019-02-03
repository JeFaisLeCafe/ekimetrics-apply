import { Injectable } from '@angular/core';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  getPosts(): Post[] {
     // producthuntApi get list of posts
     const test: Post = {id: 2, title: 'TrucBIDULE'};
     const test2: Post = {id: 2, title: 'Mabite'};
    return [test, test2];
  }
}

