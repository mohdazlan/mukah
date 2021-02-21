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

app.get('/posts', async (req, resp) => {
  let posts = await Post.find();
  resp.send(posts);
});
// let post1 = new Post({
//   id: 3,
//   title: 'Lagos',
//   date: new Date(),
//   description: 'Some description',
//   text: 'Just some text',
//   country: 'Nigeria',
//   imageURL: './imageMukah.jpeg',
// });

// post1.save();

app.use(express.static('public'));

app.listen(9900, () => console.log('Listening 9900...'));
