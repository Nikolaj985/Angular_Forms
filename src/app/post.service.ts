import { Injectable, OnInit } from '@angular/core';
import { Post } from './shared/post';
import { postList } from '../app/shared/post-list';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ParsedHostBindings } from '@angular/compiler';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService implements OnInit {
  private posts: Post[];
  private subscription: Subscription;
  private post: Post;
  private apiEndpoint = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {}

  loadPosts() {
    return this.httpClient.get<Post[]>('/api/posts');
  }
  getPost(id) {
    return this.httpClient.get<Post>(`/api/posts/${id}`);
  }
  addLike(post: Post) {
    post.likes++;
    this.httpClient.put('/api/posts/' + post.id, post).subscribe();
  }
  removeLike(post: Post) {
    post.likes--;
    this.httpClient.put('/api/posts/' + post.id, post).subscribe();
  }
}
