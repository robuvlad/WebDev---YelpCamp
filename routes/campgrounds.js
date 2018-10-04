var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middlewareObj = require("../middleware");

router.get("/", function(req, res){
    if (req.query.search){
        const regex = new RegExp(escapeRegExp(req.query.search), "gi");
        Campground.find({name: regex}, function(err, cmp){
            if (err){
                console.log(err);
            }else{
                if (cmp.length < 1){
                    req.flash("error", "No matches. Please, try again !");
                    res.redirect("/campgrounds");
                } else{
                    res.render("campgrounds/index", {campgrounds: cmp, currentUser: req.user, page: "campgrounds"});      
                }
            }
        })
    } else {
        Campground.find({}, function(err, cmp){
            if (err){
                console.log(err);
            }else{
                res.render("campgrounds/index", {campgrounds: cmp, currentUser: req.user, page: "campgrounds"});      
            }
        })
    }
})

router.post("/", middlewareObj.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var obj = {name: name, price: price, image: image, description: desc, author: author};
    Campground.create(obj,function(err, cmp){
        if (err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");      
        }
    })
})

router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
})

//SHOW campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, cmp){
        if (err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: cmp});
        }
    })
})

//EDIT Campground
router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});      
    })
})

//UPDATE Campground
router.put("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, camp){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//DELETE Campground
router.delete("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, camp){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports = router;