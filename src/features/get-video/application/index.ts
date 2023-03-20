import fetch from "node-fetch";

const getVideo = async (videoId: string) => {
  let url =
    "https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";

  let options = {
    method: "POST",
    headers: { Accept: "*/*", "Content-Type": "application/json" },
    body: `
    {
        "context": {
          "client": {
            "hl": "en",
            "clientName": "WEB",
            "clientVersion": "2.20210721.00.00",
            "clientFormFactor": "UNKNOWN_FORM_FACTOR",
            "clientScreen": "WATCH",
            "mainAppWebInfo": {
              "graftUrl": "/watch?v=${videoId}"
            }
          },
          "user": {
            "lockedSafetyMode": false
          },
          "request": {
            "useSsl": true,
            "internalExperimentFlags": [],
            "consistencyTokenJars": []
          }
        },
        "videoId": ${videoId},
        "playbackContext": {
          "contentPlaybackContext": {
            "vis": 0,
            "splay": false,
            "autoCaptionsDefaultOn": false,
            "autonavState": "STATE_NONE",
            "html5Preference": "HTML5_PREF_WANTS",
            "lactMilliseconds": "-1"
          }
        },
        "racyCheckOk": false,
        "contentCheckOk": false
      }
    `,
  };

  let result;

  try {
    const res = await fetch(url, options);
    const json = res.json();

    result = {
      state: "successful",
      data: {
        status: true,
        msg: json,
      },
    };
  } catch (error) {
    console.error("error:" + error);

    result = {
      state: "failed",
      data: {
        status: false,
        msg: "An error occurred.",
      },
    };
  }

  return result;
};

export default getVideo;
