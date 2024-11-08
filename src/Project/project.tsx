import { RefObject, useEffect, useRef, useState } from "react";
import "./project.css"
import { Group, Student } from "../CustomTypes/firebase_types";
import { addStudentsToGroup, checkIfTeacher, copyProject, createGroup, deleteGroup, editProject, getClassData, getProjectData, getProjectEvalTemplate, getProjectGroups, getStudentGroup, getStudentsData, getStudentsInClass, leaveGroup, studentJoinGroup, userInGroup } from "../API/database";
import StudentTile from "./student_tile";
import EditIcon from "../assets/square_pencil.png"
import SearchBar from "../Components/search_bar";
import BackArrow from "../assets/back_arrow.png"
import CloseIcon from "../assets/close.png"
import PlusIcon from "../assets/plus.png"
import { getUserId } from "../API/auth";
import CopyIcon from "../assets/copy.png"
import InfoDialog from "../Dialogs/info_dialog";
import ChooseBackgroundDialog from "../Dialogs/choose_background_dialog";
import CloseWarningDialog from "../Dialogs/close_warning_dialog";
import ChooseColorDialog from "../Dialogs/choose_colors_dialog";
import GroupTile from "./group_tile";
import LeaveIcon from "../assets/leave.png"
import AddPersonIcon from "../assets/add_person.png"


