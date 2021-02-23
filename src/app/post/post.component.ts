import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../shared/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  constructor(private postService: PostService) {}

  ngOnInit(): void {}
  addLike(id: Post) {
    this.postService.addLike(id);
  }
  dislike(id: Post) {
    this.postService.removeLike(id);
  }
}
