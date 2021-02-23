let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let uniqid = require('uniqid');
let postsRouter = require('./routes/posts');

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

app.use(express.static('public'));

app.use('/posts', postsRouter);

app.listen(9900, () => console.log('Listening 9900...'));
