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
}
export declare const useReactKeycloackId: () => T_Keycloack;
export declare const ReactKeycloackIdProvider: ({ init, children }: TReactKeycloackProvider) => JSX.Element;
