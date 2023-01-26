import React, { useEffect } from 'react'
import { useReactKeycloackId } from 'react-keycloak-id'
import Count from './Count'
import CountdonwRefrehToken from './CountdonwRefrehToken'

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

    const onErrorRefreshToken = (err: boolean) => {
        if(err) {
            console.log("Token was expired ", err)
            // dataKeycloak.logout()
        }
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
            <button onClick={() => keycloakOnClick([testClick1, testClick2], onErrorRefreshToken)}>Click Me For Refresh Token (If token is expired and refresh token not expired)</button>
            <br />
            <br />
            Token expiration countdown: <br />
            <Count />
            <br />
            Refresh Token expiration countdown: <br />
            <CountdonwRefrehToken />
            <br />
        </div>
    )
}


export default React.memo(User);