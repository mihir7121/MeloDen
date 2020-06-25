var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    passport        = require("passport"),
    app             = express(),
    LocalStrategy   = require("passport-local"),   
    flash           = require("connect-flash"),
    methodOverride  = require("method-override"),
    Music           = require("./models/music"),
    Comment         = require("./models/comment"),
    User            = require("./models/user");

//requiring routes
var commentRoutes    = require("./routes/comments"),
    musicRoutes      = require("./routes/music"),
    indexRoutes      = require("./routes/index")

//basic initialisation
//mongoose.connect("mongodb://localhost/meloden", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.connect('mongodb+srv://Mihir:Mihir-sahir_123@cluster0.epxqy.mongodb.net/meloden?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log("error:",err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONIGURATION
app.use(require("express-session")({
    secret:"Dating is BT",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use("/", indexRoutes);
app.use("/music", musicRoutes);
app.use("/music/:id/comments", commentRoutes);

// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log("MeloDen server has started!");
// });
app.listen(5000,function(){
    console.log("MeloDen server has started!");
});