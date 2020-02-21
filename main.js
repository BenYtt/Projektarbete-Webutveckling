// SteamAPI FaQ: https://developer.valvesoftware.com/wiki/Steam_Web_API

    // söker på qubuxz med min key
    // http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=4CFB0E68E2168BE259F51B41ED5791AD&steamids=76561198089603744

// Variable declarations
let submitButton = document.getElementById("btn");
let inputText = document.getElementById("steamID");
let userID = 0;


function getLength(inputText){
    if(!inputText.isNaN){
        return inputText.toString().length;
    }
}

// Named functions
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

function GetPlayerSummaries(){
    let request = new XMLHttpRequest();
   if(!validID){
        // Hitta 16 siffrigt steam id med:
        // http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=4CFB0E68E2168BE259F51B41ED5791AD&vanityurl=inputText
        
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









