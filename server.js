var express = require('express');
var app = express();

var path = require('path');
let steamID;
let APIKey = "4CFB0E68E2168BE259F51B41ED5791AD";
let playerData;

const axios = require('axios');

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// 0: GetPlayerSummaries, 1: GetFriendList, 2: getUserStatsForGame, 3: GetPlayerBans.
// let callURLs = [
//     "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + APIKey + "&vanityurl=" + inputText,
//     "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+ APIKey + "&steamids=" + steamID,
//     "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=" + APIKey + "&steamid=" + steamID + "&relationship=friend",
//     "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=440&key=" + APIKey + "&steamid=" + steamID,
//     //Can search for multiple players bans. Separate ids with comma: "steamids="XXXXX", "YYYYY", "ZZZZZ"
//     "http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=" + APIKey + "&steamids=" + steamID 
// ]

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getsteamid', function(req, res) {
    axios.get("http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key="+ APIKey + "&vanityurl=" + req.query.inputText)
      .then(function(response) {
        res.send(response.data);
      });
});

app.get('/getpersonaname', function(req, res) {
    axios.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+ APIKey + "&steamids=" + req.query.steamID)
      .then(function(response) {
        res.send(response.data);
      });
});


app.listen(8080);

