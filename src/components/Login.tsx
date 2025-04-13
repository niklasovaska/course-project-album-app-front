import { useState } from "react"
import axios from 'axios'


type User = {
    username: string;
    password: string;
}

const Login = () => {

    const [user, setUser] = useState<User>({username: '', password: ''})
    const [isAuthenticated, setAuth] = useState(false)

    return(
        <>
        </>
    )
}

export default Login