import { useEffect, useState } from 'react'
import "./student_dashboard.css"
import { getStudentClasses } from '../API/database'
import {Class} from "../CustomTypes/firebase_types"
import ClassTile from '../Components/class_tile'
import { getUserId, signOutUser } from '../API/auth'

function StudentDashboard() {
  const [classes, setClasses] = useState<Class[]>([])
  const [id, setId] = useState<string>("")
  const [background, setBackground] = useState<"RedPolygon" | "FieryPolygon" | "Hex">("Hex")

  useEffect(() => {

    const backgrounds: ("RedPolygon" | "FieryPolygon" | "Hex")[] = ["RedPolygon", "FieryPolygon", "Hex"]
    const rand: number = Math.floor(Math.random() * backgrounds.length)
    setBackground(backgrounds[rand])
    async function fetchClasses() {
      const userId = (await getUserId()) as string
      setId(userId)
      const res = await getStudentClasses(userId)
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
      <div className={'Center ' + background}>
        <h2 className='Title'>Student Classes</h2>
        <div className='Classes'>
           {classes.map((studentClass) => (
              <ClassTile key={studentClass.name} name={studentClass.name} id={studentClass.id} isTeacher={false}/>
            ))}
            

        </div>
        <br />
        <div className='Controls'>
          <button className='LogOut' onClick={handleLogOut}>Log Out</button>
        </div>
        <br />
      </div>
      
    </>
  )
}

export default StudentDashboard
