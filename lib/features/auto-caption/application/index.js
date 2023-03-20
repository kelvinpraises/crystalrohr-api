const W3CWebSocket = require("websocket").w3cwebsocket;
import fetch from "node-fetch";
const ELEVENLABS = process.env.ELEVENLABS || "";
/**
 * Gets the captions from Hugginface server
 * @param {string} options.base64Image Image to run inference on
 * @param {string} options.sessionHash Unique Id to track caller questions
 * @param {string} options.textDecodeMethod Text Decoding Method
 * @param {number} options.temperature Temperature (used with nucleus sampling) max 1
 * @param {number} options.lengthPenalty Length Penalty (set to larger for longer sequence, used with beam search) max 2
 * @param {number} options.repeatPenalty Repeat Penalty (larger value prevents repetition) max 5
 */
const autoCaption = async ({ base64Image, sessionHash, textDecodeMethod = "Beam search", temperature = 1, lengthPenalty = 1, repeatPenalty = 1.5, }) => {
    let result;
    try {
        const response = await new Promise((resolve) => {
            const socket = new W3CWebSocket("wss://salesforce-blip2.hf.space/queue/join");
            socket.onopen = function () {
                console.log("[open] Connection established");
            };
            const data = [
                base64Image,
                textDecodeMethod,
                temperature,
                lengthPenalty,
                repeatPenalty,
            ];
            socket.onmessage = function (event) {
                if (JSON.parse(event.data).msg === "send_hash") {
                    socket.send(JSON.stringify({ session_hash: sessionHash, fn_index: 0 }));
                }
                if (JSON.parse(event.data).msg === "send_data") {
                    socket.send(JSON.stringify({ data, session_hash: sessionHash, fn_index: 0 }));
                }
                if (JSON.parse(event.data).msg === "process_completed") {
                    resolve(JSON.parse(event.data).output.data[0]);
                }
            };
            socket.onclose = function () {
                console.log("echo-protocol Client Closed");
            };
        });
        let url = "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL";
        let options = {
            method: "POST",
            headers: {
                Accept: "audio/mpeg",
                "XI-API-KEY": ELEVENLABS,
                "Content-Type": "application/json",
            },
            body: `{"text": ${response},"voice_settings":{"stability":0,"similarity_boost":0}}`,
        };
        const audioResponse = await fetch(url, options);
        const audioBlob = await audioResponse.blob();
        result = {
            state: "successful",
            data: {
                status: true,
                msg: audioBlob,
            },
        };
    }
    catch (error) {
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
export default autoCaption;
//# sourceMappingURL=index.js.map