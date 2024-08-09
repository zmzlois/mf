import type {
    ModuleFederationRuntime,
    ModuleFederationRuntimeOptions,
} from "../types"
import { initializeSharingScope } from "../integrations/webpack"
export function createModuleFederationRuntime(
    options?: ModuleFederationRuntimeOptions
): ModuleFederationRuntime {

    // TODO: what's this
    const scriptFactory = options?.scriptFactory ?? { loadScript }

    // TODO: what's "sharingScopeFactory"
    const sharingScopeFactory = options?.sharingScopeFactory ?? {
        initializeSharingScope,
    }

    return {
        scriptFactory,
        sharingScopeFactory,
        remotes: {},
        sharingScope: {
            default: {}
        }
    }

}