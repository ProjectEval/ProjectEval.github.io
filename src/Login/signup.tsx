import { useState, useRef } from 'react'
import "./signup.css"
import { createUser } from '../API/auth'
import BackArrow from "../assets/back_arrow.png"
import { checkIfUserNameTaken } from '../API/database'
import ErrorDialog from '../error_dialog'


function Signup() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [userType, setUserType] = useState<"Teacher" | "Student" | "">("")
    const [signingUp, setSigningUp] = useState<boolean>(false)
    const errorModalRef = useRef<HTMLDialogElement>(null)
    const [error, setError] = useState<string>("")
    const [errorTitle, setErrorTitle] = useState<string>("")
    async function handleSignUp() {
      setSigningUp(true)
      if (password != confirmPassword){
        onError("Passwords do not match!", "Passwords do not match!")
        return
      }
      const nameTaken: boolean = await checkIfUserNameTaken(name)
      if (nameTaken){
        onError("This name is already taken!", "Name Taken")
        return
      }
      localStorage.setItem("userType", userType)
      await createUser(name,email, password, userType == "Teacher", finishSignUp, onError)
      

    }

    function finishSignUp() {
      //setSigningUp(false)
      //Check url
      const urlParams = new URLSearchParams(window.location.search)
      if(urlParams.get("classId") != null){
        window.location.href = "/JoinClass/" + window.location.search
        return
      }
      window.location.href = "/Dashboard/"

    }

    const onError = (error: string, errorTitle: string) => {
      setSigningUp(false)
      setError(error)
      setErrorTitle(errorTitle)
      errorModalRef.current?.showModal()
    }

  return (
    <>
      <div className='Center'>
        <h2 className='Title'>Sign Up</h2>
        <img src={BackArrow} alt="back" className="BackArrow" onClick={() => {
          if(userType == ""){
            window.location.href = "/Login/" + window.location.search
          } else {
            setUserType("")
            setEmail("")
            setPassword("")
            setName("")
          }
        }}/>
        { userType == "" ? <div className='Options'>
            <button onClick={() => {setUserType("Teacher")}}>Teacher</button>
            <button onClick={() => {setUserType("Student")}}>Student</button>
        </div> :<> 
        <label htmlFor="name">Name </label>
        <input type="text" id='name' value={name} onChange={(e) => {
            setName(e.target.value)
        }}/>
        <br />
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
        <label htmlFor="confirmPassword">Confirm Password </label>
        <input type="password" id='confirmPassword' value={confirmPassword} onChange={(e) => {
            setConfirmPassword(e.target.value)
        }}/>
        <br />
        {signingUp ? <div className='Loading'></div> : <button onClick={handleSignUp}>Sign Up</button>}
        </>}
        <br />
      </div>
      <ErrorDialog error={error} errorTitle={errorTitle} errorModalRef={errorModalRef}/>
    </>
  )
}

export default Signup
