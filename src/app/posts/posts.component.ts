import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../services/posts.service';
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
      this.isPageReady = this.selectedPost != null;
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
    const formatedData = this.countCommentsByDate(detailedPost['comments']);
    d3.select('this').this.drawChart(formatedData);
  }

  drawChart(formatedData) {
    const svgWidth = 600, svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const x = d3.scaleTime().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    let svg = d3.select('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let line = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value); });
    x.domain(d3.extent(formatedData, function(d) { return d.date; }));
    y.domain(d3.extent(formatedData, function(d) { return d.value; }));

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .select(".domain")
      .remove();

    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");
  }

  countCommentsByDate(comments: any[]) {
    let arr = [];
    console.log('comments: ', comments);
    if (comments && comments.length > 0) {
      for (let i = 0; i < comments.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].date === this.datePipe.transform(comments[i]['created_at'], 'mediumDate')) {
            arr[j].value += 1;
          } else {
            arr.push(
              {
                date: this.datePipe.transform(comments[i]['created_at'], 'mediumDate'),
                value: 1
              });
          }
        }
      }
    }
    console.log('formated ', arr);
    return arr;
  }

  getLastXDaysPosts(xDaysAgo: number) {
    this.postsService.getXDaysAgoPosts(xDaysAgo).subscribe(result => {
      this.posts = result['posts'];
      // ProductHunt APi restrictions : 600 API calls/hour, roughly. So we will select only 5 post / day, to not explode the API limits
      this.selectedPost = _.sampleSize(result['posts'], this.NB_POST_PER_DAY);
      this.isPageReady = this.selectedPost != null;
    }, errors => {
      console.log(errors);
    });
  }

}

