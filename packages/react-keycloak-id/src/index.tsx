import * as React from "react";
import { createContext, useEffect, useState, useCallback, useContext } from "react";
import Keycloak from "keycloak-js";
import type T_Keycloack from "keycloak-js";
import type { KeycloakInitOptions } from 'keycloak-js'

export interface I_UseReactKeycloakId extends T_Keycloack {
    /** Countdown time if used onCountdown of token or refresh token */
    countDown: {
        remains: number;
        minutes: number;
        seconds: number;
    };
    /** onCountdown if you want to using countdown time of token or refresh token
     * 
     * @example
     * const { onCountDown } = useReactKeycloackId();
     * useEffect(() => {
            const interval = setInterval(onCountDown, 1000);
            return () => clearInterval(interval);
        }, []);
     * 
     */
    onCountDown: (from?: "token" | "refresh-token") => void;
}
export interface I_InitKeycloak {
    init: {
        url: string;
        realm: string;
        clientId: string;
    }
}

export interface TReactKeycloackProvider extends I_InitKeycloak {
    children: JSX.Element;
    loadingComponent?: JSX.Element | string;
    errorComponent?: JSX.Element | string;
    initOptions?: KeycloakInitOptions
}

const ReactKeycloackCTX = createContext<T_Keycloack | null>(null);

export const useReactKeycloackId = (): I_UseReactKeycloakId => {
    const dataKeycloak = useContext(ReactKeycloackCTX)
    const [countDown, setCountDown] = useState<{ remains: number; minutes: number; seconds: number }>({
        remains: 0,
        minutes: 0,
        seconds: 0,
    });

    const onCountDown = (from: "token" | "refresh-token" = "refresh-token") => {
        const d = new Date();
        const expFrom = from === "token" ? dataKeycloak?.idTokenParsed?.exp : dataKeycloak?.refreshTokenParsed?.exp
        const $remains = Math.floor(expFrom - d.getTime() / 1000);
        const $remainsMM = Math.floor($remains / 60);
        const $remainsMS = $remains - 60 * $remainsMM;

        if ($remains > 1 || $remainsMM > 1) {
            setCountDown({
                remains: $remains,
                minutes: $remainsMM,
                seconds: parseInt(s($remainsMS))
            })
        } else {
            setCountDown({
                remains: 0,
                minutes: 0,
                seconds: 0
            })
        }
    }

    function s(val: number): string {
        if (val < 10) {
            return "0" + val;
        } else {
            return val.toString();
        }
    }

    const allData = {
        ...dataKeycloak,
        onCountDown,
        countDown,
    } as I_UseReactKeycloakId

    return allData
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