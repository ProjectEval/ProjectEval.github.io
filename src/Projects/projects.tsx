import { useEffect, useRef, useState } from "react";
import "./projects.css"
import { Project, Student, Teacher } from "../CustomTypes/firebase_types";
import { checkIfProjectNameTaken, checkIfTeacher, createProject, deleteProject, editClass, getClassData, getClassProjects, getStudentProjects, getStudents, getStudentsInClass, getTeachers, getTeachersData } from "../API/database";
import ProjectTile from "./project_tile";
import PlusIcon from '../assets/plus.png'
import SearchBar from "../Components/search_bar";
import { get, set } from "firebase/database";
import { getUserId } from "../API/auth";
import BackArrow from "../assets/back_arrow.png"
import EditIcon from "../assets/square_pencil.png"
import CloseIcon from "../assets/close.png"
import InfoDialog from "../Dialogs/info_dialog";
import LinkIcon from "../assets/link.png"
import ChooseBackgroundDialog from "../Dialogs/choose_background_dialog";
import CloseWarningDialog from "../Dialogs/close_warning_dialog";
import ChooseColorDialog from "../Dialogs/choose_colors_dialog";


function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [className, setClassName] = useState<string>("")
    const [isTeacher, setIsTeacher] = useState<boolean>(false)
    const [classId, setClassId] = useState<string>("")
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [allTeachers, setAllTeachers] = useState<Teacher[]>([])
    const [addedTeachers, setAddedTeachers] = useState<Teacher[]>([])
    const [allStudents, setAllStudents] = useState<Student[]>([])
    const [classStudents, setClassStudents] = useState<Student[]>([])
    const modalRef = useRef<HTMLDialogElement>(null)
    const editClassRef = useRef<HTMLDialogElement>(null)
    const [editClassName, setEditClassName] = useState<string>("")
    const [userId, setUserId] = useState<string>("")
    const [editBackground, setEditBackground] = useState<string>("")
    const [backgroundColor, setBackgroundColor] = useState<string>("")
    const chooseBackgroundRef = useRef<HTMLDialogElement>(null)
    const chooseColorRef = useRef<HTMLDialogElement>(null)

    const [projectName, setProjectName] = useState<string>("")
  
  
    const [students, setStudents] = useState<Student[]>([])
    
    const [addedStudents, setAddedStudents] = useState<Student[]>([])
    const errorModalRef = useRef<HTMLDialogElement>(null)
    const [error, setError] = useState<string>("")
    const [errorTitle, setErrorTitle] = useState<string>("")

    const [background, setBackground] = useState<string>("")
    const closeWarningRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        
        fetchProjects()
        console.log(projects)
    }, [])

    async function fetchProjects() {
        const userId: string | boolean = await getUserId()
        setUserId(userId as string)
        const url: string = window.location.search
        const params: URLSearchParams = new URLSearchParams(url)

        if (!params.has("classId")){
          throw Error("missing class id!")
        }
        const classIds = params.get("classId")!
        setClassId(classIds)
        const classData = await getClassData(classIds)
        setClassName(classData.name)
        setEditClassName(classData.name)
        setBackground(classData.background)
        setEditBackground(classData.background)
        setBackgroundColor(classData.backgroundColor)
        const teachers: Teacher[] = await getTeachersData(classData.teachers)
        //Filter out current teacher
        const filteredTeachers: Teacher[] = teachers.filter((teacher) => teacher.id != userId)
        setTeachers(filteredTeachers)
        console.log(teachers)
        const teacher = await checkIfTeacher(userId)
        // let isTeacher: boolean = false
       
        let res = null
        if(!teacher){
            res = await getStudentProjects(userId! as string, classIds)
        } else {
          console.log("IS a teacher")
            res = await getClassProjects(classIds)
        }
        console.log(res)
        setProjects(res)
        const sRes: Student[] = await getStudents()
        setStudents(sRes)
        
        const tRes: Teacher[] = await getTeachers()
        setAllTeachers(tRes)
        const classStudents: Student[] = await getStudentsInClass(classIds)
        setClassStudents(classStudents)
    }

    const handleCreateProject = async () => {
        const projectNameTaken: boolean = await checkIfProjectNameTaken(classId, projectName)
        if (projectNameTaken){
          setError("This project name is already taken!")
          setErrorTitle("Project Name Taken")
          errorModalRef.current?.showModal()
          return
        }
        const students: string[] = addedStudents.map((student) => student.id)
        await createProject(projectName, students, classId)
    
        modalRef.current?.close()
        fetchProjects()
    }

    const handleEditClass = async () => {
        const teachers: string[] = addedTeachers.map((teacher) => teacher.id)
        teachers.push(userId)
        const students: string[] = classStudents.map((student) => student.id)
        await editClass(classId, editClassName, students, teachers, background, backgroundColor)
    
        editClassRef.current?.close()
        fetchProjects()
    }

    const handleDeleteProject = (projectId: string) => async ()  => {
        await deleteProject(classId, projectId)
        fetchProjects()
    }

  return (
    <>
     <div className={'Center ' + background} style={{backgroundColor: backgroundColor}}>
        <h2 className='Title'>{className}</h2>
        <h3>Projects:</h3>
       {isTeacher ? <div className="TeacherIcons">
        <img src={LinkIcon} alt="create join link" className="LinkIcon" onClick={ async () => {
          const url: string = window.location.origin + "/JoinClass/?classId=" + classId
          await navigator.clipboard.writeText(url)
          setError("Copied join link to clipboard!")
          setErrorTitle("Copied!")
          errorModalRef.current?.showModal()
        }}/>
        <img src={EditIcon} alt="edit class" className="EditIcon" onClick={() => {
          editClassRef.current?.showModal()
        }}/>
        
        <img src={PlusIcon} alt="add project" className='PlusIcon' onClick={() => {
          modalRef.current?.showModal()
        }}/></div> : null}
        <img src={BackArrow} alt="back" className="BackArrow" onClick={() => {
          window.location.href = "/Dashboard/"
        }}/>
        <div className="Projects">
            {projects.map((project) => (
                <ProjectTile key={project.id} name={project.name} id={project.id} classId={classId} isTeahcer={isTeacher} deleteProject={handleDeleteProject(project.id)}/>
            ))}
        </div>
        <br />
      </div>
      <dialog ref={modalRef}>
        <h2>Create Project</h2>
        <img src={CloseIcon} alt="close" className="CloseIcon" onClick={() => {
          modalRef.current?.close()
        }}/>
        <form>
          <label htmlFor="projectName">Project Name:</label>
          <span> </span>
          <input type="text" name="projectName" id="projectName" value={projectName} onChange={(e) => {
            setProjectName(e.target.value)
          }}/>
          <br />
          
          <label htmlFor="">Students: </label>
            <SearchBar<Student> name="Student" currentUserId={userId} content={classStudents} updateContent={(content) => {
              setAddedStudents(content)
            }}/>
          <br />
          <button type="button" onClick={handleCreateProject}>Create Project</button>
        </form>
      </dialog>
      <dialog ref={editClassRef} className="EditClassDialog">
        <h2>Edit Class</h2>
        <img src={CloseIcon} alt="close" className="CloseIcon" onClick={() => {
          closeWarningRef.current?.showModal()
        }}/>
        <form>
          <label htmlFor="className">Class Name:</label>
          <span> </span>
          <input type="text" name="className" id="className" value={editClassName} onChange={(e) => {
            setEditClassName(e.target.value)
          }}/>
          <br />
          <div className="Invitees">
            <div>
              <label htmlFor="" className="InviteTitle">Other Teachers: </label>
              <SearchBar<Teacher> name="Teacher" content={allTeachers} currentUserId={userId} defaultAddedContent={teachers} updateContent={(content) => {
                setAddedTeachers(content)
              }}/>
            </div>
            
            <div>
              <label htmlFor="" className="InviteTitle">Students: </label>
              <SearchBar<Student> name="Student" content={students} currentUserId={userId} defaultAddedContent={classStudents} updateContent={(content) => {
                setClassStudents(content)
              }}/>
            </div>
            
          </div>
          <br />
          <button type="button" onClick={() => {
            chooseBackgroundRef.current?.showModal()
          }}>Edit Background</button>
         <br />
         <br />
          <button type="button" onClick={() => {
            chooseColorRef.current?.showModal()
          }}>Edit Color</button>
          <br />
          <br />
          <button type="button" onClick={handleEditClass}>Save Class</button>
        </form>
      </dialog>
      
      <CloseWarningDialog closeWarningRef={closeWarningRef} connectedRef={editClassRef}/>
      <InfoDialog info={error} Title={errorTitle} infoModalRef={errorModalRef}/>
      <ChooseBackgroundDialog setBackground={setBackground} backgroundRef={chooseBackgroundRef} currentBackground={background}/>
      <ChooseColorDialog setBgColor={setBackgroundColor} colorRef={chooseColorRef} currentBgColor={backgroundColor} isProject={false}/>
    </>
  )
}

export default Projects
