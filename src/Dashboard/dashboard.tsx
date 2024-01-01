import { useEffect, useState } from 'react'
import "./dashboard.css"
import StudentDashboard from './student_dashboard'
import TeacherDashboard from './teacher_dashboard'
import { getUserId, onLogin, user } from '../API/auth.ts'
import { set } from 'firebase/database'
import { isTeacher } from '../API/database.ts'


function Dashboard() {
    const [userType, setUserType] = useState<string | null>() 
    const [userId, setUserId] = useState<string>("")
    useEffect(() => {
          (async () => {
            const id: string | boolean = await getUserId()
            const teacherUser = await isTeacher(id as string)
            console.log(localStorage.getItem("userType"))
            console.log(id + " Dashboard")
            if (!id) {
                //window.location.href = window.location.origin + "/Login/"
            } else {
                setUserId(id)
                // console.log(id)
            }
            setUserType(teacherUser ? "Teacher" : "Student")
          })()
        // onLogin((user) => {

        }, [])
        // async function fetchUserId() {
        //     const id: string | boolean = await getUserId()
        //     console.log(id + " Dashboard")
        //     if (!id) {
        //         //window.location.href = window.location.origin + "/Login/"
        //     } else {
        //         setUserId(id)
        //         // console.log(id)
        //     }
        //     setUserType(localStorage.getItem("userType"))
        // }
        // fetchUserId()
        // setTimeout(async () => {
        //     await fetchUserId()
        // }, 500)
    // }, [])
    
  return (
    <>
      {userType == "Student"? <StudentDashboard id={userId}/> : userType == "Teacher" ? <TeacherDashboard id={userId}/> : null}
      
    </>
  )
}

export default Dashboard
