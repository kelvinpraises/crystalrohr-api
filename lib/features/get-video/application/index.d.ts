declare const getVideo: (videoId: string) => Promise<{
    state: string;
    data: {
        status: boolean;
        msg: Promise<unknown>;
    };
} | {
    state: string;
    data: {
        status: boolean;
        msg: string;
    };
}>;
export default getVideo;
