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
  NB_POST_PER_DAY = 5;
  selectedPost: MyPost[];
  formatedPosts: MyPost[];
  posts: Post[];
  // this will allow us to know when the page is Ready, and start some actions according to it
  isPageReady: boolean;

  constructor(private postsService: PostsService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.isPageReady = false;
  }

  getLast7DaysPosts() {
    for (let i = 1; i < 7; i++) {
      this.postsService.getXDaysAgoPosts(i).subscribe(result => {
        this.posts = this.posts.concat(result['posts']);
        this.selectedPost = this.random_items(result, this.NB_POST_PER_DAY);
        console.log('mes postes:', this.posts);
        if (i === 6) {
          this.isPageReady = true;
        }
      }, errors => {
        console.log(errors);
      });
    }
  }

  // ProductHunt APi restrictions : 600 API calls/hour, roughly. So we will select only 5 post / day, to not explode the API limits
  random_items(arr: any[], items: number) {
     let res: any[];
    for (let i = 0; i < items; i++) {
      res = res.concat(arr[Math.floor(Math.random() * arr.length)]);
    }
    return res;
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
    console.log('comments: ', comments);
    if (comments && comments.length > 0) {
      for (let i = 0; i < comments.length; i++) {
        arr.push(
          {
            date: this.datePipe.transform(comments[i]['created_at'], 'mediumDate'),
            value: +comments[i]
          });
      }
    }
    return arr;
    console.log('formated ? ', arr);
  }

  getPostDetails(post: Post) {
    this.postsService.getPostDetails(post.id).subscribe(
      res => {
        this.createGraph(res['post']);
      },
      error => {
        console.log(error);
      }
    );
  }

  createGraph(detailedPost: Post) {
    const formatedData = this.parseComments(detailedPost['comments']);
    d3.select('this').drawChart(formatedData);
  }

}

