// SteamAPI info: https://developer.valvesoftware.com/wiki/Steam_Web_API

let inputText = document.getElementById("steamID");
let submitButton = document.getElementById("sendBtn").addEventListener('click', () => passSteamID(inputText.value));

let gameNames = {};

showInfo(true);

function showInfo(userFound) {
    if (userFound) {
        let x = document.getElementById("show-info");
        x.style.display = "block";
    }
    else {
        let x = document.getElementById("error-text");
        x.style.display = "block";
    }
}

// For testing without entering anything in the submitform. 

//      Line 3 and "inputText.onkeydown function" must be commented out to use this!
//      Test-id: 76561198037087034, Test-vanity-URL: "qubuxz"
// fakeInput();
//     let inputText = "76561198037087034"; 
// function fakeInput() {
//     checkInputText(inputText);
// }

inputText.onkeydown = function (e) {
    if (e.keyCode === 13) {
        if (isValidIDFormat(inputText.value)){
            passSteamID(inputText.value);
        }
        else{
            getSteamID(inputText.value);
        }
    }
}

// Gets the length of the input-string.
function getLength(inputText) {
    if (!inputText.isNaN) {
        return inputText.toString().length;
    }
}

// Returns true if input-string is a 17 digit number.
function isValidIDFormat(inputText) {
    let validID = false;
    
    if (!isNaN(inputText) && getLength(inputText) === 17) {
        validID = true;
    }
    else {
        validID = false;
    }
    
    return validID;
}

function passSteamID(steamID) {
    getPersonaName(steamID);  
    getAvatar(steamID);
    getPlayTime(steamID);
}

// Gets the steamID and returns it, returns false if not found.
function getSteamID(inputText) {
    axios.get("/getsteamid", {
        params: {
            inputText
        }
    })
        .then(function (response) {
            let steamID = response.data.response.steamid;
            
            if(response.data.response.success === 1){
                passSteamID(steamID);
            }
            else{
                console.log("No user with that vanityID found");
            }
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

            if (personaName != undefined) {
                setPlayerName(personaName);
            }
            else {
                console.log("personaName is undefined.");
            }
        });
}

// Gets the player avatar based of the steamID and passes it to setPlayerAvatar.
function getAvatar(steamID) {
    axios.get("/getpersonaname", {
        params: {
            steamID
        }
    })
        .then(function (response) {
            let url = response.data.response.players[0].avatarfull;
            
            if (url != undefined) {
                setPlayerAvatar(url);
            }
            else {
                console.log("Avatar URL is undefined.");
            }
        });
}

// Gets a players total playtime based of the steamiD and passes it to setPlaytime.
function getPlayTime(steamID) {
    let totalMinutesPlayed = 0;

    axios.get("/getownedgames", {
        params: {
            steamID
        }
    })
        .then(function (response) {
            const gameCount = response.data.response.game_count;
            
            if(gameCount != undefined)
            for (let i = 0; i < gameCount; i++) {
                totalMinutesPlayed += response.data.response.games[i].playtime_forever;
                setPlayTime(totalMinutesPlayed);
            }
            else{
                console.log("gameCount is undefined.");
            }
        });
}

// Changes to HTML

function setPlayerName(name) {
    document.getElementById('player-name').innerHTML = name;
}

function setPlayerAvatar(url) {
    document.getElementById('player-avatar').src = url;
}

function setPlayTime(totalMinutesPlayed) {
    let totalHoursPLyed = Math.round(totalMinutesPlayed / 60);

    document.getElementById('hours-played').innerHTML =
        "Your hours: " + totalHoursPLyed + "h";
}



// For future developement

// // function getGameIDs(steamID) {
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