import React, { useEffect } from 'react'
import { useReactKeylock } from 'react-keycloak-id'

type Props = {}

const User = (props: Props) => {
    const dataKeycloak = useReactKeylock()
    const { idTokenParsed, logout } = useReactKeylock()

    useEffect(() => {
        console.log(dataKeycloak)
    }, [])

    return (
        <div style={{ display: 'block', width: '300px', margin: '100px auto' }}>{idTokenParsed?.name}
            <br />
            <br />
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
}


export default User;