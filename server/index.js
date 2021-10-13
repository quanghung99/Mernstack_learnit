require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const cors = require('cors');
// const bodyParser = require('body-parser')

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.myvi6.mongodb.net/mern-learnit?retryWrites=true&w=majority`
    );
    console.log('mongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();
const app = express();

// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
