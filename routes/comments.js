var express = require("express");
var router = express.Router({mergeParams: true});
var Music = require("../models/music");
var Comment = require("../models/comment");
var middleware = require("../middleware");
//================
// COMMENT ROUTES
//================

router.get("/new",middleware.isLoggedIn, function(req,res){
    Music.findById(req.params.id,function(err,music){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{music: music});
        }
    });
});

router.post("/",middleware.isLoggedIn,function(req, res){
    //lookup music using ID
    Music.findById(req.params.id, function(err, music){
        if(err){
            console.log(err);
            res.redirect("/music");
        } else {
        Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                music.comments.push(comment);
                music.save();
                req.flash('success', 'Created a comment!');
                res.redirect('/music/' + music._id);
            }
         });
        }
    });
 });

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        } else{
            res.render("comments/edit",{music_id:req.params.id, comment:foundComment});
        }
    });
});

router.put("/:comment_id", middleware.checkCommentOwnership,function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
            res.redirect("back");
       } else {
            req.flash('success', 'Edited the comment successfully');
            res.redirect("/music/" + req.params.id );
       }
    });
 });

 router.delete("/:comment_id", middleware.checkCommentOwnership,function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
            res.redirect("back");
       } else {
            req.flash('error', 'Deleted the comment!');
            res.redirect("/music/" + req.params.id);
       }
    });
});
//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;