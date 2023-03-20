"use strict";
const fetch = require("node-fetch");
let url = "https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
let options = {
    method: "POST",
    headers: { Accept: "*/*", "Content-Type": "application/json" },
    body: '{"context":{"client":{"hl":"en","clientName":"WEB","clientVersion":"2.20210721.00.00","clientFormFactor":"UNKNOWN_FORM_FACTOR","clientScreen":"WATCH","mainAppWebInfo":{"graftUrl":"/watch?v=UF8uR6Z6KLc"}},"user":{"lockedSafetyMode":false},"request":{"useSsl":true,"internalExperimentFlags":[],"consistencyTokenJars":[]}},"videoId":"UF8uR6Z6KLc","playbackContext":{"contentPlaybackContext":{"vis":0,"splay":false,"autoCaptionsDefaultOn":false,"autonavState":"STATE_NONE","html5Preference":"HTML5_PREF_WANTS","lactMilliseconds":"-1"}},"racyCheckOk":false,"contentCheckOk":false}',
};
fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));
//# sourceMappingURL=index.js.map