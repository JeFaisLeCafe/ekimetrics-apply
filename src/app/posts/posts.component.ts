import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    posts: Post[];
    selectedPost: Post;

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.posts = this.postsService.getPosts();
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

}

