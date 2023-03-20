/**
 * Gets the captions from Hugginface server
 * @param {string} options.base64Image Image to run inference on
 * @param {string} options.sessionHash Unique Id to track caller questions
 * @param {string} options.textDecodeMethod Text Decoding Method
 * @param {number} options.temperature Temperature (used with nucleus sampling) max 1
 * @param {number} options.lengthPenalty Length Penalty (set to larger for longer sequence, used with beam search) max 2
 * @param {number} options.repeatPenalty Repeat Penalty (larger value prevents repetition) max 5
 */
declare const autoCaption: ({ base64Image, sessionHash, textDecodeMethod, temperature, lengthPenalty, repeatPenalty, }: {
    base64Image: string;
    sessionHash: string;
    textDecodeMethod?: string | undefined;
    temperature?: number | undefined;
    lengthPenalty?: number | undefined;
    repeatPenalty?: number | undefined;
}) => Promise<{
    state: string;
    data: {
        status: boolean;
        msg: Blob;
    };
} | {
    state: string;
    data: {
        status: boolean;
        msg: string;
    };
}>;
export default autoCaption;
