import { useEffect, useState } from 'react'
import "./student_dashboard.css"
import { getStudentClasses } from '../API/database'
import {Class} from "../firebase_types"
import ClassTile from './class_tile'
import { signOutUser } from '../API/auth'

type StudentDashboardProps = {
  id: string
}

function StudentDashboard( {id} : StudentDashboardProps) {
  const [classes, setClasses] = useState<Class[]>([])

  useEffect(() => {
    async function fetchClasses() {
      const res = await getStudentClasses(id)
      setClasses(res)
    }
    fetchClasses()
    console.log(classes)
  }, [])

  const handleLogOut = async () => {
    await signOutUser()
    localStorage.removeItem("userType")
    window.location.href = window.location.origin + "/Login/"
  }


  return (
    <>
      <div className='Center'>
        <h2 className='Title'>Student Classes</h2>
        <div className='Classes'>
           {classes.map((studentClass) => (
              <ClassTile key={studentClass.name} name={studentClass.name} id={studentClass.id} isTeacher={false}/>
            ))}
            <button className='LogOut' onClick={handleLogOut}>Log Out</button>

        </div>
        <br />
      </div>
      
    </>
  )
}

export default StudentDashboard
