import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../post.service';
import { Post } from '../shared/post';
import { postList } from '../shared/post-list';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[];
  post$: Observable<Post[]>;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.post$ = this.postService.loadPosts().pipe(
      map((posts) => {
        return posts.filter((post) => {
          return !!post.img;
        });
      })
    );
  }
}
