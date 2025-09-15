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
    this.posts = this.postService.getPosts();
  }

  toggle(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }

  addDummy() {
    this.postService.addPost('Test Note', 'Hello from LocalStorage');
    this.posts = this.postService.getPosts(); 
  }
}
