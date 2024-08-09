import type { RemoteScope } from '../types'

/**
 * 
 * @returns Returns the window or global object. 
 * The Module is either currently in the window, or it's somewhere else waiting to be fetched. 
 * Be used as `global.__remote_scope__[uniqueKey]` 
 */

export function getScope(): RemoteScope {
    // TODO: is this generated at runtime? 
    // @ts-expect-error generate

    return (typeof window !== 'undefined' ? window : global.__remote_scope__) as unknown as RemoteScope;
}

