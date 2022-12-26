import type T_Keycloack from "keycloak-js";
import type { KeycloakInitOptions } from 'keycloak-js';
export interface TInitKeycloak {
    init: {
        url: string;
        realm: string;
        clientId: string;
    };
}
export interface TReactKeycloackProvider extends TInitKeycloak {
    children: JSX.Element;
    loadingComponent?: JSX.Element | string;
    errorComponent?: JSX.Element | string;
    initOptions?: KeycloakInitOptions;
}
export declare const useReactKeycloackId: () => T_Keycloack;
export declare const ReactKeycloackIdProvider: ({ init, children, loadingComponent, errorComponent, initOptions }: TReactKeycloackProvider) => JSX.Element;
