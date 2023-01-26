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
     const { onCountDown } = useReactKeycloackId();
            useEffect(() => {
                const interval = setInterval(() => onCountDown("refresh-token"), 1000);
                return () => clearInterval(interval);
        }, []);
     *
     */
    onCountDown: (from?: "token" | "refresh-token") => void;
    /**
     * This function is used to refresh the token when the token has run out which can be used for other functions that require tokens. by using this function you no longer need to manually create a refresh token. you just put functions that require a token into the arguments of this function. there are two arguments inside this function.
         1. The first argument is callback `[cb]: any[]`, which can be used to put your function and can be multiple functions.
         2. callback onError `(err: boolean) => void`, used to put the callback function when an error occurs when refreshing the token, this error when refresh token was expired, this is optional.
     *
     * @example
     *
        const { keycloakOnClick } = useReactKeycloackId()

        const testClick1 = () => {
            console.log("1")
        }
        const testClick2 = () => {
            console.log("2")
        }

        const onErrorRefreshToken = (err: boolean) => {
            if(err) {
                dataKeycloak.logout()
            }
        }
        return (
            <button onClick={() => keycloakOnClick([testClick1, testClick2], onErrorRefreshToken)}>Click Me For Refresh Token (If expired)</button>
        )
     *
     */
    keycloakOnClick: ([...cb]: any[], onError?: (err: boolean) => void) => Promise<void>;
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
