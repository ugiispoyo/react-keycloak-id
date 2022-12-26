[![npm stat](https://img.shields.io/npm/dm/react-keycloak-id.svg?style=flat-square)](https://npm-stat.com/charts.html?package=react-keycloak-id)
[![npm version](https://img.shields.io/npm/v/react-keycloak-id.svg?style=flat-square)](https://www.npmjs.com/package/react-keycloak-id)
[![](https://data.jsdelivr.com/v1/package/npm/react-keycloak-id/badge)](https://www.jsdelivr.com/package/npm/react-keycloak-id)

# React Keycloak Id
A simple react middleware using keycloak for a web

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

### ReactKeycloakIdProvider
`ReactKeycloakIdProvider` for wrap everything components, router, redux and others

#### ReactKeycloakIdProvider Props
Props | Type | Default | Required |
--- | --- | --- | --- |
children | JSX.Element, ReactNode | - | true |
init | object{**[Init](#init)**} | - | true |
loadingComponent | JSX.Element, ReactNode, string | Loading... | false
errorComponent | JSX.Element, ReactNode, string | Something went error! | false

#### Init
Props | Type | Default | Required |
--- | --- | --- | --- |
url | string | - | true |
realm | string | - | true |
clientId | string | - | true |

### useReactKeycloackId
`useReactKeycloackId` hook of `ReactKeycloackId` <br/>
Usage example:

```javascript
import React, { useEffect } from "react";
import { useReactKeycloackId } from 'react-keycloak-id'

export default () => {
  const dataKeycloak = useReactKeycloackId()
  const { idTokenParsed, logout } = useReactKeycloackId()

  useEffect(() => {
    console.log(dataKeycloak)
  }, [])

  return (
    <div>
      Name: {idTokenParsed?.name}
      <br/>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}
```

[Code Example](https://github.com/ugiispoyo/react-keycloak-id/tree/master/apps/react-app)

[Live Code Example](https://stackblitz.com/edit/react-ts-llmlug?file=App.tsx)