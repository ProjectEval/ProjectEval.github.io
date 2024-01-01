import React from 'react'
import ReactDOM from 'react-dom/client'

import '../index.css'
import { getUserId } from '../API/auth.ts'
import JoinClass from './join_class.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JoinClass />
  </React.StrictMode>,
)
