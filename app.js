let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let Post = require('./models/posts');

const dotenv = require('dotenv');

app.use(express.json());
let imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images'),
  filename: (req, file, cb) => cb(null, file.originalname),
});
app.use(multer({ storage: imageStorage }).single('imageFile'));

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

let id = 10;

app.get('/posts', async (req, resp) => {
  let posts = await Post.find();
  resp.send(posts);
});

app.post('/posts', async (req, resp) => {
  let reqBody = req.body;
  let imgPath;
  if (reqBody.imageUrl) {
    imgPath = reqBody.imageUrl;
  } else {
    imgPath = req.file.path.substring(
      req.file.path.indexOf('/'),
      req.file.path.length
    );
  }

  let newPost = new Post({
    id: id++,
    title: reqBody.title,
    date: new Date(),
    description: reqBody.description,
    text: reqBody.text,
    country: reqBody.country,
    imageUrl: imgPath,
  });
  console.log(newPost);

  console.log(req.file);
  await newPost.save();
  resp.send('Created');
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
