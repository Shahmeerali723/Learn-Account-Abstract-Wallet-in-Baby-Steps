import { CHAIN_NAMESPACES } from "@web3auth/base";
import { CHAIN_ID_TO_NODE } from "../constants";


export const getChainConfig = (chainId: keyof typeof CHAIN_ID_TO_NODE) => ({
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: `0x${chainId?.toString(16)}`,
  rpcTarget: CHAIN_ID_TO_NODE[chainId],
})