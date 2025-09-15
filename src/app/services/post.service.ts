import { Injectable } from '@angular/core';

export interface Post {
  id: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private storageKey = 'localBlogPosts';
  private posts: Post[] = [];

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    this.posts = saved ? JSON.parse(saved) : [];
  }

  ngOnInit() {
  this.posts = this.getPosts().slice().reverse();
  }

  clearPosts() {
    this.posts = [];
    this.save();
  }

  getPosts(): Post[] {
    return this.posts;
  }

  addPost(title: string, content: string) {
    const newPost: Post = {
      id: Date.now(),
      title,
      content,
    };
    this.posts.unshift(newPost);
    this.save();
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.posts));
  }
}
