import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle: String = '';
  enteredContent: String = '';
  @Output() postCreated = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onAddPost() {
    this.postCreated.emit({
      title: this.enteredTitle,
      content: this.enteredContent
    });
  }

}
