var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String,
    lastName: String,
    firstName: String,
    email: String
});
UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model("User", UserSchema);

module.exports = User;