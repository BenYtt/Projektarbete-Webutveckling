// SteamAPI info: https://developer.valvesoftware.com/wiki/Steam_Web_API

// Variable declarations
// let inputText = document.getElementById("steamID");
let submitButton = document.getElementById("sendBtn").addEventListener('click', ()=> checkInputText(inputText.value));   


// For testing without entering anything in the submitform. 
// Line 4 and must be commented out to use this!
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
        getPlaytime(steamID)
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

// Gets the player avatar based of the steamID and passes it to setPlayerAvatar.
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

// Gets a players total playtime based of the steamiD and passes it to setPlaytime.
function getPlaytime(steamID){
    let totalMinutesPlayed = 0;

    axios.get("/getownedgames",{
    params:{
        steamID
        }
    })
        .then(function(response) {
            const gameCount = response.data.response.game_count;
            
            for (let i = 0; i < gameCount; i++) {
                totalMinutesPlayed += response.data.response.games[i].playtime_forever;
            }
            
            setPlaytime(totalMinutesPlayed);
        });
    }


// Changes to HTML
function setPlayerName(name){
    document.getElementById('player-name').innerHTML = name;
}

function setPlayerAvatar(url){
    document.getElementById('player-avatar').src = url;
}

function setPlaytime(totalMinutesPlayed){
    let totalHoursPLyed = Math.round(totalMinutesPlayed / 60);
    console.log("Timeplayed: " + totalHoursPLyed);

    document.getElementById('hours-played').innerHTML = 
    "Your hours: " + totalHoursPLyed + "h";
}