var _firebase = Npm.require("firebase");
var _firebaseTokenGenerator = Npm.require("firebase-token-generator");

Firebase = {
    options: {
        secretKey: process.env.FIREBASE_SECRETKEY || Meteor.settings.firebase.secretKey,
        path: process.env.FIREBASE_PATH || Meteor.settings.firebase.path
    },

    getToken: function(authData) {
        var tokenGenerator = new _firebaseTokenGenerator(this.options.secretKey);
        var token = tokenGenerator.createToken(authData);

        return token;
    },
    
    authorizeWithCustomToken: function (token, path) {
        
        if (!path) path = this.options.path;
        else path = this.options.path + "/" + path;
        
        var authWithCustomToken = Meteor.wrapAsync(function (token, path, callback) {
           firebase =  new _firebase(path);
           
           firebase.authWithCustomToken(token, function (error, authData) {
                callback(error, authData);
            });
        });
        
        return authWithCustomToken(token, path);
    }
};

//setting firebase path on client
Meteor.settings.public.firebase_path = Firebase.options.path;