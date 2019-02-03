import { Component, OnInit } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    post: Post = {
      id: 1,
      title: 'Super awesome stuff'
    };

  constructor() {
  }

  ngOnInit() {
  }

}

