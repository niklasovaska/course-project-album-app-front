import { useState } from "react"
import axios from 'axios'
import Albumlist from "./Albumlist"


type User = {
    username: string;
    password: string;
}

const Login = () => {

    const [user, setUser] = useState<User>({username: '', password: ''})
    const [isAuthenticated, setAuth] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        {
            setUser({...user,
                [event.target.name] : event.target.value
            })
        }
    }

    const handleLogin = () => {
        axios.post('http://localhost:8080/login', user, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            const jwtToken = res.headers.authorization

            if(jwtToken !== null) {
                sessionStorage.setItem('jwt', jwtToken)
                setAuth(true)
            }

        })
        .catch(error => console.log(error))
    }

    if(isAuthenticated) {
        return <Albumlist />
    }
    else {
        return(
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', gap: 4}}>
                    <label htmlFor='username'></label>
                    <input name='username' id='username' onChange={handleChange}/>
                </div>
                <div style={{display: 'flex', gap: 4}}>
                    <label htmlFor='password'></label>
                    <input name='password' id='password' onChange={handleChange}/>
                </div>
                <button onClick={handleLogin}>Login</button>
                
            </div>
        )  
    }
}

export default Login