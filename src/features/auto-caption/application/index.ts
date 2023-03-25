import fetch from "node-fetch";

const ELEVENLABS_PAT = process.env.ELEVENLABS_PAT || "";
const CLARIFAI_PAT = process.env.CLARIFAI_PAT || "";

const USER_ID = process.env.USER_ID || "clarifai";
const APP_ID = process.env.APP_ID || "main";
const MODEL_ID = process.env.MODEL_ID || "general-english-image-caption-clip";
const MODEL_VERSION_ID =
  process.env.MODEL_VERSION_ID || "2489aad78abf4b39a128fbbc64a8830c";

const autoCaption = async (imageUrl: string) => {
  let result;

  try {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: imageUrl,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + CLARIFAI_PAT,
      },
      body: raw,
    };

    const url = `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`;

    const image2txtResponse = (await (
      await fetch(url, requestOptions)
    ).json()) as any;

    if (image2txtResponse?.status.description === "Failure") {
      throw new Error("an error occurred");
    }

    let url2 =
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL";

    let options = {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "XI-API-KEY": ELEVENLABS_PAT,
        "Content-Type": "application/json",
      },
      body: `{"text": "${image2txtResponse}","voice_settings":{"stability":0,"similarity_boost":0}}`,
    };

    const audioResponse = await fetch(url2, options);

    const audioBlob = await audioResponse.blob();

    result = {
      state: "successful",
      data: {
        status: true,
        msg: audioBlob,
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

export default autoCaption;
