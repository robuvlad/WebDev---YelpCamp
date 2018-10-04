var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
var data = [
    {
        name: "Name one",
        image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbebfe204ad7e04d558d7e0cbc0d2eb&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Name two",
        image: "https://images.unsplash.com/photo-1534685157449-86b12aed151e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8c75f8c98a1c286dbe5207851313e9a6&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Name three",
        image: "https://images.unsplash.com/photo-1502814828814-f57efb0dc974?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b85b41ac63fecc3ef432c48f0aaea1fa&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
    
function seedDB(){
    //removing campgrounds
    Campground.remove({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("Removed campgrounds !");
        
        //adding campgrounds
        data.forEach(function(camp){
            Campground.create(camp, function(err, campground){
                if (err){
                    console.log(err);
                } else {
                    console.log("Campground added");
                    
                    //create comments
                    Comment.create({
                        text: "Wow ! This place is wonderful !",
                        author: "Melissa"
                    }, function(err, comment){
                        if (err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created Comment");
                        }
                    })
                }
            });
        });
    });
}

module.exports = seedDB;