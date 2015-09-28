Package.describe({
    name: 'risul:firebase',
    summary: 'Metoer package for Firebase',
    version: '0.0.1',
    git: 'https://github.com/risul/meteor-firebase'
});

Npm.depends({
    "firebase": "2.2.9",
    "firebase-token-generator": "2.0.0"
});

Package.on_use(function (api) {
    api.versionsFrom('METEOR@1.0');
    api.export('Firebase');
    api.add_files(['lib/server/firebase.js'], 'server');
    api.add_files('lib/client/firebase-2.2.9.js', 'client');
});