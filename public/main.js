// SteamAPI info: https://developer.valvesoftware.com/wiki/Steam_Web_API

let inputText = $("#steamID")[0];
let submitButton = $("#sendBtn").click(() => passFormData(inputText.value));
var gameNames = {};

//Sends form data when 'RETURN' is pressed.
inputText.onkeydown = function(e) {
  if (e.keyCode === 13) {
    passFormData(inputText.value);
  }
};

function passFormData(inputValue) {
  if (isValidIDFormat(inputValue)) {
    passSteamID(inputValue);
  } else {
    getSteamID(inputValue);
  }
}

// Shows player data when true, shows error-text when false.
function showInfo(userFound) {
  if (userFound) {
    $("#show-info").css("display", "block");
    $("#error-text").css("display", "none");
  } else {
    $("#show-info").css("display", "none");
    $("#error-text").css("display", "block");
    setErrorText();
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
  } else {
    validID = false;
  }

  return validID;
}

function passSteamID(steamID) {
  getPersonaName(steamID);
  getAvatar(steamID);
  getPlayTime(steamID);
}

// Gets userdata from the server and calls the functions that gets more player data.
function getSteamID(inputText) {
  axios
    .get("/getsteamid", {
      params: {
        inputText
      }
    })
    .then(function(response) {
      const steamID = response.data.response.steamid;

      if (response.data.response.success === 1) {
        passSteamID(steamID);
      } else {
        showInfo(false);
        console.log("No user with that vanityID found");
      }
    });
}

// Gets the player name based of the steamID and passes it to setPlayerName
function getPersonaName(steamID) {
  axios
    .get("/getpersonaname", {
      params: {
        steamID
      }
    })
    .then(function(response) {
      const personaName = response.data.response.players[0].personaname;
      if (personaName != undefined) {
        setPlayerNameText(personaName);
      } else {
        console.log("personaName is undefined.");
      }
    });
}

// Gets the player avatar based of the steamID and passes it to setPlayerAvatar.
function getAvatar(steamID) {
  axios
    .get("/getpersonaname", {
      params: {
        steamID
      }
    })
    .then(function(response) {
      const url = response.data.response.players[0].avatarfull;
      if (url != undefined) {
        setPlayerAvatar(url);
      } else {
        console.log("Avatar URL is undefined.");
      }
    });
}

// Gets a players total playtime based of the steamiD and passes it to setPlaytime.
function getPlayTime(steamID) {
  let totalMinutesPlayed = 0;

  axios
    .get("/getownedgames", {
      params: {
        steamID
      }
    })
    .then(function(response) {
      const gameCount = response.data.response.game_count;
      if (gameCount != undefined)
        for (let i = 0; i < gameCount; i++) {
          totalMinutesPlayed +=
            response.data.response.games[i].playtime_forever;
          setPlayTime(totalMinutesPlayed);
        }
      else {
        setPlayTime(totalMinutesPlayed);
        
        console.log("gameCount is undefined.");
      }
    });
}


// Changes to HTML

function setPlayerNameText(name) {
  $(".profile-name")[0].innerHTML = name;
}

function setPlayerAvatar(url) {
  $("#player-avatar")[0].src = url;
  showInfo(true);
}

function setPlayTime(totalMinutesPlayed) {
    if((totalMinutesPlayed === 0) || (totalMinutesPlayed === undefined)){
        $(".hours-played")[0].innerHTML = "Your hours: N/A" ;
    }else{
        let totalHoursPlayed = Math.round(totalMinutesPlayed / 60);
        $(".hours-played")[0].innerHTML = "Your hours: " + totalHoursPlayed + "h";
    }  
}

function setErrorText() {
  $("#error-text")[0].innerHTML = "No user found...";
}