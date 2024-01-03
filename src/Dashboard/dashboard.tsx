import { useEffect, useState } from 'react'
import "./dashboard.css"
import { getUserId,  } from '../API/auth.ts'

import { checkIfTeacher } from '../API/database.ts'


function Dashboard() {
    const [userType, setUserType] = useState<string | null>() 
    const [userId, setUserId] = useState<string>("")
    const [background, setBackground] = useState<"RedPolygon" | "FieryPolygon" | "Hex" | "">("")

    useEffect(() => {
      console.log("Runne")
      if(background == ""){
          // Generate random background
          console.log(background)
          const backgrounds: ("RedPolygon" | "FieryPolygon" | "Hex")[] = ["RedPolygon", "FieryPolygon", "Hex"]
          const rand: number = Math.floor(Math.random() * backgrounds.length)
          setBackground(backgrounds[rand])
      }
     
    }, [])
    useEffect(() => {
          (async () => {
            const id: string | boolean = await getUserId()
            const teacherUser = await checkIfTeacher(id as string)
            console.log(localStorage.getItem("userType"))
            console.log(id + " Dashboard")
            if (!id) {
                //window.location.href = window.location.origin + "/Login/"
            } else {
                setUserId(id as string)
                // console.log(id)
            }
            if(teacherUser){
              window.location.href = window.location.origin + "/TeacherDashboard/" + window.location.search
            } else {
              window.location.href = window.location.origin + "/StudentDashboard/" + window.location.search

            }
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
      {userType == "Student"? <StudentDashboard id={userId}/> : userType == "Teacher" ? <TeacherDashboard id={userId} background={background}/> : null}
      
    </>
  )
}

export default Dashboard
