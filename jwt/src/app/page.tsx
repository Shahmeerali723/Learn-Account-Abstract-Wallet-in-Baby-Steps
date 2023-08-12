import { getZeroDevSigner, getRPCProviderOwner } from '@zerodevapp/sdk'
import { ZeroDevWeb3Auth, ZeroDevWeb3AuthWithModal } from '@zerodevapp/web3auth';

let signer: ZeroDevSigner

const zeroDevWeb3AuthNoModal = new ZeroDevWeb3Auth(['<project-id>'])
zeroDevWeb3AuthNoModal.init({onConnect: async () => {
  signer = await getZeroDevSigner({
    projectId: "<project id>",
    owner: await getRPCProviderOwner(ZeroDevWeb3Auth.provider),
  })
}})
// 'google' | 'facebook' | 'twitter' | 'discord' | 'github' | 'twitch'
ZeroDevWeb3Auth.connect('google')
