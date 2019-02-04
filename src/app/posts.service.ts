import { Injectable } from '@angular/core';
import { Post } from './post';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  productHuntURL = 'https://api.producthunt.com/v1/';
  headers = new HttpHeaders().set('access_token', 'f326775834e677b14d2aa50cf4142c279090ba00fd2f5cc36a7bb1564b6a7e05');

  // Here for some reason the headers don't work, but the when my token is passed as a param, it's fine.
  params = new HttpParams().set('access_token', 'f326775834e677b14d2aa50cf4142c279090ba00fd2f5cc36a7bb1564b6a7e05');
  constructor(private http: HttpClient) { }

  public getTodayPosts() {
    return this.http.get<Observable<Post[]>>(this.productHuntURL + 'posts', {params: this.params});
  }
}

