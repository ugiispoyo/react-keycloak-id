import type T_Keycloack from "keycloak-js";
import type { KeycloakInitOptions } from 'keycloak-js';
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
    };
}
export interface TReactKeycloackProvider extends I_InitKeycloak {
    children: JSX.Element;
    loadingComponent?: JSX.Element | string;
    errorComponent?: JSX.Element | string;
    initOptions?: KeycloakInitOptions;
}
export declare const useReactKeycloackId: () => I_UseReactKeycloakId;
export declare const ReactKeycloackIdProvider: ({ init, children, loadingComponent, errorComponent, initOptions }: TReactKeycloackProvider) => JSX.Element;
