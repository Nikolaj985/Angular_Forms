import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/post';
import { PostService } from '../post.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs/operators';
import {
  asynchronousValidator,
  customEmtyValueValidator,
  customTitleValidator,
  customValidator,
} from '../shared/custom-validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  newPost: Post = {
    id: '',
    author: '',
    title: '',
    content: '',
    img: '',
    likes: 0,
  };
  maxLength: number;
  AddNewPostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.AddNewPostForm = this.fb.group(
      {
        postAuthor: [
          '',
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.maxLength(50),
              customEmtyValueValidator,
            ],
            asyncValidators: [asynchronousValidator(this.httpClient)],
          },
        ],
        postTitle: [
          '',
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.maxLength(50),
              customValidator,
            ],
          },
        ],
        postContent: ['', Validators.required],
        postImageUrl: ['', Validators.required],
      },
      { validators: customTitleValidator }
    );

    this.AddNewPostForm.statusChanges
      .pipe(
        tap(() => {
          this.maxLength =
            50 - this.AddNewPostForm.controls.postTitle.value.length;
        })
      )
      .subscribe();
  }

  // Form Fields Getters
  get postAuthor() {
    return this.AddNewPostForm.get('postAuthor');
  }
  get postImageUrl() {
    return this.AddNewPostForm.get('postImageUrl');
  }
  get postTitle() {
    return this.AddNewPostForm.get('postTitle');
  }
  get postContent() {
    return this.AddNewPostForm.get('postContent');
  }

  createPost(): void {
    this.newPost.author = this.postAuthor.value;
    this.newPost.img = this.postImageUrl.value;
    this.newPost.title = this.postTitle.value;
    this.newPost.content = this.postContent.value;
    this.postService.addNewPost(this.newPost).subscribe();
    this.AddNewPostForm.reset();
  }

  reset(postForm: NgForm) {
    this.newPost = {
      id: '',
      author: '',
      title: '',
      content: '',
      img: '',
      likes: 0,
    };
    //postForm.resetForm(this.newPost);
  }
}
