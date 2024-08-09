import { getScope } from "../../lib/scopes";
import type { AsyncContainer, RemoteOptions, SharedScope } from "../../types";
import type { WebpackRequire } from "./types"

export async function initializeSharingScope(
    scopeName = 'default'
): Promise<SharedScope> {
    const webpackShareScopes = __webpack_share_scopes__ as unknown as SharedScope

    if (!webpackShareScopes?.default) {
        await __webpack_init_sharing__(scopeName)
    }

    return (__webpack_require__ as unknown as WebpackRequire)
        .S as unknown as SharedScope
}