export { getChainConfig } from "@web3auth/base";
export { getOpenloginAdapterConfig } from "./configs/openloginAdapterConfig";
export { getWeb3AuthConfig } from "./configs/web3AuthConfig";
export * from './types'
import ZeroDevWeb3AuthWithModal from "./ZeroDevWeb3AuthWithModal";
import ZeroDevWeb3Auth from "./ZeroDevWeb3Auth";
export type { LoginProvider } from "./ZeroDevWeb3Auth";
export {
    ZeroDevWeb3Auth,
    ZeroDevWeb3AuthWithModal,
}