// TwitchTV blog https://blog.twitch.tv/client-id-required-for-kraken-api-calls-afbb8e95f843
// call the Twitch API for a channel 
var twitchTVurl = "https://www.twitch.tv/"
var oldTwitchTVAPI = "https://api.twitch.tv/kraken/channels/";
var newTwitchTVAPI = "https://api.twitch.tv/kraken/streams/";
var clientID = "f55ioj18oatngrd7rqz31sg5lqjxfd";

var channelArr = [
    "freecodecamp",
    "ESL_SC2",
    "noobs2ninjas",
    "OgamingSC2",
    "cretetion",
    "RobotCaleb",
    "habathcx",
    "storbeck",
    "clashroyale",
    "dreamhackpubg",
    "quakechampions",
    "magic",
    "dreamhackhs",
    "dreamleague",
    "vaporadark",
    "4wardprogressmadden",
    "joltzie",
    "fauxre",
    "dreamhackcsgo_ru",
    "Yogscast",
    "imaqtpie",
    "AdmiralBulldog",
    "A1taOda",
    "Sacriel"
];

var channelObjArr = [];
var newTwitchTVAPIArr = [];
var twitchAPIv5Arr = [];

document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        for (i = 0; i < channelArr.length; i++) {
            // DOM elements creation 
            var wrapperBox = document.createElement("a");
            wrapperBox.id = "wrapper" + i;
            wrapperBox.className = "wrapper";
            document.getElementById("total-wrapper").appendChild(wrapperBox);

            var logoBox = document.createElement("img");
            logoBox.className = "logo";
            logoBox.id = "logo" + i;
            logoBox.src = "#";
            logoBox.alt = "channel logo";
            document.getElementById("wrapper" + i).appendChild(logoBox);

            var statusBox = document.createElement("div");
            statusBox.className = "status";
            statusBox.id = "status" + i;
            statusBox.innerHTML = "loading..."
            document.getElementById("wrapper" + i).appendChild(statusBox);

            var nameBox = document.createElement("div");
            nameBox.id = "name" + i;
            nameBox.className = "name";
            nameBox.innerHTML = "loading...";
            document.getElementById("wrapper" + i).appendChild(nameBox);

            var descriptionBox = document.createElement("div");
            descriptionBox.id = "description" + i;
            descriptionBox.className = "description";
            descriptionBox.innerHTML = "loading...";
            document.getElementById("wrapper" + i).appendChild(descriptionBox);
            // LET'S FILL THESE DOM ELEMENTS WITH DATA
            (function (i) {
                // data I can already push to the page, prior to API calls
                channelObjArr.push(new Object());
                channelObjArr[i].display_name = channelArr[i];
                nameBox.innerHTML = channelObjArr[i].display_name;

                channelObjArr[i].url = twitchTVurl + channelArr[i];
                wrapperBox.href = channelObjArr[i].url;

                // API CALLS TIME! 
                twitchAPIv5Arr.push(new XMLHttpRequest());
                twitchAPIv5Arr[i].open("GET", oldTwitchTVAPI + channelArr[i]);
                twitchAPIv5Arr[i].setRequestHeader("Client-ID", clientID);
                twitchAPIv5Arr[i].send();

                twitchAPIv5Arr[i].onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var result = JSON.parse(this.response);
                        channelObjArr[i].id = result._id;
                        channelObjArr[i].description = result.status;
                        channelObjArr[i].updated_at = result.updated_at;
                        channelObjArr[i].video_banner = result.video_banner;

                        channelObjArr[i].url = result.url;
                        channelObjArr[i].logo = result.logo;
                        if (false) {channelObjArr[i].status = "offline";}
                        document.getElementById("logo" + i).src = channelObjArr[i].logo;
                        document.getElementById("status" + i).innerHTML = channelObjArr[i].status; // offline/online
                        document.getElementById("description" + i).innerHTML = channelObjArr[i].description;
                    }
                }
            })(i);

            (function (i) {
                // THIS API HAS DATA ONLY IF THE CHANNEL IS ONLINE / OFFLINE 
                newTwitchTVAPIArr.push(new XMLHttpRequest());
                newTwitchTVAPIArr[i].open("GET", newTwitchTVAPI + channelArr[i]);
                newTwitchTVAPIArr[i].setRequestHeader("Client-ID", clientID);
                newTwitchTVAPIArr[i].send();

                newTwitchTVAPIArr[i].onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var result2 = JSON.parse(this.response);
                        if (result2.stream == null) {
                            channelObjArr[i].status = "offline";
                            document.getElementById("status" + i).style.color = "rgba(255, 0, 0, 0.555)";
                        }
                        else {
                            channelObjArr[i].status = "online";
                            document.getElementById("status" + i).style.color = "green";
                        }
                        document.getElementById("status" + i).innerHTML = channelObjArr[i].status; // offline/online
                    }
                }
            })(i);
        };
    }
}