import React from 'react';
import { ReactKeycloackProvider } from 'react-keycloak-id';
import User from './components/User';

const init = {
  url: process.env.REACT_APP_KEYCLOAK_URL as string,
  realm: process.env.REACT_APP_KEYCLOAK_REALM as string,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID as string,
}

function App() {
  return (
    <ReactKeycloackProvider init={init}>
      <React.StrictMode>
        <User />
      </React.StrictMode>
    </ReactKeycloackProvider>
  );
}

export default App;
