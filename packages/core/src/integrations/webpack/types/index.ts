export declare const __webpack_init_sharing__: (
    parameter: string
) => Promise<void>


export type WebpackRequire = {

    // TODO: wtf is this l ? 
    l: (
        url: string | undefined,
        cb: (event: any) => void,
        // TODO: where tf this id coming from ? webpack? 
        id: string | number,
    ) => Record<string, unknown>;
    // TODO: wtf is this S? 
    S: Record<string, unknown>;
}