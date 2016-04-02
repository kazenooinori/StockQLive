const UserModel = require("../models/user");
const passport = require("passport"),
      LocalStrategy = require("passport-local").Strategy;

// login passport setup
passport.use(new LocalStrategy(
    function(username, password, done) {
        UserModel.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // [TODO] need to check if the password is valid or not, should use crypto
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

function signup (attributes) {
    return new Promise((resolve, reject) => {
        // process signup
        console.log(attributes);
        resolve();
    });
}

module.exports = {
    signup,
};
