import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  // posts = [
  //   { title: 'first post', content: 'this is the first post\'s content' },
  //   { title: 'second post', content: 'this is the second post\'s content' },
  //   { title: 'third post', content: 'this is the third post\'s content' }
  // ];
  posts = [];
  constructor() { }

  ngOnInit() {
  }

}
