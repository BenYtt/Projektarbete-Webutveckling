// SteamAPI info: https://developer.valvesoftware.com/wiki/Steam_Web_API

let inputText = $("#steamID")[0];
//let inputText = document.getElementById("steamID");

let submitButton = document.getElementById("sendBtn").addEventListener('click', () => checkInputText(inputText.value));
// let submitButton = $("#sendBtn")[0].click(checkInputText(inputText.value));
// let submitButton = $("#sendBtn")[0];
// let inputValue = inputText.value;
// const checkedInputValue = checkInputText(inputValue);
// submitButton.click(checkedInputValue);

var gameNames = {};

function showInfo() {
    let x = document.getElementById("show-info");
      x.style.display = "block";
  }

// For testing without entering anything in the submitform. 

//      Line 3 and "inputText.onkeydown function" must be commented out to use this!
//      Test-id: 76561198037087034, Test-vanity-URL: "qubuxz"
// fakeInput();
//     let inputText = "76561198037087034"; 
// function fakeInput() {
//     checkInputText(inputText);
// }

//Sends form data when 'RETURN' is pressed
inputText.onkeydown = function (e) {
    if (e.keyCode === 13) {
        checkInputText(inputText.value);
        showInfo();
    }
}

// Gets the length of the input-string.
function getLength(inputText) {
    if (!inputText.isNaN) {
        return inputText.toString().length;
    }
}

// Gets the steamID if needed. Otherwise it passes the steamID (inputValue) to the functions that gets more player data
function checkInputText(inputValue) {
    if (getLength(inputValue) >= 2 && (!isValidID(inputValue))) {
        getSteamID(inputValue);
    }
    else {
        getPersonaName(inputValue);
        getAvatarFull(inputValue);
        getPlaytime(inputValue);

        console.log("Sent steamID: " + inputValue + " to funtions.");
    }
}

// Returns true if input-string is a 17 digit number.
function isValidID(inputText) {
    let validID = false;
    
    if (!isNaN(inputText) && getLength(inputText) === 17) {
        validID = true;
        console.log("Input is a valid steamID.");
    }
    else {
        validID = false;
        console.log("Input is not a valid steamID.");
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
    
    axios.get("/getownedgames", {
        params: {
            steamID
        }
    })
        .then(function (response) {
            const gameCount = response.data.response.game_count;

            for (let i = 0; i < gameCount; i++) {
                totalMinutesPlayed += response.data.response.games[i].playtime_forever;
            }

            setPlaytime(totalMinutesPlayed);
            console.log("Time played is calculated: " + totalMinutesPlayed);

        });
}

// Changes to HTML

function setPlayerName(name) {
    $(".profile-name")[0].innerHTML = name;
    // document.getElementById('player-name').innerHTML = name;
}

function setPlayerAvatar(url) {
    $("#player-avatar")[0].src = url;
    // document.getElementById('player-avatar').src = url;
}

function setPlaytime(totalMinutesPlayed) {
    let totalHoursPlayed = Math.round(totalMinutesPlayed / 60);
    $(".hours-played")[0].innerHTML = "Your hours: " + totalHoursPlayed + "h";
    // document.getElementById('hours-played').innerHTML =
    //     "Your hours: " + totalHoursPLyed + "h";
}

