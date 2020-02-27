var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;

// Private API-key
let APIKey = "9C85786D6BDC807AE871138ED9022748";

const axios = require('axios');

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


// steam-API calls

// Requests the steamID matching the vanity player-url from the steam-server
app.get('/getsteamid', function(req, res) {
    axios.get("http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + APIKey + "&vanityurl=" + req.query.inputText)
      .then(function(response) {
        res.send(response.data);
      });
});

// Requests the player summary matching the steamID from the steam-server.
app.get('/getpersonaname', function(req, res) {
    axios.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + APIKey + 
    "&include_played_free_games=true&include_appinfo=1&steamids=" + req.query.steamID)
      .then(function(response) {
        res.send(response.data);
      });
});

// Requests data of owned games matching the steamID from the steam-server.
app.get('/getownedgames', function(req, res) {
  axios.get("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + APIKey + "&steamid=" + req.query.steamID + "&format=json")
    .then(function(response) {
      res.send(response.data);
    });
});


app.listen(port, function() {
	console.log(`App listening on port`);
});


