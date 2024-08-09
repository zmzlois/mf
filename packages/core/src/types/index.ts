/* eslint-disable @nx/enforce-module-boundaries */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../node_modules/webpack/module.d.ts"/>
import type { container } from "webpack";

/** exposed **/
export type ModuleFederationPluginOptions = ConstructorParameters<typeof container.ModuleFederationPlugin>['0']

export interface GlobalScope {
  mfRuntime: ModuleFederationRuntime;
}

export interface SharedScope {
  default: Record<string, Record<string, { loaded?: 1; get: () => Promise<unknown>; from: string; eager: boolean }>>;
}

export type Shared = ModuleFederationPluginOptions['shared'];
export type Remotes = ModuleFederationPluginOptions['remotes']
export type SharedObject = Extract<Shared, ModuleFederationPluginOptions>;
export type SharedConfig = Extract<SharedObject[keyof SharedObject], { eager?: boolean }>;

export type ExternalsType = Required<ModuleFederationPluginOptions['remoteType']>;

export type ModulePath = string;


export interface RemoteContainer {
  __initializing?: boolean;
  __initialized?: boolean;
  get(modulePath: ModulePath): () => unknown;
  /* __webpack_share_scopes__ is a webpack type
  * TODO: why is this not native yet?  
  */
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
export type RuntimeRemotesMap = Record<string, RuntimeRemote>;

export interface GetModuleOptions {
  modulePath: string;
  exportName?: string;
  remoteContainer: RemoteContainer;
}

// TODO: why is "GetModuleOptions" and "GetModulesOptions" separated? 
export interface GetModulesOptions {
  modulePaths: string[];
  remoteContainer: RemoteContainer
}

export interface ModuleFederationRuntimeOptions {
  bundler: string;
  // TODO: wtf is this
  scriptFactory?: IRemoteScriptFactory;
  sharingScopeFactory?: ISharingScopeFactory;
}


export interface ModuleFederationRuntime {
  scriptFactory: IRemoteScriptFactory;
  sharingScopeFactory: ISharingScopeFactory;
  remotes: Record<string, AsyncContainer | undefined>;
  sharingScope: SharedScope;
}

export interface RemoteScope {
  [index: string]:
  | AsyncContainer
  | string
  | undefined // TODO: if it is undefined how'd this thing exists? 
  | Record<string, string>
  | SharedScope
  | ModuleFederationRuntime; // TODO: why there are two runtime config here? 
  _config: Record<string, string>;
  __sharing_scope__?: SharedScope; // TODO: why there are two SharedScope config here? 
  _runtime?: ModuleFederationRuntime
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
