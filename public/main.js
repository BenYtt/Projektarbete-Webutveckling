// SteamAPI info: https://developer.valvesoftware.com/wiki/Steam_Web_API

// Variable declarations
// let inputText = document.getElementById("steamID");
let submitButton = document.getElementById("sendBtn").addEventListener('click', ()=> checkInputText(inputText.value));   


// For testing without entering anything in the submitform. 
// Line 4 must be commented out to use this!
fakeInput();
function fakeInput(){
    let inputText = "qubuxz";
    checkInputText(inputText);
}


// Sends form data when 'RETURN' is pressed
inputText.onkeydown = function(e){
    if(e.keyCode === 13){
        checkInputText(inputText.value);
    }
}

// Gets the length of the input-string.
function getLength(inputText){
    if(!inputText.isNaN){
        return inputText.toString().length;
    }
}

// If user-input is not steamID, find steamID via getPersonaName
function checkInputText(inputValue){
    if(getLength(inputValue) >= 2 && (!isValidID(inputValue))){
            getSteamID(inputValue);
    }  
    else{
            getPersonaName(inputValue);
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

// Gets userdata from the server and calls the functions that gets more player data.
function getSteamID(inputText){
    let steamID;
    
    axios.get("/getsteamid",{
        params:{
            inputText
        }
    })
    .then(function(response) {
        steamID = response.data.response.steamid;
        getPersonaName(steamID);
        getAvatarFull(steamID);
        //calculatePlaytime(steamID)
    });
}

// Gets the player name based of the steamID and passes it to setPlayerName
function getPersonaName(steamID){
    let personaName;
    axios.get("/getpersonaname",{
        params:{
            steamID
            }
        })
            .then(function(response) {
            personaName = response.data.response.players[0].personaname;
            setPlayerName(personaName);
            });
    }

// Gets the player avatar based of the steamID and passes it to setPlayerAvatar
function getAvatarFull(steamID){
    let url;
    axios.get("/getpersonaname",{
        params:{
            steamID
            }
        })
            .then(function(response) {
                url = response.data.response.players[0].avatarfull;
            setPlayerAvatar(url);
            });
    }


function getPlaytime(steamID){
    let gameCount = 0;
    let totalMinutesPlayed = 0;

    // En for-loop ska loopa igenom arrayen games från json-objektet
    // for i = 0; i < gamesCount; i++
    // totalMinutesPlayed += games[i].playtime_forever 

    axios.get("/getownedgames",{
    params:{
        steamID
        }
    })
        .then(function(response) {
            gameCount = response.data.response.game_count;
            setPlaytime(gameCount, totalMinutesPlayed);
        });
}

function setPlaytime(gameCount, totalMinutesPlayed){
    let totalHoursPLyed = round(totalMinutesPlayed / 60);
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



// Changes to HTML
function setPlayerName(name){
    document.getElementById('player-name').innerHTML = name;
}

function setPlayerAvatar(url){
    document.getElementById('player-avatar').src = url;
}