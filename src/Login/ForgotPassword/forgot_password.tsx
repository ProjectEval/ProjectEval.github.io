import { useRef, useState } from 'react'
import "./forgot_password.css"
import { forgotPassword } from '../../API/auth'

import BackArrow from "../../assets/back_arrow.png"
import ErrorDialog from '../../error_dialog'


function ForgotPassword() {
    const [email, setEmail] = useState<string>("")
    const [sendingLink, setSendingLink] = useState<boolean>(false)
    const errorModalRef = useRef<HTMLDialogElement>(null)
    const [error, setError] = useState<string>("")
    const [errorTitle, setErrorTitle] = useState<string>("")
    const [onClose, setOnClose] = useState<() => void>(() => {})


    const onError = (error: string, errorTitle: string) => {
      setSendingLink(false)
        setError(error)
        setErrorTitle(errorTitle)
       
        errorModalRef.current?.showModal()
    }

    const handleForgotPassword = async () => {
      setSendingLink(true)
      
      await forgotPassword(email, onError)

      onError("Reset Password Link Sent!", "Reset Password Link Sent!")

    }
    const done = () => {
      // console.log("done")
      window.location.href = "/Login/" + window.location.search
    }
  return (
    <>
      <div className='Center'>
        <h2 className='Title'>Forgot Password</h2>
        <img src={BackArrow} alt="back" className="BackArrow" onClick={() => {
          window.location.href = "/Login/"
        }}/>
        <label htmlFor="email">Email </label>
        <input type="text" id='email' value={email} onChange={(e) => {
            setEmail(e.target.value)
        }}/>
        <br />
        {sendingLink ? <div className='Loading'></div> : <button onClick={handleForgotPassword}>Send Reset Password Link</button>}
        <br />
      </div>
      <ErrorDialog error={error} errorTitle={errorTitle} errorModalRef={errorModalRef} onClose={done}/>
    </>
  )
}

export default ForgotPassword
