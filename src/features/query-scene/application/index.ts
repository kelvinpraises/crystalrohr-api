const W3CWebSocket = require("websocket").w3cwebsocket;

/**
 * Gets the captions from Hugginface server
 * @param {string} options.base64Image Image to run inference on
 * @param {string} options.question Question
 * @param {string} options.sessionHash Unique Id to track caller questions
 * @param {string} options.textDecodeMethod Text Decoding Method
 * @param {number} options.temperature Temperature (used with nucleus sampling) max 1
 * @param {number} options.lengthPenalty Length Penalty (set to larger for longer sequence, used with beam search) max 2
 * @param {number} options.repeatPenalty Repeat Penalty (larger value prevents repetition) max 5
 */
const queryScene = async ({
  base64Image,
  question,
  sessionHash,
  textDecodeMethod = "Beam search",
  temperature = 1,
  lengthPenalty = 1,
  repeatPenalty = 1.5,
}: {
  base64Image: string;
  question: string;
  sessionHash: string;
  textDecodeMethod?: string;
  temperature?: number;
  lengthPenalty?: number;
  repeatPenalty?: number;
}) => {
  let result;

  try {
    const response = await new Promise((resolve) => {
      const socket = new W3CWebSocket(
        "wss://salesforce-blip2.hf.space/queue/join"
      );

      socket.onopen = function () {
        console.log("[open] Connection established");
      };

      const data = [
        base64Image,
        question,
        textDecodeMethod,
        temperature,
        lengthPenalty,
        repeatPenalty,
        null,
      ];

      socket.onmessage = function (event: { data: string }) {
        if (JSON.parse(event.data).msg === "send_hash") {
          socket.send(
            JSON.stringify({ session_hash: sessionHash, fn_index: 3 })
          );
        }

        if (JSON.parse(event.data).msg === "send_data") {
          socket.send(
            JSON.stringify({ data, session_hash: sessionHash, fn_index: 3 })
          );
        }

        if (JSON.parse(event.data).msg === "process_completed") {
          resolve(JSON.parse(event.data).output);
        }
      };

      socket.onclose = function () {
        console.log("echo-protocol Client Closed");
      };
    });
    result = {
      state: "successful",
      data: {
        status: true,
        msg: response,
      },
    };
  } catch (error) {
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

export default queryScene;
