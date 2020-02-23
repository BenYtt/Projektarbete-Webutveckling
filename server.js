var express = require('express');
var app = express();

var path = require('path');
let steamID;
let APIKey = "4CFB0E68E2168BE259F51B41ED5791AD";
let playerData;

const axios = require('axios');

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// 0: ResolveVanityURL, 1: GetPlayerSummaries, 2: GetPlayerSummaries, 3: GetFriendList, 4: GetUserStatsForGame, 5: GetPlayerBans, 6:GetUserStatsForGame, 7: GetOwnedGames, 8: ISteamUserStats, 9: GetSchemaForGame  .
// let callURLs = [
//     "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + APIKey + "&vanityurl=" + inputText,
//     "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+ APIKey + "&steamids=" + steamID,
//     "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=" + APIKey + "&steamid=" + steamID + "&relationship=friend",
//     "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=440&key=" + APIKey + "&steamid=" + steamID,
//     //Can search for multiple players bans. Separate ids with comma: "steamids="XXXXX", "YYYYY", "ZZZZZ"
//     "http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=" + APIKey + "&steamids=" + steamID,
//      "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=4CFB0E68E2168BE259F51B41ED5791AD&steamid=76561198089603744",
//      "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=4CFB0E68E2168BE259F51B41ED5791AD&steamid=76561198089603744&format=json",
//      "http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=4CFB0E68E2168BE259F51B41ED5791AD&appid=730"

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

