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
     * function to check token expired or not
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
        return (
      <button onClick={() => keycloakOnClick(testClick1, testClick2)}>Click Me</button>
        )
     *
     */
    keycloakOnClick: (...cb: Array<(args?: any) => any>) => Promise<void>;
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
