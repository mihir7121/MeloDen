var express = require("express");
var router  = express.Router();
var Music = require("../models/music");
var middleware = require("../middleware");

router.get("/", function(req,res){
    Music.find({},function(err,allmusic){
        if(err){
            console.log(err);
        } else {
            res.render("music/index",{music:allmusic});
        }
    });    
});

router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("music/new");
});

router.post("/", middleware.isLoggedIn,function(req,res){
    var name    = req.body.name;
    var video   = req.body.video;
    var image   = req.body.image;
    var desc    = req.body.description;
    var author  = {
        id:req.user._id,
        username: req.user.username
    }
    var newMusic = {name:name, video:video, image:image, description: desc, author:author};
    Music.create(newMusic, function(err,newlyCreated){
        if(err){
            console.log(err);
        } else {
            req.flash("success","Successfully created a post!");
            res.redirect("/music");
        }
    });
});

router.get("/:id",function(req,res){
    Music.findById(req.params.id).populate("comments").exec(function(err,foundMusic){
        if(err){
            console.log(err);
        } else {
            console.log(foundMusic);
            Music.find({},function(err,allMusic){
                if(err){
                    console.log(err);
                } else {
                    res.render("music/show",{allMusic:allMusic, music:foundMusic});
                }
            });
            
        }
    });
});

// EDIT MUSIC ROUTE
router.get("/:id/edit", middleware.checkMusicOwnership, function(req, res){
    Music.findById(req.params.id, function(err, foundMusic){
        res.render("music/edit", {music: foundMusic});
    });
});

//UPDATE MUSIC ROUTE
router.put("/:id",middleware.checkMusicOwnership, function(req, res){
    // find and update the correct campground
    Music.findByIdAndUpdate(req.params.id, req.body.music, function(err, updatedMusic){
       if(err){
           console.log(err);
           res.redirect("/music");
       } else {
           //redirect somewhere(show page)
           req.flash("success","Successfully edited the post!");
           res.redirect("/music/" + req.params.id);
       }
    });
});

// DESTROY MUSIC ROUTE
router.delete("/:id",middleware.checkMusicOwnership, function(req, res){
    Music.findByIdAndRemove(req.params.id, function(err){
      if(err){
        res.redirect("/music");
      } else {
        req.flash("success","Successfully deleted the post!");
        res.redirect("/music");
      }
   });
});
module.exports = router;
