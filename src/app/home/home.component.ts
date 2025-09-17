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

  // Collapsible create form
  createExpanded: boolean = false;
  newTitle: string = '';
  newContent: string = '';

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  // Toggle the create form visibility
  toggleCreate() {
    this.createExpanded = !this.createExpanded;
  }

  // Add new post from the form
  addNewPost(form: any) {
    if (!this.newTitle || !this.newContent) return;

    const newPost: Post = {
      id: Date.now(),
      title: this.newTitle,
      content: this.newContent,
      date: new Date().toISOString()
    };

    this.postService.addPost(newPost).subscribe(savedPost => {
      this.posts.push(savedPost);
      form.resetForm();
      this.newTitle = '';
      this.newContent = '';
      this.createExpanded = false; // collapse after submit
    });
  }

  // Add a test post (optional)
  addPost(name: string = "Test", body: string = 'Hello') {
    const newPost: Post = {
      id: Date.now(),
      title: name,
      content: body,
      date: new Date().toISOString()
    };

    this.postService.addPost(newPost).subscribe(savedPost => {
      this.posts.push(savedPost);
    });
  }

  // Delete a post
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

  // Expand/collapse individual posts
  toggle(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }
}
