var Music = require("../models/music");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkMusicOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Music.findById(req.params.id, function(err, foundMusic){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundMusic.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You must be signed in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You must be signed in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be signed in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;