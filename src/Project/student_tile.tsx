import "./student_tile.css"
import EvalIcon from "./eval_icon.png"
import PersonIcon from "./person_icon.png"
import { useEffect, useState } from "react"
import { getUserId } from "../API/auth"
import { isTeacher } from "../API/database"

type StudentTileProps = {
    name: string
    id: string
    projectId: string
    classId: string
    projectName: string
}

function StudentTile({name, id, projectId, classId, projectName}: StudentTileProps) {
  const [isUser, setIsUser] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      const userId = await getUserId()
      const teacher = await isTeacher(userId as string)
      if (userId == id || teacher){
        setIsUser(true)
      }
    })()
  }, [])
  return (
    <>
      <div className='StudentTile'>
        <h2 className="StudentName">{name}</h2>
       {isUser ?  <img src={PersonIcon} alt="view user profile" className="PersonIcon" onClick={() => {
            //Create url with params
            const url = new URL(window.location.origin)
            url.searchParams.set("projectId", projectId)
            url.searchParams.set("studentId", id)
            url.searchParams.set("classId", classId)
            window.location.href = url.origin + "/Project/StudentProfile/" + url.search
        }}/> :  <img src={EvalIcon} alt="evaluate student" className="EvalIcon" onClick={() => {
            //Create url with params
            const url = new URL(window.location.origin)
            url.searchParams.set("name", name)
            url.searchParams.set("projectId", projectId)
            url.searchParams.set("studentId", id)
            url.searchParams.set("classId", classId)
            window.location.href = url.origin + "/Project/EvalStudent/" + url.search
        }}/>}
      </div>
      
    </>
  )
}

export default StudentTile
