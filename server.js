const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const request = require('request');
const http = require('http');
const bodyParser = require('body-parser');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.resolve(__dirname, 'client', 'dist')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/getBooks',function(req,res){
  console.log(req.query);
  let book = req.query.bookName;
  _getBooksList(book)
  .then(data => {
    res.send(data);
  }).
  catch(err => {
    console.log(err);
    res.send();
  })
});

app.get('/getBookReviews',function(req,res){
  console.log(req.query);
  let name = req.query.bookName;
  _getReviews(name)
  .then(data => {
    res.send(data);
  }).
  catch(err => {
    console.log(err);
    res.send();
  })
});

app.listen(PORT,function(){
    console.log("Server listening at port : " + PORT);
});

_getBooksList = (book) => {
  return new Promise((resolve, reject) => {
    let options = {
      url: `https://www.goodreads.com/search/index.xml?key=BL5AiBF90CdctXzhJ5ASuw&q=${book}`
    };
    request.get(options, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

_getReviews = (title) => {
  return new Promise((resolve, reject) => {
    let options = {
      url: `https://www.goodreads.com/book/title.xml?key=BL5AiBF90CdctXzhJ5ASuw&title=${title}`
    };
    request.get(options, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};