import { useEffect, useRef, useState } from 'react'
import "./teacher_dashboard.css"
import { Class, Student, Teacher } from '../firebase_types'
import { checkIfClassNameTaken, createClass, deleteClass, getStudents, getTeachers, getTeachersClasses } from '../API/database'
import ClassTile from './class_tile'
import PlusIcon from '../assets/plus.png'
import TrashIcon from '../assets/trash.png'
import PlusCircleIcon from '../assets/plus_circle.png'
import SearchBar from './search_bar'
import CloseIcon from '../assets/close.png'
import { signOutUser } from '../API/auth'
import ErrorDialog from '../error_dialog'


type TeacherDashboardProps = {
  id: string
}


function TeacherDashboard({id}: TeacherDashboardProps) {
  const [classes, setClasses] = useState<Class[]>([])


  const [teachers, setTeachers] = useState<Teacher[]>([])

  const modalRef = useRef<HTMLDialogElement>(null)
  const errorModalRef = useRef<HTMLDialogElement>(null)
  const [error, setError] = useState<string>("")
  const [errorTitle, setErrorTitle] = useState<string>("")
  const [addedTeachers, setAddedTeachers] = useState<Teacher[]>([])
  const [className, setClassName] = useState<string>("")


  const [students, setStudents] = useState<Student[]>([])
  
  const [addedStudents, setAddedStudents] = useState<Student[]>([])

  useEffect(() => {
    
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
      <div className='Center'>
        <h2 className='Title'>Teacher Classes</h2>
        <img src={PlusIcon} alt="add class" className='PlusIcon' onClick={() => {
          modalRef.current?.showModal()
        }}/>
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
      <ErrorDialog error={error} errorTitle={errorTitle} errorModalRef={errorModalRef}/>
    </>
  )
}

export default TeacherDashboard
