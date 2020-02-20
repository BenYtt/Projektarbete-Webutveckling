// SteamAPI FaQ: https://developer.valvesoftware.com/wiki/Steam_Web_API


// Variable declarations
let submitButton = document.getElementById("btn");
let inputText = document.getElementById("SteamID");

 
// Named functions

function GetPlayerSummaries(){
    // Profilnamn och bild ska hämtas här

    var request = new XMLHttpRequest()

    request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

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









