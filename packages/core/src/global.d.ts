declare global {
    interface Window {
        [index: string | number]: unknown;
        remoteLoading: Record<string, import('./types').AsyncContainer | undefined>;
        __remote_scope__: Record<string, import('./types').RemoteContainer>;
    }
}