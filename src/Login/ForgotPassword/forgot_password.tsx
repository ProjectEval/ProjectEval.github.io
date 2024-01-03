import { useRef, useState } from 'react'
import "./forgot_password.css"
import { forgotPassword } from '../../API/auth'

import BackArrow from "../../assets/back_arrow.png"
import InfoDialog from '../../Dialogs/info_dialog'


function ForgotPassword() {
    const [email, setEmail] = useState<string>("")
    const [sendingLink, setSendingLink] = useState<boolean>(false)
    const errorModalRef = useRef<HTMLDialogElement>(null)
    const [error, setError] = useState<string>("")
    const [errorTitle, setErrorTitle] = useState<string>("")
    const [onClose, setOnClose] = useState<() => void>(() => {})
    const [background, setBackground] = useState<"RedPolygon" | "FieryPolygon" | "Hex">("Hex")



    const onError = (error: string, errorTitle: string) => {
      const backgrounds: ("RedPolygon" | "FieryPolygon" | "Hex")[] = ["RedPolygon", "FieryPolygon", "Hex"]
      const rand: number = Math.floor(Math.random() * backgrounds.length)
      setBackground(backgrounds[rand])
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
      <div className={'Center ' + background} >
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
      <InfoDialog info={error} Title={errorTitle} infoModalRef={errorModalRef} onClose={done}/>
    </>
  )
}

export default ForgotPassword
