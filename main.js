// SteamAPI FaQ: https://developer.valvesoftware.com/wiki/Steam_Web_API

    // söker på qubuxz med min key
    // http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=4CFB0E68E2168BE259F51B41ED5791AD&steamids=76561198089603744

// Variable declarations
let submitButton = document.getElementById("btn");
let inputText = document.getElementById("steamID");
let steamID = "";
let APIKey = "4CFB0E68E2168BE259F51B41ED5791AD";



// Named functions
function getLength(inputText){
    if(!inputText.isNaN){
        return inputText.toString().length;
    }
}

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


// 1: GetPlayerSummaries, 2:GetRecentlyPlayedGames, 3: GetFriendList, 4: getUserStatsForGame, 5: GetPlayerBans.
let callURLs = [
    "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + APIKey + "&vanityurl=inputText",
    "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" + APIKey + "&steamid=" + steamID + "&format=json",
    "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=" + APIKey + "&steamid=" + steamID + "&relationship=friend",
    "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=440&key=" + APIKey + "&steamid=" + steamID,
    //Can search for multiple players bans. Separate ids with comma: "steamids="XXXXX", "YYYYY", "ZZZZZ"
    "http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=" + APIKey + "&steamids=" + steamID 
]









function GetPlayerSummaries(){
    let request = new XMLHttpRequest();
   if(!validID){
    
        // om "No match, skicka fel
        // om "success" -> userID = vad det nu är för svar.
   }
        else{
        // userID = 17IdValue
        request.open('GET', 'Här ska det stå api-req för GetPlayerSummaries', true)
    }


    request.onload = function() {
    // Begin accessing JSON data here
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

// Annonumus funkctions


submitButton.onclick = function(){
    submitButton.style.display = "none";
};   









