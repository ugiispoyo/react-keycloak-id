import * as React from "react";
import { createContext, useEffect, useState, useCallback, useContext } from "react";
import Keycloak from "keycloak-js";
import type T_Keycloack from "keycloak-js";
import type { KeycloakInitOptions } from 'keycloak-js'

export interface TInitKeycloak {
    init: {
        url: string;
        realm: string;
        clientId: string;
    }
}

export interface TReactKeycloackProvider extends TInitKeycloak {
    children: JSX.Element;
    loadingComponent?: JSX.Element | string;
    errorComponent?: JSX.Element | string;
    initOptions?: KeycloakInitOptions
}

const ReactKeycloackCTX = createContext<T_Keycloack | null>(null);

export const useReactKeycloackId = (): T_Keycloack => {
    const dataKyecloak = useContext(ReactKeycloackCTX)
    return dataKyecloak
}

export const ReactKeycloackIdProvider = ({ init, children, loadingComponent, errorComponent, initOptions }: TReactKeycloackProvider) => {
    const [dataKeycloak, setDataKeycloak] = useState<T_Keycloack | null>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const keycloakInitOptions: KeycloakInitOptions = { onLoad: "login-required", checkLoginIframe: false, ...initOptions }

    const initKey = useCallback(() => {
        const initKeycloak = new Keycloak(init);
        initKeycloak
            .init(keycloakInitOptions)
            .then((authenticated) => {
                console.log("is authenticed: ", authenticated);
                if (authenticated) {
                    setDataKeycloak(initKeycloak);
                } else {
                    setIsError(true);
                }
            })
            .catch((e) => {
                console.log("Error init keycloak: ", e);
                setIsError(true);
            });
    }, []);

    useEffect(() => {
        initKey();
    }, [initKey]);

    return (
        <>
            {isError ? (
                <>
                    {
                        errorComponent ?
                            errorComponent
                            : "Something went error!"
                    }
                </>
            ) : dataKeycloak ? (
                dataKeycloak?.authenticated ? (
                    <ReactKeycloackCTX.Provider value={dataKeycloak}>
                        {children}
                    </ReactKeycloackCTX.Provider>
                ) : (
                    <div>Failed to initialize keycloak, please to refresh browser!</div>
                )
            ) : (
                <>
                    {
                        loadingComponent ?
                            loadingComponent
                            : "Loading..."
                    }
                </>
            )}
        </>
    );
};