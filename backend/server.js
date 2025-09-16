const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const POSTS_FILE = path.join(__dirname, 'posts.json');

app.use(bodyParser.json());
app.use(cors());

// Ensure posts.json exists
if (!fs.existsSync(POSTS_FILE)) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify([]));
}

// GET posts
app.get('/api/posts', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE));
  res.json(posts);
});

// POST new post
app.post('/api/posts', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE));
  const newPost = req.body;
  posts.push(newPost);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
  res.json(newPost);
});

// DELETE post by ID
app.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id.toString();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE));
  const filteredPosts = posts.filter(p => p.id.toString() !== id);

  if (filteredPosts.length === posts.length) {
    return res.status(404).json({ error: 'Post not found' });
  }

  fs.writeFileSync(POSTS_FILE, JSON.stringify(filteredPosts, null, 2));
  res.json({ success: true });
});


// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
