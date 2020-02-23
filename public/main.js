// SteamAPI FaQ: https://developer.valvesoftware.com/wiki/Steam_Web_API

// Variable declarations
let submitButton = document.getElementById("btn");
let inputText = document.getElementById("steamID");

// let inputText = "qubuxz";
let steamID = "76561198089603744";
let APIKey = "4CFB0E68E2168BE259F51B41ED5791AD";

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


function getPlayerName(name){
    document.getElementById('player-name').innerHTML = name;
}


getPlayerName();
testCall();

function testCall(){
let playerName;
    axios.get("/playerdata")
      .then(function(response) {
        playerName = response.data.response.players[0].personaname;
        getPlayerName(playerName);
      });
}


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








