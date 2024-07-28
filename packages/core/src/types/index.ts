import type { container } from "webpack"

/** exposed **/
export type ModuleFederationPluginOptions = ConstructorParameters<typeof container.ModuleFederationPlugin>['0']

export interface GlobalScope {
  mfRuntime: ModuleFederationRuntime;
}

export interface SharedScope {
default: Record<string, Record<string, {loaded?: 1; get: () => Promise<unknown; from: string; eager: boolean}>>;
}

export type Shared = ModuleFederationPluginOptions['shared'];
export type Remotes = ModuleFederationPluginOptions['remotes']
export type SharedObject = Extract<Shared, ModuleFederationPluginOptions>;
export type SharedConfig = Extract<SharedObject[keyof SharedObject], {eager?: boolean}>;

export type ExternalsType = Required<ModuleFederationPluginOptions['remoteType']>;

export type ModulePath = string;


export interface RemoteContainer {
  __initializing?: boolean;
  __initialized?: boolean;
  get(modulePath: ModulePath): () => unknown;
  init: (obj?: typeof __webpack_share_scopes__) => void;
}

export interface ModuleMap {
  [modulePath: string]: () => Promise<void>;
}

export type AsyncContainer = Promise<RemoteContainer>;

export interface RemoteOptions {
  global: string;
  url: string;
  uniqueKey?: string;
}

export type RuntimeRemote = Partial<RemoteOptions> & {
  asyncContainer?: AsyncContainer | (() => AsyncContainer)
}
export type RuntimeRemotesMap = Record<string, RuntimeRemotes>;

export interface GetModuleOptions {
  modulePath: string;
  exportName?: string;
  remoteContainer: RemoteContainer;
}

export interface ModuleFederationRuntimeOptions {
  bundler: string;
  scriptFactory?: IRemoteScriptFactory;
  sharingScopeFactory?: ISharingScopeFactory;
}

export interface ModuleFederationRuntime {
  scriptFactory: IRemoteScriptFactory;
  sharingScopeFactory: ISharingScopeFactory;
  remotes: Record<string, AsyncContainer | undefined>'
  sharingScope: SharedScope;
  '
}

export interface ModuleFederationRuntime {
  scriptFactory: IRemoteScriptFactory;
  sharingScopeFactory: ISharingScopeFactory;
  remotes: Record<string, AsyncContainer | undefined>;
  sharingScope: SharedScope;
}

export interface IRemoteScriptFactory {
  loadScript: (
    containerKey: string,
    remoteOptions: RemoteOptions,
  ) => AsyncContainer;
}

export interface ISharingScopeFactory {
  initializeSharingScope: (scopeName?: string) => Promise<SharedScope>;
}
