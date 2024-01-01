import { useRef, useState } from 'react'
import "./signin.css"
import { getUserId, signIn } from '../API/auth'
import { isTeacher } from '../API/database'
import BackArrow from "../assets/back_arrow.png"
import ErrorDialog from '../error_dialog'


function Signin() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [signingin, setSigningIn] = useState<boolean>(false)
    const errorModalRef = useRef<HTMLDialogElement>(null)
    const [error, setError] = useState<string>("")
    const [errorTitle, setErrorTitle] = useState<string>("")

    async function handleSignIn() {
        setSigningIn(true)
        await signIn(email, password, onError)
        const userId: string = await getUserId() as string
        console.log(userId)
        const teacher: boolean = await isTeacher(userId)
        console.log(teacher)
        if (teacher) {
           localStorage.setItem("userType", "Teacher")
        } else {
            localStorage.setItem("userType", "Student")
        }
       
        window.location.href = window.location.origin + "/Dashboard/"

    }

    const onError = (error: string, errorTitle: string) => {
        setSigningIn(false)
        setError(error)
        setErrorTitle(errorTitle)
        errorModalRef.current?.showModal()
    }

    const handleForgotPassword = () => {
        window.location.href = "/Login/ForgotPassword/" + window.location.search
    }
  return (
    <>
      <div className='Center'>
        <h2 className='Title'>Sign In</h2>
        <img src={BackArrow} alt="back" className="BackArrow" onClick={() => {
          window.location.href = "/Login/" + window.location.search
        }}/>
        <label htmlFor="email">Email </label>
        <input type="text" id='email' value={email} onChange={(e) => {
            setEmail(e.target.value)
        }}/>
        <br />
        <label htmlFor="password">Password </label>
        <input type="password" id='password' value={password} onChange={(e) => {
            setPassword(e.target.value)
        }}/>
        <br />
        <a className='ForgotPassword' onClick={handleForgotPassword}>Forgot Password?</a>
        <br />
        {signingin ? <div className='Loading'></div> : <button onClick={handleSignIn}>Sign In</button>}
        <br />
      </div>
      <ErrorDialog error={error} errorTitle={errorTitle} errorModalRef={errorModalRef}/>
    </>
  )
}

export default Signin
