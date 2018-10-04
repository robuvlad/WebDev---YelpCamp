var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user"),
    Campground = require("../models/campground");

//ROUTES
router.get("/", function(req, res){
    res.render("landing");
})

//============
//AUTH ROUTES
//============
router.get("/register", function(req, res){
    res.render("register", {page: "register"});
})

router.post("/register", function(req, res){
    User.register(new User({
        username: req.body.username, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        avatar: req.body.avatar, 
        email: req.body.email
    }), req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        })
    })
})

//LOGIN Route
router.get("/login", function(req, res){
    res.render("login", {page: "login"});
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res){
})

//LOGOUT Route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged you out !");
    res.redirect("/campgrounds");
});

// USER PROFILE - V13
router.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if (err) {
            req.flash("error", "Something went wrong !");
            return res.redirect("/");
        }
        Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds){
            if (err) {
                req.flash("error", "Something went wrong !");
                return res.redirect("/");
            } 
            res.render("users/show", {user: foundUser, campgrounds: campgrounds});
        })        
    })
})

module.exports = router;