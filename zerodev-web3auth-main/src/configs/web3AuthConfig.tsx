import { getChainConfig } from './chainConfig'
import { Web3AuthNoModalOptions } from "@web3auth/no-modal";
import { CHAIN_ID_TO_NODE, ZERODEV_CLIENT_ID } from '../constants';
import { CHAIN_NAMESPACES } from '@web3auth/base';

export const getWeb3AuthConfig = (chainId?: keyof typeof CHAIN_ID_TO_NODE, web3authOptions?: Partial<Web3AuthNoModalOptions>) => {
    return {
        chainConfig: chainId ? getChainConfig(chainId) : {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
        },
        clientId: ZERODEV_CLIENT_ID,
        enableLogging: false,
        ...(web3authOptions ?? {})
    } as Web3AuthNoModalOptions
}