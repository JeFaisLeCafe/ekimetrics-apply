import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    todaypost = {};
    selectedPost: Post;
    posts: Post[];

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getTodayPosts().subscribe((data: Post[]) => {
      console.log(data);
      this.posts = data;
    });
    console.log('mes postes:', this.posts);
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

  formatData(posts: Post[], data: any[]) {
    return;
  }

}

