let express = require('express');
let app = express();

app.use(express.static('public'));

app.listen(9900, () => console.log('Listening 9900...'));
