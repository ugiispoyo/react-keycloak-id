import*as React from'react';import {createContext,useState,useCallback,useEffect}from'react';import Keycloak from'keycloak-js';var init = {
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
};
var ReactKeycloackCTX = createContext(null);
var ReactKeycloackProvider = function (_a) {
    var children = _a.children;
    var _b = useState(null), dataKeycloak = _b[0], setDataKeycloak = _b[1];
    var _c = useState(false), isError = _c[0], setIsError = _c[1];
    var initKey = useCallback(function () {
        var initKeycloak = new Keycloak(init);
        initKeycloak
            .init({ onLoad: "login-required", checkLoginIframe: false })
            .then(function (authenticated) {
            console.log("is authenticed: ", authenticated);
            if (authenticated) {
                setDataKeycloak(initKeycloak);
            }
            else {
                setIsError(true);
            }
        })
            .catch(function (e) {
            console.log("Error init keycloak: ", e);
            setIsError(true);
        });
    }, []);
    useEffect(function () {
        initKey();
    }, [initKey]);
    return (React.createElement(React.Fragment, null, isError ? (React.createElement(React.Fragment, null, "Terjadi kesalahan!")) : dataKeycloak ? ((dataKeycloak === null || dataKeycloak === void 0 ? void 0 : dataKeycloak.authenticated) ? (React.createElement(ReactKeycloackCTX.Provider, { value: dataKeycloak }, children)) : (React.createElement("div", null, "Failed to initialize keycloak, please to refresh browser!"))) : (React.createElement(React.Fragment, null, "Loading..."))));
};export{ReactKeycloackCTX,ReactKeycloackProvider};