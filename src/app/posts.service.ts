import { Injectable } from '@angular/core';
import { Post } from './post';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  productHuntURL = 'https://api.producthunt.com/v1/';
  headers = new HttpHeaders().set('access_token', 'f326775834e677b14d2aa50cf4142c279090ba00fd2f5cc36a7bb1564b6a7e05');

  constructor(private http: HttpClient) { }

  getPosts(): Post[] {
     // producthuntApi get list of posts
     const test: Post = {id: 2, title: 'TrucBIDULE'};
     const test2: Post = {id: 2, title: 'Mabite'};

    return [test, test2];
  }

  public getTodayPosts() {
    console.log('toto:', this.productHuntURL + 'posts');
    return this.http.get(this.productHuntURL + 'posts', {headers: this.headers});

    // return this.http.get('https://api.producthunt.com/v1/posts?access_token=f326775834e677b14d2aa50cf4142c279090ba00fd2f5cc36a7bb1564b6a7e05').subscribe();
  }
}

