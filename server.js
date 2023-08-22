const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const users = [
  { id: 1, username: 'user1', password: 'password1', role: 'user' },
  { id: 2, username: 'admin', password: 'adminpassword', role: 'admin' }
];

const comments = [];

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Authentication failed' });
  }
};

app.post('/api/comments', authenticateUser, (req, res) => {
  const { text } = req.body;
  const comment = { text, user: req.user.id, approved: false };
  comments.push(comment);
  res.status(201).send(comment);
});

app.get('/api/comments', authenticateUser, (req, res) => {
  const userRole = req.user.role;
  let filteredComments = comments;
  
  if (userRole !== 'admin') {
    filteredComments = comments.filter(comment => comment.user === req.user.id);
  }
  
  res.send(filteredComments);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
