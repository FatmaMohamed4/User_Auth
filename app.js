const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');

const app = express();
const port = 3000;

app.use(bodyParser.json());
const session = require('express-session');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

  
//Register
app.post('/register', async (req, res) => {
  try {
    const { name, pass} = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ name });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({ name, pass });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Login without bcrypt (for educational purposes, not recommended for production)
app.post('/login', async (req, res) => {
  try {
    const { name, pass } = req.body;

    // Check if the username exists
    const existingUser = await User.findOne({ name });

    if (!existingUser) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the stored password
    if (existingUser.pass !== pass) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // You might generate a token here and send it back to the client for authentication in future requests
    // For simplicity, let's just send a success message
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});