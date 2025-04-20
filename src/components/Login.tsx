import { useState } from "react"
import axios from 'axios'
import { Button } from "../components/ui/button"
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
            <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                <div style={{display: 'flex', gap: 4}}>
                    <label htmlFor='username'>Username: </label>
                    <input name='username' id='username' onChange={handleChange}/>
                </div>
                <div style={{display: 'flex', gap: 4}}>
                    <label htmlFor='password'>Password: </label>
                    <input name='password' id='password' onChange={handleChange}/>
                </div>
                <Button onClick={handleLogin}>Login</Button>
                
            </div>
        )  
    }
}

export default Login