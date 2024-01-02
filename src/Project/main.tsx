import React from 'react'
import ReactDOM from 'react-dom/client'
import Project from './project.tsx'
import '/index.css'

import { getUserId } from '../API/auth.ts'

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
    <Project />
  </React.StrictMode>,
)
