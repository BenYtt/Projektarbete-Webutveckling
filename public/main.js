// SteamAPI info: https://developer.valvesoftware.com/wiki/Steam_Web_API

// Variable declarations
// let inputText = document.getElementById("steamID");
let submitButton = document.getElementById("sendBtn").addEventListener('click', () => checkInputText(inputText.value));
var gameNames = {};

// For testing without entering anything in the submitform. 
// Line 4 and must be commented out to use this!
fakeInput();
function fakeInput() {
    let inputText = "qubuxz";
    checkInputText(inputText);
}


// Sends form data when 'RETURN' is pressed
// inputText.onkeydown = function (e) {
//     if (e.keyCode === 13) {
//         checkInputText(inputText.value);
//     }
// }

// Gets the length of the input-string.
function getLength(inputText) {
    if (!inputText.isNaN) {
        return inputText.toString().length;
    }
}

// If user-input is not steamID, find steamID via getPersonaName
function checkInputText(inputValue) {
    if (getLength(inputValue) >= 2 && (!isValidID(inputValue))) {
        getSteamID(inputValue);
        console.log("input is not steamID");
        
    }
    else {
        getPersonaName(inputValue);
        console.log("input is steamID");

    }
}

// Returns true if input-string is a 17 digit number.
function isValidID(inputText) {
    let validID = false;

    if (!isNaN(inputText) && getLength(inputText) === 17) {
        validID = true;
    }
    else {
        validID = false;
    }

    return validID;
}

// Gets userdata from the server and calls the functions that gets more player data.
function getSteamID(inputText) {
    axios.get("/getsteamid", {
        params: {
            inputText
        }
    })
        .then(function (response) {
            let steamID = response.data.response.steamid;
            getPersonaName(steamID);
            getAvatarFull(steamID);
            getPlaytime(steamID);
            getGameIDs(steamID);
            console.log("Sent steamID: " + steamID + " to funtions.");
            
        });
}

// Gets the player name based of the steamID and passes it to setPlayerName
function getPersonaName(steamID) {
    axios.get("/getpersonaname", {
        params: {
            steamID
        }
    })
        .then(function (response) {
            let personaName = response.data.response.players[0].personaname;
            setPlayerName(personaName);
            console.log("Persona name set.");
            
        });
}

// Gets the player avatar based of the steamID and passes it to setPlayerAvatar.
function getAvatarFull(steamID) {
    axios.get("/getpersonaname", {
        params: {
            steamID
        }
    })
        .then(function (response) {
            let url = response.data.response.players[0].avatarfull;
            setPlayerAvatar(url);
            console.log("Avatar set.");
            
        });
}

// Gets a players total playtime based of the steamiD and passes it to setPlaytime.
function getPlaytime(steamID) {
    let totalMinutesPlayed = 0;
    console.log(steamID);
    axios.get("/getownedgames", {
        params: {
            steamID
        }
    })
        .then(function (response) {
            const gameCount = response.data.response.game_count;
            console.log(response.data);
            


            // for (let i = 0; i < gameCount; i++) {
            //     totalMinutesPlayed += response.data.response.games[i].playtime_forever;
            //     console.log();
                
            // }

            //setPlaytime(totalMinutesPlayed);
            console.log("Time played is calculated: " + totalMinutesPlayed);
            
        });
}

// function getGameIDs(steamID) {
//         axios.get("/getownedgames", {
//             params: {
//                 steamID
//             }
//         })
//             .then(function (response) {
//                 const gameCount = response.data.response.game_count;
            

//             // for (let i = 0; i < gameCount; i++) {
//             //     gameNames[i] = response.data.response.games[i].appid;
//             //     console.log(gameNames[i]);
//             // }

//            // matchGameIDs();
//         });
// }

// function matchGameIDs() {
//     //matchar appid och gamename

//     let gameID = gameNames[0];
//     console.log(gameID);
    
    

//         axios.get("/getownedgames", {
//             params: {
//                 gameID
//             }
//         })
//             .then(function (response) {
//                 console.log(response.data);
//             });

//     // for (let i = 0; i <  2; i++) {
//     //     let gameID = gameNames[i];

//     //     axios.get("/getschemaforgame", {
//     //         params: {
//     //             gameID
//     //         }
//     //     })
//     //         .then(function (response) {
//     //             console.log(response.data);
//     //         });
//     // }
// }




// Changes to HTML

function setPlayerName(name) {
    document.getElementById('player-name').innerHTML = name;
}

function setPlayerAvatar(url) {
    document.getElementById('player-avatar').src = url;
}

function setPlaytime(totalMinutesPlayed) {
    let totalHoursPLyed = Math.round(totalMinutesPlayed / 60);

    document.getElementById('hours-played').innerHTML =
        "Your hours: " + totalHoursPLyed + "h";
}