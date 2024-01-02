import { useEffect, useState } from 'react'
import "./login.css"
import Signin from './signin'
import Signup from './signup'
import { getUserId } from '../API/auth'


function Login() {
  const [loginStatus, setLoginStatus] = useState<string>("")
  const [background, setBackground] = useState<"RedPolygon" | "FieryPolygon" | "Hex">("Hex")
  useEffect(() => {
    const backgrounds: ("RedPolygon" | "FieryPolygon" | "Hex")[] = ["RedPolygon", "FieryPolygon", "Hex"]
    const rand: number = Math.floor(Math.random() * backgrounds.length)
    setBackground(backgrounds[rand])
    async function checkLogin() {
      const userType: string | boolean = await getUserId()
      console.log(userType)
    }
    checkLogin()
  }, [])
  return (
    <>
      {loginStatus == "" ? <div className={'Login Center ' + background}>
        <h2 className='Title'>Login</h2>
        <div className='Options'>
            <button onClick={() => {setLoginStatus("signin")}}>Sign In</button>
            <button onClick={() => {setLoginStatus("signup")}}>Sign Up</button>
        </div>
        <br />
      </div> : loginStatus == "signin" ? <Signin background={background} setLoginState={setLoginStatus}/> : <Signup background={background} setLoginState={setLoginStatus}/>}
      
    </>
  )
}

export default Login
