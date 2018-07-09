import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  private mode = 'create';
  private postId: string;
  form: FormGroup;
  isLoading = false;
  post: Post;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {

    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {validators: [Validators.required, Validators.maxLength(100)]}),
    });

    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      if (paraMap.has('postId')) {
        console.log('post edit');
        this.mode = 'edit';
        this.postId = paraMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          console.log(postData);
          this.post = { id: postData._id, title: postData.title, content: postData.content };
          this.form.setValue({'title': this.post.title, 'content': this.post.content});
        });
      } else {
        console.log('post create');
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost() {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {

      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }

    this.form.reset();
  }
}
