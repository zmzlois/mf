import type {
    ModuleFederationRuntime,
    ModuleFederationRuntimeOptions,
} from "../types"

export function createModuleFederationRuntime(
    options?: ModuleFederationRuntimeOptions
): ModuleFederationRuntime {
    const scriptFactory = options?.scriptFactory ?? { loadScript }
}