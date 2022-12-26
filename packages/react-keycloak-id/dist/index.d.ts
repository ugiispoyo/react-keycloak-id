import type T_Keycloack from "keycloak-js";
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
}
export declare const useReactKeycloackId: () => T_Keycloack;
export declare const ReactKeycloackIdProvider: ({ init, children, loadingComponent, errorComponent }: TReactKeycloackProvider) => JSX.Element;
