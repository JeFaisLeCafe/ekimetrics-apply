import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';
import { Observable} from 'rxjs';
import {MyPost} from '../my_posts';
import * as d3 from 'd3';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  todaypost = {};
  selectedPost: MyPost;
  formatedPosts: MyPost[];
  posts: Post[];

  constructor(private postsService: PostsService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
  }

  getLast7DaysPosts() {
    for (let _i = 1; _i < 7; _i++) {
      this.postsService.getXDaysAgoPosts(_i).subscribe(result => {
        this.posts = this.posts.concat(result['posts']);
        console.log('mes postes:', this.posts);
      }, errors => {
        console.log(errors);
      });
    }
  }

  getPosts() {
    this.postsService.getTodayPosts().subscribe(result => {
      this.posts = result['posts'];
      this.getLast7DaysPosts();
      console.log('mes postes:', this.posts);
    }, errors => {
      console.log(errors);
    });
  }

  parseComments(comments: any[]) {
    let arr = [];
    for (let i = 0; i < comments.length; i++) {
      arr.push(
        {
          date: this.datePipe.transform(comments[i]['created_at'], 'mediumDate'),
          value: +comments[i]
        });
    }
    return arr;
    console.log('formated ? ', arr);
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

  getPostDetails(post: Post) {
    this.postsService.getPostDetails(post.id).subscribe(
      res => {
        this.parseComments(res['post']['comments']);
      },
      error => {
        console.log(error);
      }
    );
  }

  createGraph(post: Post) {
    const detailedPost = this.getPostDetails(post);
    const formatedData = this.parseComments(detailedPost['comments']);
    d3.select('this').drawChart(formatedData);
  }

}

