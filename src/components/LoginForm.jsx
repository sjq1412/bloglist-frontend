import React, {useState} from 'react'
import loginService from "../services/login"

const LoginForm = ({setUser, setNotification}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log({username, password})
    try {
        const user = await loginService.login({ username, password })
        setUser(user)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        setUsername('')
        setPassword('')
    } catch(exception) {
        console.error({exception})
        setNotification({ message: 'Wrong credentials', variant: 'error' })
    }
  }

  return (
    <div>
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
            <div>username 
                <input 
                    type='text' 
                    name="username" 
                    value={username} 
                    onChange={({target}) => setUsername(target.value)} 
                />
            </div>
            <div>password 
                <input 
                    type='text' 
                    name="password" 
                    value={password} 
                    onChange={({target}) => setPassword(target.value)} 
                />
            </div>
            <button type='submit'>login</button>
        </form>
    </div>
  )
}

export default LoginForm