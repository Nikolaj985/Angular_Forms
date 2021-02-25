import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostService } from '../post.service';
import { Post } from '../shared/post';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss'],
})
export class RecentPostsComponent implements OnInit {
  post$: Observable<Post[]>;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.post$ = this.postService.loadPosts().pipe(
      map((posts) => {
        return posts.reverse().splice(0, 3);
      })
    );
  }
}
