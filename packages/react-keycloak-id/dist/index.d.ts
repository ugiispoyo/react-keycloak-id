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
export declare const useReactKeylock: () => T_Keycloack;
export declare const ReactKeycloackProvider: ({ init, children }: TReactKeycloackProvider) => JSX.Element;
