import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { Post } from '../shared/post';
import { map, tap } from 'rxjs/operators';
import { postList } from '../shared/post-list';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  posts: Post[];
  post: Post;
  posts$: Observable<Post[]>;
  post$: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(tap((data) =>{
      this.post$ = this.postService.getPost(data.id);
    }
    )).subscribe();
    //const id: string = this.route;
    //this.post$ = this.postService.getPost(id);
  }
  addLike(post) {
    this.postService.addLike(post);
  }
  dislike(id: Post) {
    this.postService.removeLike(id);
  }
}
