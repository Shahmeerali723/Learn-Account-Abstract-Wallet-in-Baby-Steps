import { Web3AuthNoModal, Web3AuthNoModalOptions } from "@web3auth/no-modal";
import { CHAIN_ID_TO_NODE } from "./constants";
import { OpenloginAdapterOptions } from "@web3auth/openlogin-adapter";
import { LoginProvider } from "./ZeroDevWeb3Auth";
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";

export type ChainId = keyof typeof CHAIN_ID_TO_NODE

export type ZeroDevWeb3AuthOptions = {
    web3authOptions?: Partial<Web3AuthNoModalOptions>,
    adapterSettings?: Partial<OpenloginAdapterOptions['adapterSettings']>
}

export type ZeroDevWeb3AuthConstructor<T> = new (projectIds: string[], chainid?: ChainId, options?: ZeroDevWeb3AuthOptions) => T

export type ZeroDevWeb3AuthInitOptions = {
    onConnect?: (userInfo: Partial<UserInfo>) => Promise<void> | void,
}

export type ZeroDevWeb3AuthGeneric<T> = T & {
    connect: (loginProvider: LoginProvider, extra?: {jwt?: string}) => Promise<SafeEventEmitterProvider> | null,
    init: (options: ZeroDevWeb3AuthInitOptions) => Promise<void>
    initModal: (options: ZeroDevWeb3AuthInitOptions) => Promise<void>
}


export type ZeroDevWeb3Auth = ZeroDevWeb3AuthGeneric<Web3AuthNoModal>
export type ZeroDevWeb3AuthWithModal = ZeroDevWeb3AuthGeneric<Web3Auth>