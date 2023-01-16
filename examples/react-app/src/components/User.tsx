import React, { useEffect } from 'react'
import { useReactKeycloackId } from 'react-keycloak-id'
import Count from './Count'

type Props = {}

const User = (props: Props) => {
    const dataKeycloak = useReactKeycloackId()
    const { idTokenParsed, logout, loadUserProfile } = useReactKeycloackId()

    useEffect(() => {
        /* All data keycloak */
        console.log("keyclaok ", dataKeycloak)

        /* Load user profile */
        loadUserProfile().then((data) => {
            console.log(data)
        }).catch((e) => { console.log(e) })
    }, [])

    return (
        <div style={{ display: 'block', width: '300px', margin: '100px auto' }}>{idTokenParsed?.name}
            <br />
            <br />
            <button onClick={() => {
                logout();
            }}>Logout</button>
            <br />
            <br />
            Token expiration countdown: <br />
            <Count />
        </div>
    )
}


export default React.memo(User);