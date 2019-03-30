const http = require('http');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const matchUrlHost = "cricapi.com";
const matchUrlPath = "/api/matches/?apikey=zNWeUaA83hcEiq7NuzIAlml31qO2"

exports.updateMatchMaster = functions.https.onRequest((req, res) => {
    var options = {
        host: matchUrlHost,
        port: 80,
        path: matchUrlPath,
        method: 'GET'
    };

    http.get(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            admin.database().ref('/matches').push(chunk);
        });
      }).end();
}); 


