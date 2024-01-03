import { useEffect, useRef, useState } from 'react'
import "./teacher_dashboard.css"
import { Class, Student, Teacher } from '../CustomTypes/firebase_types'
import { checkIfClassNameTaken, createClass, deleteClass, getStudents, getTeachers, getTeachersClasses } from '../API/database'
import ClassTile from './class_tile'
import PlusIcon from '../assets/plus.png'
import GearIcon from '../assets/gear.png'
import SearchBar from '../Components/search_bar'
import CloseIcon from '../assets/close.png'
import { signOutUser } from '../API/auth'
import InfoDialog from '../Dialogs/info_dialog'


type TeacherDashboardProps = {
  id: string
}


function TeacherDashboard({id}: TeacherDashboardProps) {
  const [classes, setClasses] = useState<Class[]>([])


  const [teachers, setTeachers] = useState<Teacher[]>([])
  const settingsModalRef = useRef<HTMLDialogElement>(null)
  const modalRef = useRef<HTMLDialogElement>(null)
  const errorModalRef = useRef<HTMLDialogElement>(null)
  const [error, setError] = useState<string>("")
  const [errorTitle, setErrorTitle] = useState<string>("")
  const [addedTeachers, setAddedTeachers] = useState<Teacher[]>([])
  const [className, setClassName] = useState<string>("")

  const [background, setBackground] = useState<"RedPolygon" | "FieryPolygon" | "Hex">("Hex")
  const [students, setStudents] = useState<Student[]>([])
  
  const [addedStudents, setAddedStudents] = useState<Student[]>([])

  useEffect(() => {
    // Generate random background
    const backgrounds: ("RedPolygon" | "FieryPolygon" | "Hex")[] = ["RedPolygon", "FieryPolygon", "Hex"]
    const rand: number = Math.floor(Math.random() * backgrounds.length)
    setBackground(backgrounds[rand])
    fetchClasses()
    console.log(classes)
  }, [])
  async function fetchClasses() {
    const res = await getTeachersClasses(id)
    setClasses(res)
    
    const tRes: Teacher[] = await getTeachers()
    setTeachers(tRes)

    const sRes: Student[] = await getStudents()
    setStudents(sRes)
  }
  

  const handleCreateClass = async () => {
    const classNameTaken: boolean = await checkIfClassNameTaken(className)
    if (classNameTaken){
      setError("This class name is already taken!")
      setErrorTitle("Class Name Taken")
      errorModalRef.current?.showModal()
      return
    }
    const teachers: string[] = addedTeachers.map((teacher) => teacher.id)
    teachers.push(id)
    const students: string[] = addedStudents.map((student) => student.id)
    await createClass(className, students, teachers)

    modalRef.current?.close()
    fetchClasses()
  }

  const handleLogOut = async () => {
    await signOutUser()
    localStorage.removeItem("userType")
    window.location.href = window.location.origin + "/Login/"
  }

  const handleDeleteClass = (classId: string) => async () => {
    await deleteClass(classId)
    fetchClasses()
  }


  return (
    <>
      <div className={'Center ' + background}>
        <h2 className='Title'>Teacher Classes</h2>
        <div className='Icons'>
          <img src={PlusIcon} alt="add class" className='PlusIcon' onClick={() => {
            modalRef.current?.showModal()
          }}/>
          <img src={GearIcon} alt="open account settings" className='SettingsIcon' onClick={() => {
            settingsModalRef.current?.showModal()
          }}/>
        </div>
       

        <div className='Classes'>
           {classes.map((teacherClass) => (
              <ClassTile key={teacherClass.name} name={teacherClass.name} id={teacherClass.id} isTeacher={true} deleteClass={handleDeleteClass(teacherClass.id)}/>
            ))}
            <button className='LogOut' onClick={handleLogOut}>Log Out</button>
        </div>
        <br />
      </div>
      <dialog ref={modalRef}>
        <h2>Create Class</h2>
        <img src={CloseIcon} alt="close" className="CloseIcon" onClick={() => {
          modalRef.current?.close()
        }}/>
        <form>
          <label htmlFor="className">Class Name:</label>
          <span> </span>
          <input type="text" name="className" id="className" value={className} onChange={(e) => {
            setClassName(e.target.value)
          }}/>
          <br />
          <label htmlFor="">Other Teachers: </label>
            <SearchBar<Teacher> name="Teacher" content={teachers} currentUserId={id} updateContent={(content) => {
              setAddedTeachers(content)
            }}/>
          <br />
          <label htmlFor="">Students: </label>
            <SearchBar<Student> name="Student" content={students} currentUserId={id} updateContent={(content) => {
              setAddedStudents(content)
            }}/>
          <br />
          <button type="button" onClick={handleCreateClass}>Create Class</button>
        </form>
      </dialog>
      <dialog ref={settingsModalRef} className='SettingsDialog'>
        <h2>Account Settings</h2>
        <img src={CloseIcon} alt="close" className="CloseIcon" onClick={() => {
          settingsModalRef.current?.close()
        }}/>
        <form>
          <button type="button" onClick={() => {
             const url = new URL(window.location.origin)     
             url.searchParams.set("userId", id)
             url.searchParams.set("background", background)
             window.location.href = url.origin + "/Project/Editor/" + url.search
          }}>Edit Default Template</button>
        </form>
      </dialog>
      <InfoDialog info={error} Title={errorTitle} infoModalRef={errorModalRef}/>
    </>
  )
}

export default TeacherDashboard
