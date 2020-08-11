// /workspace/wdb/wdbmaster/YelpCamp/v11ngDeploy
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")


// mongoDB as copied

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://NeilGreer:Ng232117@clearport1.sxp3s.mongodb.net/clearport11?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// From unsivil via Discord using mongoose

// const mongoose = require('mongoose');

// const URI = "mongodb+srv://NeilGreer:Ng232117@clearport1.sxp3s.mongodb.net/clearport11?retryWrites=true&w=majority";

// const db = mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true});
// db.connection.on('connected', () => {
//     console.log('[mongoose] Connected to DB.');
// });
// db.connection.on('error', (err) => {
//     console.log('[mongoose] Error connecting to DB: ' + err);
// });


//Local mongoose mongoDB

mongoose.connect("mongodb://localhost/yelp_camp_v10", 
	{useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());



// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//Run locally from goorm
app.listen(3000, function(){
	console.log("server listeningon port 3000")})

//run via Heroku
// var port = process.env.PORT || 3000;
// app.listen(port, function () {
//   console.log("Server Has Started!");
// });