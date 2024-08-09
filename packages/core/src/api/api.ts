import { initializeSharingScope, loadScript } from '../integrations/webpack';
import { getContainerKey, initContainer } from '../lib';
import { getScope } from '../lib/scopes';
import type {
    GetModuleOptions,
    GetModulesOptions,
    RemoteContainer,
    RemoteOptions,
} from '../types';


/** Return intialized remote container
 * 
 * @returns remote container
 */
export async function loadAndInitializeRemote(
    remoteOptions: RemoteOptions
): Promise<RemoteContainer> {
    const globalScope = getScope()
    const containerKey = getContainerKey(remoteOptions)

    const asyncContainer = loadScript(containerKey, remoteOptions)

    if (!asyncContainer) {
        throw new Error("Unable to load remote container.")
    }

    // TODO: pass init tokens to getSharingScope 
    if (!globalScope) {
        globalScope.__sharing_scope__ = await initializeSharingScope()
    }

    return initContainer(asyncContainer, globalScope.__sharing_scope__)
}