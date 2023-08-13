export const HIDDEN_LOGIN_METHODS = [
  'reddit', 
  'apple', 
  'line', 
  'kakao', 
  'linkedin', 
  'weibo', 
  'wechat', 
  'email_passwordless'
]

export const INFURA_API_KEY = 'f36f7f706a58477884ce6fe89165666c'

export const CHAIN_ID_TO_NODE: { [key: number]: string} = {
  1: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
  5: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
  137: `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
  80001: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
  10: `https://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}`,
  420: `https://optimism-goerli.infura.io/v3/${INFURA_API_KEY}`,
  42161: `https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}`,
  421613: `https://arbitrum-goerli.infura.io/v3/${INFURA_API_KEY}`,
  43114: `https://avalanche-mainnet.infura.io/v3/${INFURA_API_KEY}`,
  43113: `https://avalanche-fuji.infura.io/v3/${INFURA_API_KEY}`,
  1313161554: `https://aurora-mainnet.infura.io/v3/${INFURA_API_KEY}`,
  1313161555: `https://aurora-testnet.infura.io/v3/${INFURA_API_KEY}`,
  56: 'https://wandering-quaint-reel.bsc.quiknode.pro/508c3d245c14adb8689ed4073d29aa5795dfa24e/',
  97: 'https://sly-indulgent-paper.bsc-testnet.quiknode.pro/ab7e00c229f5967334160958e40fd6a4d893fb93/',
  8453: 'https://twilight-red-tree.base-mainnet.quiknode.pro/dc6eb27bf0f917df215922488dd97f4de7d9b08e/',
  84531: 'https://icy-long-mountain.base-goerli.quiknode.pro/5b80d93e97cc9412a63c10a30841869abbef9596/',
  100: 'https://nd-102-326-870.p2pify.com/3a2549e32e81ed7757e597dcec9922f3',
  10200: 'https://nd-810-853-201.p2pify.com/e828b09f0d43591de96c297b3f36fffd'
}
export const ZERODEV_CLIENT_ID = process.env.REACT_APP_ZEROKIT_WEB3AUTH_CLIENT_ID ?? 'BEjNZMt6TPboj3TfHM06MP8Yxz7cKQX6eK3KZzVhrIMi7jALcZHxJv5o3fDLM7EL4QfPlf2AV_qe155vyR3QxiU'