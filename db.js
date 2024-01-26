const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mail1project1:team123456@cluster0.kcqny2i.mongodb.net/userApi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
