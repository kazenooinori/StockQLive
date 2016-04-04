const UserModel = require("../models/user");
const passport = require("passport"),
      LocalStrategy = require("passport-local").Strategy;

// login passport setup
passport.use(new LocalStrategy(
    function(username, password, done) {
        UserModel.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            const returnUser = {
                _id: user._id,
                username: user.username,
            };
            return done(null, returnUser);
        });
    }
));
passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(_id, done) {
    UserModel.findOne({_id: _id}, function(err, user) {
        const returnUser = {
            _id: user._id,
            username: user.username,
        };
        done(null, returnUser);
    });
});

function signup (attributes) {
    return new Promise((resolve, reject) => {
        UserModel.create({
            username: attributes.username,
            password: attributes.password,
        }, (error, user) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(user);
        });
    });
}

module.exports = {
    signup,
};
