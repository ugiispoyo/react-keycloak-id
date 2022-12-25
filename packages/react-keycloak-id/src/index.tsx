import * as React from "react";
import { createContext, useEffect, useState, useCallback } from "react";
import Keycloak from "keycloak-js";
import type T_Keycloack from "keycloak-js";

const init = {
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM as string,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID as string,
};

export const ReactKeycloackCTX = createContext<T_Keycloack | null>(null);

export const ReactKeycloackProvider = ({ children }: any) => {
    const [dataKeycloak, setDataKeycloak] = useState<T_Keycloack | null>(null);
    const [isError, setIsError] = useState<boolean>(false);

    const initKey = useCallback(() => {
        const initKeycloak = new Keycloak(init);
        initKeycloak
            .init({ onLoad: "login-required", checkLoginIframe: false })
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
                <>Terjadi kesalahan!</>
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
                    Loading...
                </>
            )}
        </>
    );
};