import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  expandedId: number | null = null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  addPost() {
    const newPost: Post = {
      id: Date.now(),
      title: 'Test Note',
      content: 'Hello from backend!',
      date: new Date().toISOString()
    };

    this.postService.addPost(newPost).subscribe(savedPost => {
      this.posts.push(savedPost);
    });
  }

  deletePost(id: number | string) {
  this.postService.deletePost(id).subscribe({
    next: () => {
      this.posts = this.posts.filter(p => p.id !== id);
      console.log('Post deleted successfully');
    },
    error: (err) => {
      console.error('Error deleting post', err);
    }
  });
  }

  toggle(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }
}
