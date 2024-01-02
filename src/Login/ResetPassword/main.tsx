import React from 'react'
import ReactDOM from 'react-dom/client'

import '../../index.css'
import { getUserId } from '../../API/auth.ts'
import ForgotPassword from './reset_password.tsx'

async function checkLogin() {
  const userType: string | boolean = await getUserId()
  if (userType) {
    window.location.href = window.location.origin + '/Dashboard/'
  }
}
(async () => {
  await checkLogin()
})()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ForgotPassword />
  </React.StrictMode>,
)
