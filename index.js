var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/users",require('./Controller/UserController'));

// use res.render to load up an ejs view file

app.listen(5000);
