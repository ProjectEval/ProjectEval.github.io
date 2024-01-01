import { useEffect, useState } from 'react'
import "./login.css"
import Signin from './signin'
import Signup from './signup'
import { getUserId } from '../API/auth'


function Login() {
  const [loginStatus, setLoginStatus] = useState<string>("")
  useEffect(() => {
    async function checkLogin() {
      const userType: string | boolean = await getUserId()
      console.log(userType)
    }
    checkLogin()
  }, [])
  return (
    <>
      {loginStatus == "" ? <div className='Login Center'>
        <h2 className='Title'>Login</h2>
        <div className='Options'>
            <button onClick={() => {setLoginStatus("signin")}}>Sign In</button>
            <button onClick={() => {setLoginStatus("signup")}}>Sign Up</button>
        </div>
        <br />
      </div> : loginStatus == "signin" ? <Signin /> : <Signup />}
      
    </>
  )
}

export default Login
