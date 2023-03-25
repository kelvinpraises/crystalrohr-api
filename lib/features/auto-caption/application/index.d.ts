declare const autoCaption: (imageUrl: string) => Promise<{
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
