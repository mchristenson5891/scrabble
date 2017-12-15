const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();

require('dotenv').config()

app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

var port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Express app running on port ${port}`)
})