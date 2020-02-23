// SteamAPI FaQ: https://developer.valvesoftware.com/wiki/Steam_Web_API

// Variable declarations
let submitButton = document.getElementById("btn");
let inputText = document.getElementById("steamID");

let inputText = "qubuxz";
let steamID = "76561198089603744";
let APIKey = "4CFB0E68E2168BE259F51B41ED5791AD";
let playerData;

// 0: GetPlayerSummaries, 1: GetFriendList, 2: getUserStatsForGame, 3: GetPlayerBans.
let callURLs = [
    "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + APIKey + "&vanityurl=" + inputText,
    "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=" + APIKey + "&steamid=" + steamID + "&relationship=friend",
    "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=440&key=" + APIKey + "&steamid=" + steamID,
    //Can search for multiple players bans. Separate ids with comma: "steamids="XXXXX", "YYYYY", "ZZZZZ"
    "http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=" + APIKey + "&steamids=" + steamID 
]

// Gets the length of the input-string.
function getLength(inputText){
    if(!inputText.isNaN){
        return inputText.toString().length;
    }
}

// Returns true if input-string is a 17 digit number.
function isValidID(inputText){
    let validID = false; 
    
    if(!isNaN(inputText) && getLength(inputText) === 17){
        validID = true;
    }
    else{
        validID = false;
    }

    return validID;
}

// function testCall(){
//     let url = callurls[x];
//     request = new XMLHttpRequest();
//     request.open('GET', url); // lägg till 'true' som arg för  async.
//     request.onload = function () {
//         data = JSON.parse(request.responseText);
//     };
//     req.send();
// }

// Sends a request for playerdata and stores the data in playerData
function GetPlayerSummaries(player){
    let request = new XMLHttpRequest();
  
    if(!validID(player)){
        // om "No match, skicka fel
        // om "success" -> steamID = 17-siffrigt steamID.
   }

    request.open('GET', 'Här ska det stå api-req för GetPlayerSummaries', true)

    request.onload = function() {
        playerData = JSON.parse(request.responseText);
    }

// Send request
request.send()
}









function getUserStatsForGame(){
    // Skaffar data per spel och user
}

function GetFriendData(){
    // Hämta info om friends
}

function GetRecentlyPlayedGames (){
    // Hämta info om friends
}

function GetPlayerBans(){
    //hämtar data om bans
}

function hideElement(element){
element.style.display = "none";
}

function showElement(){
element.style.display = "block";
}








