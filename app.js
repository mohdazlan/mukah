let express = require('express');
let app = express();

const dotenv = require('dotenv');
let mongoose = require('mongoose');
let Post = require('./models/posts');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB Connection successfull');
  });
let post1 = new Post({
  title: 'KLCC',
  date: new Date(),
  description: 'Some description',
  text: 'Just some text',
  country: 'Malaysia',
  imageURL: './images.jpeg',
});

post1.save();

app.use(express.static('public'));

app.listen(9900, () => console.log('Listening 9900...'));
