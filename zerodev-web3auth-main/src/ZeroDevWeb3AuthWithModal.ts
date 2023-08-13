import { Web3Auth } from "@web3auth/modal";
import { ADAPTER_EVENTS, ADAPTER_STATUS, CONNECTED_EVENT_DATA, WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter, OpenloginAdapterOptions } from "@web3auth/openlogin-adapter";
import { getOpenloginAdapterConfig } from "./configs/openloginAdapterConfig";
import { getProjectsConfiguration } from '@zerodevapp/sdk'
import { getWeb3AuthConfig } from "./configs/web3AuthConfig";
import { ZeroDevWeb3AuthConstructor, ZeroDevWeb3AuthInitOptions, ZeroDevWeb3AuthWithModal } from "./types";
import { HIDDEN_LOGIN_METHODS, ZERODEV_CLIENT_ID } from "./constants";
import { isMobileDevice } from "./utilities";


const proxyHandler = {
    instance: null as Web3Auth | null,
    construct(target: typeof Web3Auth, [projectIds, chainId, options]: ConstructorParameters<ZeroDevWeb3AuthConstructor<ZeroDevWeb3AuthWithModal>>): Web3Auth {
        if (!this.instance) {
            const instance: Web3Auth = Reflect.construct(target, [getWeb3AuthConfig(chainId, options?.web3authOptions)]);
            let initiated: Promise<void> | boolean = false

            this.instance = new Proxy(instance, {
                get(target, property, receiver) {
                    if (property === "init") {
                        if (initiated) {
                            return async function (this: Web3Auth, initOptions?: ZeroDevWeb3AuthInitOptions) {
                                if (initOptions?.onConnect) {
                                    instance.on(ADAPTER_EVENTS.CONNECTED, (data: CONNECTED_EVENT_DATA) => {
                                        instance.getUserInfo().then(initOptions.onConnect)
                                    });
                                }
                            }
                        }
                        initiated = true
                        return async function (this: Web3Auth, initOptions?: ZeroDevWeb3AuthInitOptions) {
                            let openLoginAdapterSettings: OpenloginAdapterOptions['adapterSettings'] = {
                                    uxMode: isMobileDevice() ? 'redirect' : 'popup',
                                    whiteLabel: {
                                        name: "ZeroDev",
                                    },
                                    ...(options?.adapterSettings ?? {})
                            }
                            if (!options?.web3authOptions?.clientId || options.web3authOptions.clientId === ZERODEV_CLIENT_ID) {
                                const { signature } = (await getProjectsConfiguration(projectIds))
                                openLoginAdapterSettings = getOpenloginAdapterConfig({
                                    signature: options?.web3authOptions?.clientId ? undefined : signature,
                                    adapterSettings: options?.adapterSettings
                                })
                            }
                            const openLoginAdapter = new OpenloginAdapter({adapterSettings: openLoginAdapterSettings})
                            instance.configureAdapter(openLoginAdapter)
                            if (initOptions?.onConnect) {
                                instance.on(ADAPTER_EVENTS.CONNECTED, (data: CONNECTED_EVENT_DATA) => {
                                    instance.getUserInfo().then(initOptions.onConnect)
                                });
                            }
                            if (instance.status === ADAPTER_STATUS.NOT_READY) {
                                initiated = Reflect.get(target, 'initModal').apply(this, [{
                                    modalConfig: {
                                        [WALLET_ADAPTERS.OPENLOGIN]: {
                                            label: "openlogin",
                                            loginMethods: {
                                                ...(HIDDEN_LOGIN_METHODS.reduce((hiddenLoginLoginConfig, hiddenLoginMethod) => ({...hiddenLoginLoginConfig, [hiddenLoginMethod]: {typeOfLogin: hiddenLoginMethod, showOnModal: false}}), {}))
                                            },
                                        }

                                    }
                                }]);
                            }
                        }
                    }
                    if (property === "connect") {
                        return async function (this: Web3Auth) {
                            if (instance.status === 'connecting') {
                                instance.status = 'ready'
                                instance.walletAdapters[WALLET_ADAPTERS.OPENLOGIN].status = 'ready'
                            }
                            // Checks 5 times in a period of a second if initiated changed
                            for (let i = 1; i <= 5; i++) {
                                if (initiated instanceof Promise) {
                                    await initiated
                                    break;
                                }
                                await new Promise((resolve) => setTimeout(resolve, 5000 / 5));
                            }
                            if (instance.status !== 'connected') {
                                return Reflect.get(target, property).apply(this);
                            }
                            return instance.provider
                        }
                    }
                    return Reflect.get(target, property);
                },
            });
        }
        return this.instance;
    },
};

const ZeroDevWeb3AuthWithModal = new Proxy(Web3Auth, proxyHandler) as unknown as ZeroDevWeb3AuthWithModal;

export default ZeroDevWeb3AuthWithModal