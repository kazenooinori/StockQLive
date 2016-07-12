const UserModel = require("../models/user");
const passport = require("passport"),
      LocalStrategy = require("passport-local").Strategy,
      FacebookStrategy = require("passport-facebook").Strategy;
const FACEBOOK_APP_ID = "1741830396105332";
const FACEBOOK_APP_SECRET = "d36ad066d40922137be1f6933adcaa2e";
const config = require("../config");
const logger = require("../lib/logger");
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

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: config.siteUrl + "/auth/facebook/callback",
    profileFields: ['displayName', 'photos', 'email', 'gender', 'profileUrl'],
}, function(accessToken, refreshToken, profile, done) {
    logger.info(accessToken);
    logger.info(refreshToken);
    logger.info(profile);
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    UserModel.findOneAndUpdate({facebookId: profile.id}, {
        facebookId: profile.id,
        provider: profile.provider,
        displayName: profile.displayName,
        name: {
            lastName: profile.familyName,
            firstName: profile.givenName,
            middleName: profile.middleName,
        },
        email: profile.emails,
        photos: profile.photos,
        profileUrl: profile.profileUrl,
    }, options, function(err, user) {
        if (err) { return done(err); }
        done(null, user);
    });
}));

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
function checkUserExist (attributes) {
    return new Promise((resolve, reject) => {
        UserModel.where(attributes).count((error, count) => {
            if (error) {
                reject(error);
                return;
            }
            if (count === 0) {
                reject(new Error("no such user"));
            }
            resolve();
        });
    });
}

module.exports = {
    signup,
    checkUserExist,
};
