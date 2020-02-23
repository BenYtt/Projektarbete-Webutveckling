// SteamAPI FaQ: https://developer.valvesoftware.com/wiki/Steam_Web_API

// Variable declarations
// let inputText = document.getElementById("steamID");
let submitButton = document.getElementById("sendBtn").addEventListener('click', ()=> checkInputText(inputText.value));   

// For testing.
function fakeInput(){
    let inputText = "qubuxz";
    checkInputText(inputText);
}

fakeInput();


inputText.onkeydown = function(e){
    if(e.keyCode === 13){
        checkInputText(inputText.value);
    }
}

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
    });
}

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

// Gets the length of the input-string.
function getLength(inputText){
    if(!inputText.isNaN){
        return inputText.toString().length;
    }
}

function setPlayerName(name){
    document.getElementById('player-name').innerHTML = name;
}

function setPlayerAvatar(url){
    document.getElementById('player-avatar').src = url;
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








