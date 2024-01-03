import { RefObject, useEffect, useRef, useState } from "react";
import "./group.css"
import { Group, Student } from "../CustomTypes/firebase_types";
import { editGroup, getClassData, getGroupData, getProjectData, getStudentsData, userInGroup } from "../API/database";
import StudentTile from "../Project/student_tile";
import EditIcon from "../assets/square_pencil.png"
import SearchBar from "../Components/search_bar";
import BackArrow from "../assets/back_arrow.png"
import CloseIcon from "../assets/close.png"
import { getUserId } from "../API/auth";

import InfoDialog from "../Dialogs/info_dialog";

import CloseWarningDialog from "../Dialogs/close_warning_dialog";




function GroupP() {

    const [classStudents, setClassStudents] = useState<Student[]>([])
    const [projectName, setProjectName] = useState<string>("")


    const [projectId, setProjectId] = useState<string>("")
    const [classId, setClassId] = useState<string>("")



    const [userId, setUserId] = useState<string>("")
    const infoModalRef = useRef<HTMLDialogElement>(null)
    const [info, setInfo] = useState<string>("")
    const [Title, setTitle] = useState<string>("")
    const [background, setBackground] = useState<string>("")
    const [backgroundColor, setBackgroundColor] = useState<string>("")




    const closeWarningRef = useRef<HTMLDialogElement>(null)


    const [closingRef, setClosingRef] = useState<RefObject<HTMLDialogElement>>()
    const [groupName, setGroupName] = useState<string>("")
    const [groupStudents, setGroupStudents] = useState<Student[]>([])
    const [groupId, setGroupId] = useState<string>("")
    const [editGroupName, setEditGroupName] = useState<string>("")
    const [editGroupSudents, setEditGroupStudents] = useState<Student[]>([])
    const editGroupRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        
        fetchProjects()
        console.log("Fetched Students")
    }, [])

    async function fetchProjects() {
      const userId: string | boolean = await getUserId()
      setUserId(userId as string)
      const url: string = window.location.search
      const params: URLSearchParams = new URLSearchParams(url)
      // let classId: string = ""
      
      if (!params.has("classId")){
        throw Error("missing class id!")
      }
      if (!params.has("projectId")){
          throw Error("missing project id!")
      }
      if(!params.has("groupId")){
        throw Error("missing group id")
      }
      const classId = params.get("classId")!
      setClassId(classId)
      const classData = await getClassData(classId)
      const classStudents = await getStudentsData(classData.students)
      setClassStudents(classStudents)
      const projectId = params.get("projectId")!
      const projectData = await getProjectData(classId, projectId)
      
      setBackground(projectData.background)
      setProjectName(projectData.name)
      setBackgroundColor(projectData.backgroundColor)

      setProjectId(projectId)
      const groupId = params.get("groupId")!
      setGroupId(groupId)
      const gRes = await getGroupData(classId, projectId, groupId)
      setGroupName(gRes.name)
      setEditGroupName(gRes.name)
      const sRes = await getStudentsData(gRes.students)
      setGroupStudents(sRes)
      setEditGroupStudents(sRes)
      

  }

   

    const handleEditGroup = async () => {
      const students: string[] = editGroupSudents.map((student) => student.id)
      for (let index = 0; index < editGroupSudents.length; index++) {
        const student = editGroupSudents[index];
        const inGroup = await userInGroup(classId, projectId, student.id, groupId)

        if(inGroup){
          setInfo(`${student.name} is already in another group`)
          setTitle("Unable to edit group")
          infoModalRef.current?.showModal()
          return
        }
        
      }
      await editGroup(classId, projectId, groupId, editGroupName, students)
      await fetchProjects()
      editGroupRef.current?.close()
    }

  return (
    <>
     <div className={'Center ' + background} style={{backgroundColor: backgroundColor}}>
        <h2 className='Title'>{groupName}</h2>
       <div className="TeacherIcons">
          <img src={EditIcon} alt="edit group" className='EditIcon' onClick={() => {
          editGroupRef.current?.showModal()
        }}/>
        </div>
       
        <img src={BackArrow} alt="back" className="BackArrow" onClick={() => {
          const url = new URL(window.location.href)     
          url.searchParams.delete("groupId")
         
          window.location.href = url.origin + "/Project/" + url.search 
        }}/>
      <h3>Students:</h3>
        <div className="Students">
            {groupStudents.map((student) => (
                <StudentTile key={student.id} name={student.name} id={student.id} projectId={projectId} classId={classId} groupId={groupId} projectName={projectName}/>
            ))}
        </div>
        <br />
      </div>
     
      <dialog ref={editGroupRef}>
        <h2>Edit Group</h2>
          <img src={CloseIcon} alt="close" className="CloseIcon" onClick={() => {
            editGroupRef.current?.close()
          }}/>
          <form>
            <label htmlFor="groupName">Group Name:</label>
            <span> </span>
            <input type="text" name="groupName" id="groupName" value={editGroupName} onChange={(e) => {
              setEditGroupName(e.target.value)
            }}/>
            <br />
            
              
            <label htmlFor="" className="InviteTitle">Students: </label>
            <SearchBar<Student> name="Student" content={classStudents} currentUserId={userId} defaultAddedContent={groupStudents} updateContent={(content) => {
              setEditGroupStudents(content)
            }}/>
              
            <br />
            <button type="button" onClick={handleEditGroup}>Edit Group</button>
          </form>
      </dialog>
      <InfoDialog info={info} Title={Title} infoModalRef={infoModalRef}/>
      
      <CloseWarningDialog closeWarningRef={closeWarningRef} connectedRef={closingRef!}/>
     
    </>
  )
}

export default GroupP
