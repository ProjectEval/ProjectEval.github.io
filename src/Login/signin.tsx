import { useRef, useState } from 'react'
import "./signin.css"
import { getUserId, signIn } from '../API/auth'
import { checkIfTeacher } from '../API/database'
import BackArrow from "../assets/back_arrow.png"
import InfoDialog from '../Dialogs/info_dialog'

type SigninProps = {
  background: string;
  setLoginState: (state: string) => void;
}

function Signin({background, setLoginState}: SigninProps) {
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
        const teacher: boolean = await checkIfTeacher(userId)
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
      <div className={'Center ' + background}>
        <h2 className='Title'>Sign In</h2>
        <img src={BackArrow} alt="back" className="BackArrow" onClick={() => {

            setLoginState("")
            setEmail("")
            setPassword("")
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
      <InfoDialog info={error} Title={errorTitle} infoModalRef={errorModalRef}/>
    </>
  )
}

export default Signin
