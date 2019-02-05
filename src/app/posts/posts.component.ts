import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';
import { Observable} from 'rxjs';
import {MyPost} from '../my_posts';
import * as d3 from 'd3';
import {DatePipe} from '@angular/common';
import * as _ from 'lodash';

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

  getPosts() {
    this.postsService.getTodayPosts().subscribe(result => {
      this.posts = result['posts'];
      // ProductHunt APi restrictions : 600 API calls/hour, roughly. So we will select only 5 post / day, to not explode the API limits
      this.selectedPost = _.sampleSize(result['posts'], this.NB_POST_PER_DAY);
      this.isPageReady = true;
      console.log('mes 1 postes:', this.selectedPost);
    }, errors => {
      console.log(errors);
    });
  }

  getPostDetails(post: Post) {
    console.log('postid', post.id);
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

  getLastXDaysPosts(xDaysAgo: number) {
    this.postsService.getXDaysAgoPosts(xDaysAgo).subscribe(result => {
      this.posts = this.posts.concat(result['posts']);
      console.log('mes postes:', this.posts);
    }, errors => {
      console.log(errors);
    });
  }

}