function Project() {
    const [students, setStudents] = useState<Student[]>([])
    const [classStudents, setClassStudents] = useState<Student[]>([])
    const [groups, setGroups] = useState<Group[]>([])
    const [ProjectName, setProjectName] = useState<string>("")
    const [isTeacher, setIsTeacher] = useState<boolean>(false)
    const [projectId, setProjectId] = useState<string>("")
    const [classId, setClassId] = useState<string>("")
    const warningRef = useRef<HTMLDialogElement>(null)
    const editProjectRef = useRef<HTMLDialogElement>(null)
    const [editProjName, setEditProjName] = useState<string>("")
    const [userId, setUserId] = useState<string>("")
    const infoModalRef = useRef<HTMLDialogElement>(null)
    const [info, setInfo] = useState<string>("")
    const [Title, setTitle] = useState<string>("")
    const [background, setBackground] = useState<string>("")
    const [backgroundColor, setBackgroundColor] = useState<string>("")
    const [evalBackgroundColor, setEvalBgColor] = useState<string>("")
    const [cardColor, setCardColor] = useState<string>("")
    const editColorRef = useRef<HTMLDialogElement>(null)
    const editBackgroundRef = useRef<HTMLDialogElement>(null)
    const closeWarningRef = useRef<HTMLDialogElement>(null)
    const [inGroup, setInGroup] = useState<boolean>(false)
    const createGroupRef = useRef<HTMLDialogElement>(null)
    const [closingRef, setClosingRef] = useState<RefObject<HTMLDialogElement>>()
    const [groupName, setGroupName] = useState<string>("")
    const [groupId, setGroupId] = useState<string>("")
    const [groupStudents, setGroupStudents] = useState<Student[]>([])
    const [copiedProj, setCopiedProj] = useState<boolean>(false)
    const [loadingData, setLoadingData] = useState<boolean>(true)
    const [projectGroups, setProjectGroups] = useState<Group[]>([])
    const [studentJoinGroupId, setStudentJoinGroupId] = useState<string>("")
    const [joiningGroup, setJoiningGroup] = useState<boolean>(false)
    const addStudentRef = useRef<HTMLDialogElement>(null)
    const [addingStudents, setAddingStudents] = useState<boolean>(false)
    const [studentGroupName, setStudentGroupName] = useState<string>("")

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
      const classId = params.get("classId")!
      setClassId(classId)
      const classData = await getClassData(classId)
      const classStudents = await getStudentsData(classData.students)
      setClassStudents(classStudents)
      const projectId = params.get("projectId")!
      const projectData = await getProjectData(classId, projectId)
      setProjectName(projectData.name)
      setEditProjName(projectData.name)
      setBackground(projectData.background)
      setCardColor(projectData.cardColor)
      setBackgroundColor(projectData.backgroundColor)
      setEvalBgColor(projectData.evalBackgroundColor)
      setProjectId(projectId)
      
   
      const isTeacher = await checkIfTeacher(userId as string)
      setIsTeacher(isTeacher)
      const gRes = await getProjectGroups(classId, projectId)
        //Sort groups by index
        gRes.sort((a, b) => {
          return a.index - b.index
        })
        
      if (isTeacher){
        
        setGroups(gRes)
        
       
      } else {
        const sRes = await getStudentGroup(classId, projectId, userId as string)
        if(sRes != undefined){
          setInGroup(true)
          setGroupId(sRes.id)
          setStudentGroupName(sRes.name)
          const students = await getStudentsData(sRes.students)
          console.log(students)
          console.log(sRes.students)
          setStudents(students)
        } else {
          setProjectGroups(gRes)
        }
        
        
      }
      if(isTeacher){
          const projectEvalTemplate = await getProjectEvalTemplate(classId, projectId)
          if(projectEvalTemplate.length == 0){
              warningRef.current?.showModal()
          }
      }
      setLoadingData(false)

  }

    const handleEditProject = async () => {
    
      await editProject(classId, projectId, editProjName, background, backgroundColor, cardColor, evalBackgroundColor)
      editProjectRef.current?.close()
      await fetchProjects()

    }

    const handleCreateGroup = async () => {
      const students: string[] = groupStudents.map((student) => student.id)
      for (let index = 0; index < groupStudents.length; index++) {
        const student = groupStudents[index];
        const inGroup = await userInGroup(classId, projectId, student.id)

        if(inGroup){
          setInfo(`${student.name} is already in another group`)
          setTitle("Unable to create group")
          infoModalRef.current?.showModal()
          return
        }
        
      }

      const groupNameExists = groups.find((group) => group.name == groupName)
      if(groupNameExists != undefined){
        setInfo("A group with that name already exists!")
        setTitle("Unable to create group")
        infoModalRef.current?.showModal()
        return
      }
      await createGroup(classId, projectId, groupName, students)
      await fetchProjects()
      createGroupRef.current?.close()
    }

    const handleDeleteGroup = async (groupId:string) => {
      await deleteGroup(classId, projectId, groupId)
      await fetchProjects()
    }

    const handleAddStudents = async () => {
      setAddingStudents(true)
      const students: string[] = groupStudents.map((student) => student.id)
      for (let index = 0; index < groupStudents.length; index++) {
        const student = groupStudents[index];
        const inGroup = await userInGroup(classId, projectId, student.id)

        if(inGroup){
          setInfo(`${student.name} is already in another group`)
          setTitle("Unable to add students")
          infoModalRef.current?.showModal()
          return
        }
        
      }
      await addStudentsToGroup(classId, projectId, groupId , students)
      await fetchProjects()
      addStudentRef.current?.close()
      setAddingStudents(false)
    }

  return (
    <>
    {!loadingData ?
     <div className={'Center ' + background} style={{backgroundColor: backgroundColor}}>
        <h2 className='Title'>{ProjectName}</h2>
        {isTeacher ? <div className="TeacherIcons">
          <img src={CopyIcon} alt="copy project" className='CopyIcon' onClick={async () => {
            setCopiedProj(true)
            await copyProject(classId, projectId)
            setInfo("Project copied successfully!")
            setTitle("Project Copied")
            infoModalRef.current?.showModal()

          }}/>
          <img src={EditIcon} alt="edit project" className='EditIcon' onClick={() => {
          editProjectRef.current?.showModal()
        }}/>
         <img src={PlusIcon} alt="add group" className='PlusIcon' onClick={() => {
          createGroupRef.current?.showModal()
        }}/>
        </div> : inGroup && <div className="StudentIcons">
          <img src={LeaveIcon} alt="leave group" className='LeaveIcon' onClick={async () => {
            await leaveGroup(classId, projectId, groupId, userId)
            setInGroup(false)
            await fetchProjects()
          }}/>
          
          
         <img src={AddPersonIcon} alt="add group" className='PlusIcon' onClick={() => {
          
          addStudentRef.current?.showModal()
        }}/>
        </div>

       }
        <img src={BackArrow} alt="back" className="BackArrow" onClick={() => {
          const url = new URL(window.location.href)     
          url.searchParams.delete("projectId")
         
          window.location.href = url.origin + "/Projects/" + url.search 
        }}/>
        {!isTeacher && inGroup && <h2 className="StudentGroupName">{studentGroupName}</h2>}
       {!isTeacher ?
        inGroup ? <><h3>Students:</h3>
        <div className="Students">
            {students.map((student) => (
                <StudentTile key={student.id} name={student.name} id={student.id} projectId={projectId} classId={classId} projectName={ProjectName}/>
            ))}
        </div>
        </>
        : <>
        <br />
          <h3 className="joinGroupWarning">Please join a group!</h3>
          <h2>Groups: </h2>
          <select className="groupsSelect" onChange={(e) => {
            setStudentJoinGroupId(e.target.value)
          }}>
            <option value="">Select a group</option>
            {projectGroups.map((group) => (
              <option value={group.id}>{group.name}</option>
            ))}
          </select>
          <br />
          {joiningGroup ? <div className="LoadingJoin"></div> : <button type="button" onClick={ async () => {
            setJoiningGroup(true)
            if(studentJoinGroupId == ""){
              setInfo("Please select a group!")
              setTitle("Unable to join group")
              infoModalRef.current?.showModal()
              setJoiningGroup(false)
              return
            }
            console.log(studentJoinGroupId)
            console.log(userId)
            await studentJoinGroup(classId, projectId, studentJoinGroupId, userId)
            await fetchProjects()
            setJoiningGroup(false)
          }}>Join Group</button>}
          
        </>
      : <>
        <h3>Groups:</h3>
        <div className="Students">
            {groups.map((group) => (
                <GroupTile key={group.id} name={group.name} groupId={group.id} projectId={projectId} classId={classId} deleteGroup={handleDeleteGroup}/>
            ))}
        </div>
      </> }
        <br />
      </div> : <div className="Loading"></div>}
      <dialog ref={warningRef} className="warningDialog">
              <label>This project has no evaluation template! You need to create one before you can evaluate students.</label>
              <br />
              <br />
              <button onClick={() => {
                const url = new URL(window.location.origin)
                url.searchParams.set("projectId", projectId)
                url.searchParams.set("classId", classId)
                window.location.href = url.origin + "/Project/Editor/" + url.search
              }}>Create Eval Template</button>
              <span> </span>
              <button onClick={() => {
                warningRef.current?.close()
              }}>Close</button>

      </dialog>
      <dialog ref={editProjectRef} className="EditProjDialog">
        <h2>Edit Project</h2>
        <img src={CloseIcon} alt="close" className="CloseIcon" onClick={() => {
          setClosingRef(editProjectRef)
          
          closeWarningRef.current?.showModal()
        }}/>
       
        <form>
          <div className="EditSides">
            <div className="EditLeft">
              <label htmlFor="projectName">Project Name:</label>
              <span> </span>
              <input type="text" name="projectName" id="projectName" value={editProjName} onChange={(e) => {
                setEditProjName(e.target.value)
              }}/>
              <br />
              <br />
              <button type="button" onClick={() => {
                          const url = new URL(window.location.origin)     
                          url.searchParams.set("projectId", projectId)
                          url.searchParams.set("classId", classId)
                          window.location.href = url.origin + "/Project/Editor/" + url.search 
                    }}>Edit Project Template</button>
            </div>
            <div className="EditRight">
              <button type='button' onClick={() => {
                editBackgroundRef.current?.showModal()
              }}>Edit Background</button>
              <br />
              <br />
              <button type='button' onClick={() => {
                editColorRef.current?.showModal()
              }}>Edit Colors</button>
            
             
            </div>
          </div>
          <button type="button" onClick={handleEditProject}>Save Project</button>
            
        </form>
      </dialog>
      <InfoDialog info={info} Title={Title} infoModalRef={infoModalRef} onClose={() => {
        if(!copiedProj) return
        setCopiedProj(false)
        const url = new URL(window.location.href)
        url.searchParams.delete("projectId")
        window.location.href = url.origin + "/Projects/" + url.search

      }}/>
      <dialog ref={createGroupRef} onClose={() => {
        setGroupName("")
        setGroupStudents([])
        createGroupRef.current?.close()
      }}>
        <h2>Create Group</h2>
          <img src={CloseIcon} alt="close" className="CloseIcon" onClick={() => {
            setGroupName("")
            setGroupStudents([])
            createGroupRef.current?.close()
          }}/>
          <form>
            <label htmlFor="groupName">Group Name:</label>
            <span> </span>
            <input type="text" name="groupName" id="groupName" value={groupName} onChange={(e) => {
              setGroupName(e.target.value)
            }}/>
            <br />
            
              
            <label htmlFor="" className="InviteTitle">Students: </label>
            <SearchBar<Student> name="Student" content={classStudents} currentUserId={userId} defaultAddedContent={groupStudents} updateContent={(content) => {
              setGroupStudents(content)
            }}/>
              
            <br />
            <button type="button" onClick={handleCreateGroup}>Create Group</button>
          </form>
      </dialog>
      <dialog ref={addStudentRef} className="AddStudentDialog" onClose={() => {
        setGroupStudents([])
        
      }}>
        <h2>Add Student to Group</h2>
          <img src={CloseIcon} alt="close" className="CloseIcon" onClick={() => {

            setGroupStudents([])
            addStudentRef.current?.close()
          }}/>
          <form>  
            <label htmlFor="" className="InviteTitle">Group Students: </label>
            <SearchBar<Student> name="Student" content={classStudents} currentUserId={userId} defaultAddedContent={groupStudents} updateContent={(content) => {
              setGroupStudents(content)
            }}/>
              
            <br />
            {addingStudents ? <div className="LoadingJoin"></div> : <button type="button" onClick={handleAddStudents}>Add Students</button>}
          </form>
      </dialog>
      <CloseWarningDialog closeWarningRef={closeWarningRef} connectedRef={closingRef!} onYes={() => {
                  setEditProjName(ProjectName)

      }}/>
      <ChooseBackgroundDialog setBackground={setBackground} backgroundRef={editBackgroundRef} currentBackground={background}/>
      <ChooseColorDialog setBgColor={setBackgroundColor} colorRef={editColorRef} currentBgColor={backgroundColor} isProject={true} currentTileColor={cardColor} setTileColor={setCardColor} currentEvalBgColor={evalBackgroundColor} setEvalBgColor={setEvalBgColor}/>

    </>
  )
}

export default Project
