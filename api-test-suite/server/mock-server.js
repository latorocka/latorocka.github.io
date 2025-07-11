const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware
app.use(express.json());

// Mock database
let users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'user', createdAt: new Date() },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'admin', createdAt: new Date() },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'user', createdAt: new Date() }
];

let currentId = 4;

// Rate limiting
const rateLimiter = new Map();

function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  if (!rateLimiter.has(ip)) {
    rateLimiter.set(ip, []);
  }

  const requests = rateLimiter.get(ip);
  const validRequests = requests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  validRequests.push(now);
  rateLimiter.set(ip, validRequests);
  next();
}

// Authentication middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, 'test-secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Validation helpers
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateUser(user) {
  const errors = [];
  
  if (!user.name || user.name.trim() === '') {
    errors.push('Name is required');
  }
  
  if (!user.email || !validateEmail(user.email)) {
    errors.push('Valid email is required');
  }
  
  if (!user.role || !['user', 'admin', 'moderator'].includes(user.role)) {
    errors.push('Valid role is required');
  }
  
  return errors;
}

// Routes
app.get('/api/users', rateLimit, (req, res) => {
  const { page = 1, limit = 10, role } = req.query;
  
  let filteredUsers = users;
  
  if (role) {
    filteredUsers = users.filter(user => user.role === role);
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  
  res.json(paginatedUsers);
});

app.get('/api/users/:id', rateLimit, (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }
  
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

app.post('/api/users', rateLimit, (req, res) => {
  const errors = validateUser(req.body);
  
  if (errors.length > 0) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors 
    });
  }
  
  const existingUser = users.find(u => u.email === req.body.email);
  if (existingUser) {
    return res.status(409).json({ error: 'Email already exists' });
  }
  
  const newUser = {
    id: currentId++,
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', rateLimit, (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const errors = validateUser(req.body);
  
  if (errors.length > 0) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors 
    });
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...req.body,
    updatedAt: new Date()
  };
  
  res.json(users[userIndex]);
});

app.delete('/api/users/:id', rateLimit, (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users.splice(userIndex, 1);
  res.json({ message: 'User deleted successfully' });
});

// Authentication routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email);
  
  if (!user || password !== 'password123') {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    'test-secret',
    { expiresIn: '1h' }
  );
  
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.get('/api/users/profile', authenticate, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// Error handling routes
app.get('/api/users/error', (req, res) => {
  res.status(500).json({ error: 'Internal server error' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Mock server running on port ${PORT}`);
  });
}

module.exports = app;