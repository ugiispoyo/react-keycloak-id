import React, { useEffect } from 'react'
import { useReactKeycloackId } from 'react-keycloak-id'
import Count from './Count'

const User = () => {
    const dataKeycloak = useReactKeycloackId()
    const { idTokenParsed, logout, loadUserProfile, keycloakOnClick } = useReactKeycloackId()

    useEffect(() => {
        /* All data keycloak */
        console.log("keyclaok ", dataKeycloak)

        /* Load user profile */
        loadUserProfile().then((data) => {
            console.log(data)
        }).catch((e) => { console.log(e) })
    }, [])

    const testClick1 = () => {
        console.log("1")
    }
    const testClick2 = () => {
        console.log("2")
    }

    return (
        <div style={{ display: 'block', width: '300px', margin: '100px auto' }}>{idTokenParsed?.name}
            <br />
            <br />
            <button onClick={() => {
                logout();
            }}>Logout</button>
            <br />
            <br />
            <button onClick={() => keycloakOnClick(testClick1, testClick2)}>Click Me</button>
            <br />
            <br />
            Token expiration countdown: <br />
            <Count />
        </div>
    )
}


export default React.memo(User);