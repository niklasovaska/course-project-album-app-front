import { useState } from "react"
import axios from 'axios'
import { Button } from "../components/ui/button"
import { 
        Card, 
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle, 
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import Albumlist from "./Albumlist"
import { toast } from "sonner"


type User = {
    username: string;
    password: string;
}

const Login = () => {

    const [user, setUser] = useState<User>({username: '', password: ''})
    const [isAuthenticated, setAuth] = useState(false)
    const [formError, setFormError] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        {
            setFormError(false)
            setUser({...user,
                [event.target.name] : event.target.value
            })
        }
    }

    const handleLogin = () => {
        axios.post('http://packtalbum-env.eba-umvkcsxp.eu-north-1.elasticbeanstalk.com/login', user, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            const jwtToken = res.headers.authorization

            if(jwtToken !== null) {
                sessionStorage.setItem('jwt', jwtToken)
                setAuth(true)
            }

        })
        .catch(() => setFormError(true))
    }

    const handleLogout = () => {
        setAuth(false)
        sessionStorage.setItem("jwt", "")
        toast.info('Logged out successfully')
        
    }

    if(isAuthenticated) {
        return <Albumlist logOut={handleLogout}/>
    }
    else {
        return(
            <Card className='w-full max-w-sm'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Login</CardTitle>
                    <CardDescription>Enter your credentials to login</CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4'>
                    <div className='grid gap-2'>
                        <Label htmlFor='username'>Username</Label>
                        <Input name='username' id='username' onChange={handleChange} required />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input name='password' id='password' type='password' onChange={handleChange} required />
                    </div>
                    {formError && <CardDescription className='text-red-500'>Incorrect username or password</CardDescription>}
                </CardContent>
                <CardFooter>
                    <Button className='w-full' onClick={handleLogin}>Login</Button>
                </CardFooter>
            </Card>
        )  
    }
}

export default Login