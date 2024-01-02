import { useEffect, useRef, useState } from "react";
import "./project.css"
import { Student } from "../CustomTypes/firebase_types";
import { checkIfTeacher, copyProject, editProject, getProjectData, getProjectEvalTemplate, getStudentData, getStudents, getStudentsInClass, getStudentsInProject } from "../API/database";
import StudentTile from "./student_tile";
import EditIcon from "../assets/square_pencil.png"
import SearchBar from "../Components/search_bar";
import BackArrow from "../assets/back_arrow.png"
import CloseIcon from "../assets/close.png"
import { getUserId } from "../API/auth";
import CopyIcon from "../assets/copy.png"
import InfoDialog from "../Dialogs/info_dialog";
import { set } from "firebase/database";
import ChooseBackgroundDialog from "../Dialogs/choose_background_dialog";
import CloseWarningDialog from "../Dialogs/close_warning_dialog";
import ChooseColorDialog from "../Dialogs/choose_colors_dialog";


function Project() {
    const [students, setStudents] = useState<Student[]>([])
    const [allStudents, setAllStudents] = useState<Student[]>([])
    const [addedStudents, setAddedStudents] = useState<Student[]>([])
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



    useEffect(() => {
        
        fetchProjects()
        console.log(students)
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
      const projectId = params.get("projectId")!
      const projectData = await getProjectData(classId, projectId)
      setProjectName(projectData.name)
      setEditProjName(projectData.name)
      setBackground(projectData.background)
      setCardColor(projectData.cardColor)
      setBackgroundColor(projectData.backgroundColor)
      setEvalBgColor(projectData.evalBackgroundColor)
      setProjectId(projectId)
      const res = await getStudentsInProject(classId, projectId)
      console.log(res)
      setStudents(res)
      setAddedStudents(res)
      const sRes: Student[] = await getStudentsInClass(classId)
      setAllStudents(sRes)
      const isTeacher = await checkIfTeacher(userId as string)

      if (isTeacher){
          setIsTeacher(true)

      }
      if(isTeacher){
          const projectEvalTemplate = await getProjectEvalTemplate(classId, projectId)
          if(projectEvalTemplate.length == 0){
              warningRef.current?.showModal()
          }
      }

  }

    const handleEditProject = async () => {
      const studentIds: string[] = []
      addedStudents.forEach((student) => {
        studentIds.push(student.id)
      })
      await editProject(classId, projectId, editProjName, studentIds, background, backgroundColor, cardColor, evalBackgroundColor)
      editProjectRef.current?.close()
      await fetchProjects()

    }

  return (
    <>
     <div className={'Center ' + background} style={{backgroundColor: backgroundColor}}>
        <h2 className='Title'>{ProjectName}</h2>
        {isTeacher && <div className="TeacherIcons">
          <img src={CopyIcon} alt="copy project" className='CopyIcon' onClick={async () => {
            await copyProject(classId, projectId)
            setInfo("Project copied successfully!")
            setTitle("Project Copied")
            infoModalRef.current?.showModal()

          }}/>
          <img src={EditIcon} alt="edit project" className='EditIcon' onClick={() => {
          editProjectRef.current?.showModal()
        }}/>
        </div>
       }
        <img src={BackArrow} alt="back" className="BackArrow" onClick={() => {
          const url = new URL(window.location.href)     
          url.searchParams.delete("projectId")
         
          window.location.href = url.origin + "/Projects/" + url.search 
        }}/>
        <h3>Students:</h3>
        <div className="Students">
            {students.map((student) => (
                <StudentTile key={student.id} name={student.name} id={student.id} projectId={projectId} classId={classId} projectName={ProjectName}/>
            ))}
        </div>
        <br />
      </div>
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
          editProjectRef.current?.close()
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
            
            <label htmlFor="">Students: </label>
              <SearchBar<Student> name="Student"  currentUserId={userId} content={allStudents} defaultAddedContent={students} updateContent={(content) => {
                setAddedStudents(content)
              }}/>
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
              <br />
              <br />
              <button type="button" onClick={() => {
                    const url = new URL(window.location.origin)     
                    url.searchParams.set("projectId", projectId)
                    url.searchParams.set("classId", classId)
                    window.location.href = url.origin + "/Project/Editor/" + url.search 
              }}>Edit Project Template</button>
              </div>
          </div>
          <button type="button" onClick={handleEditProject}>Save Project</button>
            
        </form>
      </dialog>
      <InfoDialog info={info} Title={Title} infoModalRef={infoModalRef} onClose={() => {
        const url = new URL(window.location.href)
        url.searchParams.delete("projectId")
        window.location.href = url.origin + "/Projects/" + url.search

      }}/>
      <CloseWarningDialog closeWarningRef={closeWarningRef} connectedRef={editProjectRef}/>
      <ChooseBackgroundDialog setBackground={setBackground} backgroundRef={editBackgroundRef} currentBackground={background}/>
      <ChooseColorDialog setBgColor={setBackgroundColor} colorRef={editColorRef} currentBgColor={backgroundColor} isProject={true} currentTileColor={cardColor} setTileColor={setCardColor} currentEvalBgColor={evalBackgroundColor} setEvalBgColor={setEvalBgColor}/>

    </>
  )
}

export default Project
