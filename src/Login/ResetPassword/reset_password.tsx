import { useEffect, useRef, useState } from 'react'
import "./reset_password.css"
import { resetPassword } from '../../API/auth'

import BackArrow from "../../assets/back_arrow.png"
import InfoDialog from '../../Dialogs/info_dialog'


function ResetPassword() {
    const [newPassowrd, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [oobCode, setOobCode] = useState<string>("")
    const [resettingPassword, setResettingPassword] = useState<boolean>(false)
    const errorModalRef = useRef<HTMLDialogElement>(null)
    const [error, setError] = useState<string>("")
    const [errorTitle, setErrorTitle] = useState<string>("")
    const [onClose, setOnClose] = useState<() => void>(() => {})

    useEffect(() => {
      const url: string = window.location.search
      const params: URLSearchParams = new URLSearchParams(url)

      if (!params.has("oobCode")){
        throw Error("missing oob code!")
      }
      const oobCode = params.get("oobCode")!
      setOobCode(oobCode)
    }
    , [])

    const onError = (error: string, errorTitle: string) => {
      setResettingPassword(false)
        setError(error)
        setErrorTitle(errorTitle)
      
        setOnClose(onClose)
        errorModalRef.current?.showModal()
    }

    const handleResetPassowrd = async () => {
      if (newPassowrd != confirmPassword){
        onError("Passwords do not match!", "Passwords do not match!")
        return
      }
      setResettingPassword(true)
      await resetPassword(oobCode, newPassowrd, onError)
      onError("Password Reset!", "Password Reset!")
    }
  return (
    <>
      <div className='Center'>
        <h2 className='Title'>Forgot Password</h2>
        <img src={BackArrow} alt="back" className="BackArrow" onClick={() => {
          window.location.href = "/Login/"
        }}/>
        <label htmlFor="newPassowrd">New Password </label>
        <input type="password" id='newPassowrd' value={newPassowrd} onChange={(e) => {
            setNewPassword(e.target.value)
        }}/>
        <br />
        <label htmlFor="confirmPassword">Confirm Password </label>
        <input type="password" id='confirmPassword' value={confirmPassword} onChange={(e) => {
            setConfirmPassword(e.target.value)
        }}/>
        <br />
        {resettingPassword ? <div className='Loading'></div> : <button onClick={handleResetPassowrd}>Reset Password</button>}
        <br />
      </div>
      <InfoDialog info={error} Title={errorTitle} infoModalRef={errorModalRef} onClose={() => {
        window.location.href = "/Login/"
      }}/>
    </>
  )
}

export default ResetPassword
