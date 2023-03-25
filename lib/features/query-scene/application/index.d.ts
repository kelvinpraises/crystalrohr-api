declare const queryScene: () => Promise<{
    state: string;
    data: {
        status: boolean;
        msg: unknown;
    };
}>;
export default queryScene;
