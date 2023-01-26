[![npm stat](https://img.shields.io/npm/dm/react-keycloak-id.svg?style=flat-square)](https://npm-stat.com/charts.html?package=react-keycloak-id)
[![npm version](https://img.shields.io/npm/v/react-keycloak-id.svg?style=flat-square)](https://www.npmjs.com/package/react-keycloak-id)

# React Keycloak Id

A simple react middleware using [keycloak](https://www.keycloak.org/) for a web

## Installation

```bash
npm i react-keycloak-id
```

**or**

```bash
yarn add react-keycloak-id
```

## How to use

1. setup your keycloak
2. note: `don't use <React.StrictMode> outside of <ReactKeycloakIdProvider>`
3. if using CRA (Create React App) remove `<React.StrictMode>` on file index.js or index.tsx
4. wrap everything inside `ReactKeycloackIdProvider`
5. code example on App.js or App.tsx

```javascript
import React from 'react';
import { ReactKeycloackIdProvider } from 'react-keycloak-id';

const init = {
  url: process.env.REACT_APP_KEYCLOAK_URL as string,
  realm: process.env.REACT_APP_KEYCLOAK_REALM as string,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID as string,
}

function App() {
  return (
    <ReactKeycloackIdProvider init={init}>
      <React.StrictMode>
        {/* Your component */}
      </React.StrictMode>
    </ReactKeycloackIdProvider>
  );
}

export default App;
```


<hr/>

### ReactKeycloakIdProvider

`ReactKeycloakIdProvider` for wrap everything components, router, redux and others

#### ReactKeycloakIdProvider Props

| Props            | Type                                                                                              | Default                                             | Required |
| ---------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------- | -------- |
| children         | JSX.Element, ReactNode                                                                            | -                                                   | true     |
| init             | object{**[Init](#init)**}                                                                         | -                                                   | true     |
| initOptions      | object{**[Init Options](https://www.keycloak.org/docs/latest/securing_apps/index.html#methods)**} | {onLoad: "login-required", checkLoginIframe: false} | false    |
| loadingComponent | JSX.Element, ReactNode, string                                                                    | Loading...                                          | false    |
| errorComponent   | JSX.Element, ReactNode, string                                                                    | Something went error!                               | false    |

#### Init

| Props    | Type   | Default | Required |
| -------- | ------ | ------- | -------- |
| url      | string | -       | true     |
| realm    | string | -       | true     |
| clientId | string | -       | true     |


<hr/>

### useReactKeycloackId

`useReactKeycloackId` hook of `ReactKeycloackId`
<br/>

#### properties of hook useReactKeycloackId

#### 1. `countDown`
countDown time if used `onCountDown` of token or refresh token
<br/>

`type`: `object {remains: number; minutes: number; seconds: number;}`

#### 2. `onCountDown`
onCountDown time function of token or refresh token
<br/>

`type`: `(from: "token" | "refresh-token") => void`
<br/>

usage example `countDown` & `onCountDown`:

```javascript
export default = () => {
  const { countDown, onCountDown } = useReactKeycloackId();

  useEffect(() => {
    const interval = setInterval(() => onCountDown("refresh-token"), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <span>
        {countDown.minutes} minutes {countDown.seconds} seconds
      </span>
    </div>
  )
}
```
#### 3. `keycloakOnClick`
This function is used to refresh the token when the token has run out which can be used for other functions that require tokens. by using this function you no longer need to manually create a refresh token. you just put functions that require a token into the arguments of this function. there are two arguments inside this function.

1. Callback function `[cb]: any[]`, which can be used to put your function and can be multiple functions.
2. Options Object `{onError?: (err: boolean) => void; minValidity?: number | 5}`. this is optional.
<br/>

`type`: `([...cb]: any[], { onError?: (err: boolean) => void; minValidity?: number | 5 }) => Promise<void>`
<br/>

usage example `keycloakOnClick`:

```javascript
export default = () => {
  const { keycloakOnClick } = useReactKeycloackId()

  const func1 = () => {
    console.log("1")
  }

  const func2 = () => {
    console.log("2")
  }

  function onErrorRefreshToken(err: boolean) {
    if(err) {
      console.log("Token was expired ", err)
    }
  }

  const options = {
    onError: onErrorRefreshToken
  }

  return (
    <button onClick={() => keycloakOnClick([testClick1, testClick2], options)}>Click Me For Refresh Token (If expired)</button>
  )
}
```

[More details properties of hook useReactKeycloackId](https://www.keycloak.org/docs/latest/securing_apps/index.html#javascript-adapter-reference)
<hr/>

<br/>
Usage example:

```javascript
import React, { useEffect } from "react";
import { useReactKeycloackId } from "react-keycloak-id";

export default () => {
    const dataKeycloak = useReactKeycloackId();
    const { idTokenParsed, logout } = useReactKeycloackId();

    useEffect(() => {
        console.log(dataKeycloak);
    }, []);

    return (
        <div>
            Name: {idTokenParsed?.name}
            <br />
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
};
```

<br/>

### Example with "login-required" initial
![Example](https://drive.google.com/uc?export=view&id=1ZDBJ7Mfg8X4IBjl3A7vNb9lYQw6vW9Qs)


[Demo code with "login-required" initial](https://github.com/ugiispoyo/react-keycloak-id/tree/master/examples/react-app)

<hr/>
<br/>

### Example with "check-sso" initial
![Example](https://drive.google.com/uc?export=view&id=1C5DmvFGYo3Mw8q0CtFYqSE8a4F3uOb5Z)

[Demo code with "check-sso" initial](https://github.com/ugiispoyo/react-keycloak-id/tree/master/examples/with-check-sso)
