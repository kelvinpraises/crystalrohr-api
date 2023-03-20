declare const getVideo: (videoId: string) => Promise<{
    state: string;
    data: {
        status: boolean;
        msg: unknown;
    };
}>;
export default getVideo;
