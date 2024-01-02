import React from 'react'
import ReactDOM from 'react-dom/client'
import StudentProfile from './student_profile.tsx'
import '/index.css'

import { getUserId } from '../../API/auth.ts'

async function checkLogin() {
  const userType: string | boolean = await getUserId()
  if (!userType) {
    window.location.href = window.location.origin + '/Login/'
  }
}

(async () => {
  await checkLogin()
})()

 



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StudentProfile />
  </React.StrictMode>,
)
