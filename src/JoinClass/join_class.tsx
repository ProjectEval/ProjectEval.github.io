import { useEffect, useRef, useState } from 'react'
import "./join_class.css"



import InfoDialog from '../Dialogs/info_dialog'

import { getUserId } from '../API/auth'
import { getClassData, checkIfTeacher, joinClass } from '../API/database'


function JoinClass() {
  const errorModalRef = useRef<HTMLDialogElement>(null)
  const [error, setError] = useState<string>("")
  const [errorTitle, setErrorTitle] = useState<string>("")
  const [classId, setClassId] = useState<string>("")
  const [className, setClassName] = useState<string>("")
  const [userId, setUserId] = useState<string>("")
  useEffect(() => {
    //Check if user is signed in
    //If not, redirect to login
    (async () => {
      const userId: string | boolean = await getUserId()
      if (userId == false){
        window.location.href = "/Login/" + window.location.search
        return
      }
      setUserId(userId as string)
      const url: string = window.location.search
      const params: URLSearchParams = new URLSearchParams(url)

      if (!params.has("classId")){
        throw Error("missing classId")
      }
      const classId = params.get("classId")!
      console.log(classId)
      setClassId(classId)
      const classData = await getClassData(classId)
      setClassName(classData.name)
      const teacher = await checkIfTeacher(userId as string)
      if(teacher){
        window.location.href = "/Projects/" + window.location.search
      }
      //Check if already in class
      if(classData.students.includes(userId as string)){
        window.location.href = "/Projects/" + window.location.search
      }

    })()
    
  }, [])

  const handleJoinClass = async () => {
    await joinClass(classId, userId)
    window.location.href = "/Projects/" + window.location.search
  }
  
  return (
    <>
      <div className='Center'>
        <h2 className='Title'>Join Class - {className}</h2>
        <button onClick={handleJoinClass}>Join Class</button>
        <br />
      </div>
      <InfoDialog info={error} Title={errorTitle} infoModalRef={errorModalRef}/>
    </>
  )
}

export default JoinClass
