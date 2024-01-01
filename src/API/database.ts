import {
    getFirestore, doc, query,getDoc,setDoc, collection, addDoc, updateDoc, getDocs, where, Firestore, orderBy, deleteDoc
}
from "firebase/firestore"
import {ClassLocal, Class, Eval, Project, Student, Teacher, EvalSubmission} from "../firebase_types"
import { app } from "./firebase"
import { Questions } from "../QuestionComps/QuestionTypes"
const db: Firestore = getFirestore(app)
import localClassesRaw from "../../LocalData/Classes.json"
import localStudentsRaw from "../../LocalData/Students.json"
import localTeachersRaw from "../../LocalData/Teachers.json"
import { ISLOCAL } from "../public_vars"


type ClassData = Record<string, ClassLocal>
const localClasses = localClassesRaw as ClassData

type StudentData = Record<string, Student>
const localStudents = localStudentsRaw as StudentData

type TeacherData = Record<string, Teacher>
const localTeachers = localTeachersRaw as TeacherData

export async function getStudentClasses(studentId: string): Promise<Class[]> {
    if(ISLOCAL) {
        return getStudentClassesLocal(studentId)
    }
    return await getStudentClassesFB(studentId)
}

function getStudentClassesLocal(studentId: string): Class[] {
    const classes: Class[] = []
    for (const key in localClasses) {
        const classData = localClasses[key]
        if(classData.students.includes(studentId)) {
            classes.push({
                name: classData.name,
                students: classData.students,
                id: classData.id,
                teachers: classData.teachers
            })
        }
    }
    return classes
}


async function getStudentClassesFB(studentId: string): Promise<Class[]> {
    const q = query(collection(db, "Classes"), where("students", "array-contains", studentId))
    const querySnapshot = await getDocs(q)
    const classes: Class[] = []
    const data = querySnapshot.docs.map((doc) => doc.data())
    data.forEach((classData) => {
        classes.push({
            name: classData.name,
            students: classData.students,
            id: classData.id,
            teachers: classData.teachers
        })
    })
    return classes
}

export async function getTeachersClasses(studentId: string): Promise<Class[]> {
    if(ISLOCAL) {
        return getTeachersClassesLocal(studentId)
    }
    return await getTeachersClassesFB(studentId)
}

function getTeachersClassesLocal(teacherId: string): Class[] {
    const classes: Class[] = []
    for (const key in localClasses) {
        const classData = localClasses[key]
        if(classData.teachers.includes(teacherId)) {
            classes.push({
                name: classData.name,
                students: classData.students,
                id: classData.id,
                teachers: classData.teachers
            })
        }
    }
    return classes
    
}

async function getTeachersClassesFB(teacherId: string): Promise<Class[]> {
    console.log("Getting classes for teacher " + teacherId)
    const q = query(collection(db, "Classes"), where("teachers", "array-contains", teacherId))
    const querySnapshot = await getDocs(q)
    const classes: Class[] = []
    const data = querySnapshot.docs.map((doc) => doc.data())
    data.forEach((classData) => {
        classes.push({
            name: classData.name,
            students: classData.students,
            id: classData.id,
            teachers: classData.teachers
        })
    })
    return classes
}

export async function getStudentProjects(studentId: string, classId: string): Promise<Project[]> {
    if(ISLOCAL) {
        return getStudentProjectsLocal(studentId, classId)
    }
    return await getStudentProjectsFB(studentId, classId)
}

function getStudentProjectsLocal(studentId: string, classId: string): Project[] {
    const projects: Project[] = []
    const classData = localClasses[classId]
    console.log("Getting projects for student " + studentId + " in class " + classId)
    if(classData) {
        for (const key in classData.projects) {
            const projectData = classData.projects[key]
            if(projectData.students.includes(studentId)) {
                projects.push({
                    name: projectData.name,
                    students: projectData.students,
                    id: projectData.id,
                    eval_template: projectData.eval_template as Questions,
                    evals: projectData.evals
                })
            }
        }
    }
    return projects
}

async function getStudentProjectsFB(studentId: string, classId: string): Promise<Project[]> {
    console.log("Getting projects for student " + studentId + " in class " + classId)
    const studentClass = doc(db, "Classes", classId)
    const q = query(collection(studentClass, "Projects"), where("students", "array-contains", studentId))
    const querySnapshot = await getDocs(q)
    const projects: Project[] = []
    const data = querySnapshot.docs.map((doc) => doc.data())
    data.forEach((projectData) => {
        projects.push({
            name: projectData.name,
            students: projectData.students,
            id: projectData.id,
            eval_template: projectData.eval_template,
            evals: projectData.evals
        })
    })
    return projects
}

export async function getStudentsInProject(classId: string, projectId: string): Promise<Student[]> {
    if(ISLOCAL) {
        return getStudentsInProjectLocal(classId, projectId)
    }
    return await getStudentsInProjectFB(classId, projectId)
}

function getStudentsInProjectLocal(classId: string, projectId: string): Student[] {
    const students: Student[] = []
    const classData = localClasses[classId]
    const projectData = classData.projects[projectId]
    for(const student in projectData.students) {
        const studentData = localStudents[projectData.students[student]]
        students.push({
            name: studentData.name,
            id: studentData.id,
            email: studentData.email
        })
    }
    return students
}

async function getStudentsInProjectFB(classId: string, projectId: string): Promise<Student[]> {
    // console.log("Getting students in project " + projectId + " in class " + classId)
    const studentClass = doc(db, "Classes", classId)
    const project = doc(studentClass, "Projects", projectId)
    const projectData = (await getDoc(project)).data()
    if (projectData) {
        const students: Student[] = []
        console.log("Getting students in data: " + JSON.stringify(projectData))
        for(const student in projectData.students) {
            console.log("Getting student data for " + projectData.students[student])
            const studentData = await getStudentData(projectData.students[student])
            students.push(studentData)
        }
        return students
    }
    return []
}

export async function getStudentData(studentId: string): Promise<Student> {
    if(ISLOCAL) {
        return getStudentDataLocal(studentId)
    }
    return await getStudentDataFB(studentId)
    
}

function getStudentDataLocal(studentId: string): Student {
    const studentData = localStudents[studentId]
    if (studentData) {
        return studentData as Student
    }
    return {name: "", id: "", email: ""}
}

async function getStudentDataFB(studentId: string): Promise<Student> {
    const student = doc(db, "Students", studentId)
    const studentData = (await getDoc(student)).data()
    if (studentData) {
        return studentData as Student
    }
    return {name: "", id: "", email: ""}
}

export async function getProjectEvalTemplate(classId: string, projectId: string): Promise<Questions> {
    if(ISLOCAL) {
        return getProjectEvalTemplateLocal(classId, projectId)
    }
    return await getProjectEvalTemplateFB(classId, projectId)
}

function getProjectEvalTemplateLocal(classId: string, projectId: string): Questions {

    const classData = localClasses[classId]
    if(classData) {
        const projectData = classData.projects[projectId]
        if(projectData) {
            return projectData.eval_template as Questions
        }
    }
    return []
}

async function getProjectEvalTemplateFB(classId: string, projectId: string): Promise<Questions> {
    const studentClass = doc(db, "Classes", classId)
    const project = doc(studentClass, "Projects", projectId)
    const projectData = (await getDoc(project)).data()
    if (projectData) {
        return projectData.eval_template
    }
    return []
}

export async function createProjectEvalTemplate(classId: string, projectId: string, eval_template: Questions){
    if(ISLOCAL){
        await createProjectEvalTemplateLocal(classId, projectId, eval_template)
        return
    }
    await createProjectEvalTemplateFB(classId, projectId, eval_template)
}

async function createProjectEvalTemplateLocal(classId: string, projectId: string, eval_template: Questions){
    const classData = localClasses[classId]
    if(classData) {
        const projectData = classData.projects[projectId]
        if(projectData) {
            projectData.eval_template = eval_template
        }
    }
    await saveFile("Classes", JSON.stringify(localClasses))
}

async function createProjectEvalTemplateFB(classId: string, projectId: string, eval_template: Questions){
    const studentClass = doc(db, "Classes", classId)
    const project = doc(studentClass, "Projects", projectId)
    const projectData = (await getDoc(project)).data()
    if (projectData) {
        
        
        await updateDoc(project, {eval_template: eval_template})
    }
}

export async function editProject(classId: string, projectId: string, name: string, students: string[]){
    if(ISLOCAL){
        await editProjectLocal(classId, projectId, name, students)
        return
    }
    await editProjectFB(classId, projectId, name, students)
}

async function editProjectLocal(classId: string, projectId: string, name: string, students: string[]){
    const classData = localClasses[classId]
    if(classData) {
        const projectData = classData.projects[projectId]
        if(projectData) {
            projectData.name = name
            projectData.students = students
        }
    }
    await saveFile("Classes", JSON.stringify(localClasses))
}

async function editProjectFB(classId: string, projectId: string, name: string, students: string[]){
    const studentClass = doc(db, "Classes", classId)
    const project = doc(studentClass, "Projects", projectId)
    const projectData = (await getDoc(project)).data()
    if (projectData) {
        
        
        await updateDoc(project, {name: name, students: students})
    }
}

export async function addStudentEval(classId: string, projectId: string, evalData: Eval, onFinish: () => void) {
    if(ISLOCAL) {
        await addStudentEvalLocal(classId, projectId, evalData, onFinish)
        return
    }
    await addStudentEvalFB(classId, projectId, evalData, onFinish)
}

async function addStudentEvalLocal(classId: string, projectId: string, evalData: Eval, onFinish: () => void) {
    const classData = localClasses[classId]
    if(classData) {
        const projectData = classData.projects[projectId]
        if(projectData) {
            //Check if eval with same target and submitter exists
            for(const e in projectData.evals){
                const currentEval = projectData.evals[e]
                if(currentEval.targetId == evalData.targetId && currentEval.submitterId == evalData.submitterId){
                    //Eval exists, replace it
                    projectData.evals[e] = evalData
                    await saveFile("Classes",JSON.stringify(localClasses))
                    onFinish()
                    return
                }
            }
            projectData.evals.push(evalData)
        }
    }
    await saveFile("Classes",JSON.stringify(localClasses))
    onFinish()
}

async function saveFile(name:string ,data: string) {
    try {
      // create a new handle
      const root = await navigator.storage.getDirectory();
      console.log(root)
      const subDir = await root.getDirectoryHandle("Desktop", { create: true });
      console.log(subDir)
      // Get sync access handle
    //   const accessHandle = await draftHandle.createSyncAccessHandle();
      const newHandle = await window.showSaveFilePicker({startIn: subDir, suggestedName: `${name}.json`});
  
    //   create a FileSystemWritableFileStream to write to
      const writableStream = await newHandle.createWritable();
  
      // write our file
      await writableStream.write(data);
        // Persist changes to disk.
        // accessHandle.flush();

        // Always close FileSystemSyncAccessHandle if done.
        writableStream.close();
    } catch (err) {
      console.error(err.name, err.message);
    }
  }

async function addStudentEvalFB(classId: string, projectId: string, evalData: Eval, onFinish: () => void) {
    const studentClass = doc(db, "Classes", classId)
    const project = doc(studentClass, "Projects", projectId)
    const projectData = (await getDoc(project)).data()
    if (projectData) {
        const evals = projectData.evals
        //Check if eval with same target and submitter exists
        for(const e in evals){
            const currentEval = evals[e]
            if(currentEval.targetId == evalData.targetId && currentEval.submitterId == evalData.submitterId){
                //Eval exists, replace it
                evals[e] = evalData
                console.log("Eval exists, replacing it")
                console.log(evalData)
                await updateDoc(project, {evals: evals})
                onFinish()
                return
            }
        }
        console.log("Eval does not exist, adding it")
        console.log(evalData)
        await updateDoc(project, {evals: [...evals, evalData]})
    }
    onFinish()
}

export async function addStudentDoc(name:string, email:string, id:string, onFinish: () => void) {
    if(ISLOCAL) {
        await addStudentDocLocal(name, email, id, onFinish)
        return
    }
    await addStudentDocFB(name, email, id, onFinish)
}

async function addStudentDocLocal(name:string, email:string, id:string, onFinish: () => void) {
    localStudents[id] = {
        name: name,
        email: email,
        id: id
    }
    await saveFile("Students",JSON.stringify(localStudents))
    onFinish()
}

async function addStudentDocFB(name:string, email:string, id:string, onFinish: () => void) {
    await setDoc(doc(db, "Students", id), {
        name: name,
        email: email,
        id: id
    })
    onFinish()
}

export async function addTeacherDoc(name:string, email:string, id:string, onFinish: () => void) {
    if(ISLOCAL) {
        await addTeacherDocLocal(name, email, id, onFinish)
        return
    }
    await addTeacherDocFB(name, email, id, onFinish)
}



async function addTeacherDocLocal(name:string, email:string, id:string, onFinish: () => void) {
    localTeachers[id] = {
        name: name,
        email: email,
        id: id
    }
    await saveFile("Teachers",JSON.stringify(localTeachers))
    onFinish()
}

async function addTeacherDocFB(name:string, email:string, id:string, onFinish: () => void) {
    await setDoc(doc(db, "Teachers", id), {
        name: name,
        email: email,
        id: id
    })
    onFinish()
}

export async function isTeacher(id:string): Promise<boolean> {
    console.log(`Checking if ${id} is a teacher`)
    if(ISLOCAL) {
        return isTeacherLocal(id)
    }
    return await isTeacherFB(id)
}

function isTeacherLocal(id:string): boolean {
    return id in localTeachers
}

async function isTeacherFB(id:string): Promise<boolean> {
    const teacher = doc(db, "Teachers", id)
    const teacherData = await getDoc(teacher)
    return teacherData.exists()
}

export async function getStudents(): Promise<Student[]> {
    if(ISLOCAL) {
        return getStudentsLocal()
    }
    return await getStudentsFB()
}

function getStudentsLocal(): Student[] {
    const students: Student[] = []
    for (const key in localStudents) {
        const studentData = localStudents[key]
        students.push({
            name: studentData.name,
            id: studentData.id,
            email: studentData.email
        })
    }
    return students
}

async function getStudentsFB(): Promise<Student[]> {
    const q = query(collection(db, "Students"), orderBy("name"))
    const querySnapshot = await getDocs(q)
    const students: Student[] = []
    const data = querySnapshot.docs.map((doc) => doc.data())
    data.forEach((studentData) => {
        students.push({
            name: studentData.name,
            id: studentData.id,
            email: studentData.email
        })
    })
    return students
}

export async function getTeachers(): Promise<Teacher[]>{
    if(ISLOCAL) {
        return getTeachersLocal()
    }
    return await getTeachersFB()
}

function getTeachersLocal(): Teacher[]{
    const teachers: Teacher[] = []
    for (const key in localTeachers) {
        const teacherData = localTeachers[key]
        teachers.push({
            name: teacherData.name,
            id: teacherData.id,
            email: teacherData.email
        })
    }
    return teachers
}

async function getTeachersFB(): Promise<Teacher[]>{
    const q = query(collection(db, "Teachers"), orderBy("name"))
    const querySnapshot = await getDocs(q)
    const teachers: Teacher[] = []
    const data = querySnapshot.docs.map((doc) => doc.data())
    data.forEach((teacherData) => {
        teachers.push({
            name: teacherData.name,
            id: teacherData.id,
            email: teacherData.email
        })
    })
    return teachers
}

export async function createClass(name: string, students: string[], teachers: string[]) {
    if(ISLOCAL) {
        await createClassLocal(name, students, teachers)
        return
    }
    await createClassFB(name, students, teachers)
    
}

async function createClassLocal(name: string, students: string[], teachers: string[]) {
    const id = "class" + Math.floor(Math.random() * 1000000000)
    localClasses[id] = {
        name: name,
        students: students,
        teachers: teachers,
        id: id,
        projects: {}
    }
    console.log("Created class with id " + id)
    await saveFile("Classes",JSON.stringify(localClasses))
    
}

async function createClassFB(name: string, students: string[], teachers: string[]) {
    const id = await addDoc(collection(db, "Classes"), {
        name: name,
        students: students,
        teachers: teachers
    })

    //Update the class with the id
    await updateDoc(doc(db, "Classes", id.id), {
        id: id.id
    })
    console.log("Created class with id " + id.id)
    
}

export async function createProject(name: string, students: string[], classId: string){
    if(ISLOCAL) {
        await createProjectLocal(name, students, classId)
        return
    }
    await createProjectFB(name, students, classId)
}

async function createProjectLocal(name: string, students: string[], classId: string){
    const id = "project" + Math.floor(Math.random() * 1000000000)
    localClasses[classId].projects[id] = {
        name: name,
        students: students,
        eval_template: [],
        evals: [],
        id: id
    }
    console.log("Created project with id " + id)
    await saveFile("Classes",JSON.stringify(localClasses))
}

async function createProjectFB(name: string, students: string[], classId: string){
    const id = await addDoc(collection(db, "Classes", classId, "Projects"), {
        name: name,
        students: students,
        eval_template: [],
        evals: []
    })

    //Update the class with the id
    await updateDoc(doc(db, "Classes", classId, "Projects", id.id), {
        id: id.id
    })
    console.log("Created project with id " + id.id)
}

export async function getClassProjects(classId: string): Promise<Project[]> {
    if(ISLOCAL) {
        return getClassProjectsLocal(classId)
    }
    return await getClassProjectsFB(classId)
}

function getClassProjectsLocal(classId: string): Project[] {
    const projects: Project[] = []
    const classData = localClasses[classId]
    if(classData) {
        for (const key in classData.projects) {
            const projectData = classData.projects[key]
            projects.push({
                name: projectData.name,
                students: projectData.students,
                id: projectData.id,
                eval_template: projectData.eval_template as Questions,
                evals: projectData.evals
            })
        }
    }
    console.log("Got projects for class " + classId + ": " + JSON.stringify(projects))
    return projects
}

async function getClassProjectsFB(classId: string): Promise<Project[]> {
    const q = query(collection(db, "Classes", classId, "Projects"))
    const querySnapshot = await getDocs(q)
    const projects: Project[] = []
    const data = querySnapshot.docs.map((doc) => doc.data())
    data.forEach((projectData) => {
        projects.push({
            name: projectData.name,
            students: projectData.students,
            id: projectData.id,
            eval_template: projectData.eval_template,
            evals: projectData.evals
        })
    })
    return projects
}

export async function getClassData(classId: string): Promise<Class> {
    if(ISLOCAL) {
        return getClassDataLocal(classId)
    }
    return await getClassDataFB(classId)
}

function getClassDataLocal(classId: string): Class {
    const classData = localClasses[classId]
    if (classData) {
        return classData as Class
    }
    return {name: "", id: "", students: [], teachers: []}
}

async function getClassDataFB(classId: string): Promise<Class> {
    const studentClass = doc(db, "Classes", classId)
    const classData = (await getDoc(studentClass)).data()
    if (classData) {
        return classData as Class
    }
    return {name: "", id: "", students: [], teachers: []}
}

export async function getProjectData(classId:string, projectId: string): Promise<Project> {
    if(ISLOCAL){
        return getProjectDataLocal(classId, projectId)
    }
    return await getProjectDataFB(classId, projectId)
    
}

function getProjectDataLocal(classId:string, projectId: string): Project {
    const classData = localClasses[classId]
    return classData.projects[projectId]
}

async function getProjectDataFB(classId:string, projectId: string): Promise<Project> {
    const project = doc(db, "Classes", classId, "Projects", projectId)
    const projectData = (await getDoc(project)).data()
    if (projectData) {
        return projectData as Project
    }
    return {name: "", id: "", students: [], eval_template: [], evals: []}
}

export async function getPastEvals(classId: string, projectId: string, studentId: string, userId: string): Promise<EvalSubmission[]> {
    if(ISLOCAL){
        return getPastEvalsLocal(classId, projectId, studentId, userId)
    }
    return await getPastEvalsFB(classId, projectId, studentId, userId)
}

function getPastEvalsLocal(classId: string, projectId: string, studentId: string, userId: string): EvalSubmission[]{
    const classData = localClasses[classId]
    const projectData = classData.projects[projectId]
    const evals = projectData.evals
    for(const e in evals){
        const currentEval = evals[e]
        if(currentEval.targetId == studentId && currentEval.submitterId == userId){
            return currentEval.submission
        }
    }
    return []
}

async function getPastEvalsFB(classId: string, projectId: string, studentId: string, userId: string): Promise<EvalSubmission[]>{
    const projectData = await getProjectData(classId, projectId)
    const evals = projectData.evals
    for(const e in evals){
        const currentEval = evals[e]
        if(currentEval.targetId == studentId && currentEval.submitterId == userId){
            return currentEval.submission
        }
    }
    return []
}

export async function getTeacherData(teacherId: string): Promise<Teacher> {
    if(ISLOCAL) {
        return getTeacherDataLocal(teacherId)
    }
    return await getTeacherDataFB(teacherId)
}

function getTeacherDataLocal(teacherId: string): Teacher {
    const teacherData = localTeachers[teacherId]
    if (teacherData) {
        return teacherData as Teacher
    }
    return {name: "", id: "", email: ""}
}

async function getTeacherDataFB(teacherId: string): Promise<Teacher> {
    console.log(teacherId + " Teacher ID")
    const teacher = doc(db, "Teachers", teacherId)
    const teacherData = (await getDoc(teacher)).data()
    if (teacherData) {
        return teacherData as Teacher
    }
    return {name: "", id: "", email: ""}
}

export async function getTeachersData(teacherIds: string[]): Promise<Teacher[]> {
    if(ISLOCAL) {
        return getTeachersDataLocal(teacherIds)
    }
    return await getTeachersDataFB(teacherIds)
}

function getTeachersDataLocal(teacherIds: string[]): Teacher[] {
    const teachers: Teacher[] = []
    for(const teacherId in teacherIds) {
        const id = teacherIds[teacherId]
        const teacherData = localTeachers[id]
        console.log("Getting teacher data for " + id + ": " + JSON.stringify(teacherData))
        if (teacherData) {
            teachers.push(teacherData as Teacher)
        }
    }
    return teachers
}

async function getTeachersDataFB(teacherIds: string[]): Promise<Teacher[]> {
    const teachers: Teacher[] = []
    for(const teacherId in teacherIds) {
       const teacherData = await getTeacherData(teacherIds[teacherId])
        teachers.push(teacherData)
    }
    return teachers
}

export async function editClass(classId: string, name: string, students: string[], teachers: string[]) {
    if(ISLOCAL) {
        await editClassLocal(classId, name, students, teachers)
        return
    }
    await editClassFB(classId, name, students, teachers)
}

async function editClassLocal(classId: string, name: string, students: string[], teachers: string[]) {
    const classData = localClasses[classId]
    if(classData) {
        classData.name = name
        classData.students = students
        classData.teachers = teachers
    }
    await saveFile("Classes",JSON.stringify(localClasses))
}

async function editClassFB(classId: string, name: string, students: string[], teachers: string[]) {
    await updateDoc(doc(db, "Classes", classId), {
        name: name,
        students: students,
        teachers: teachers
    })
}

export async function getStudentsInClass(classId: string): Promise<Student[]> {
    if(ISLOCAL) {
        return getStudentsInClassLocal(classId)
    }
    return await getStudentsInClassFB(classId)
}

function getStudentsInClassLocal(classId: string): Student[] {
    const classData = localClasses[classId]
    const students: Student[] = []
    if(classData) {
        for(const studentId in classData.students) {
            const studentData = localStudents[classData.students[studentId]]
            students.push(studentData)
        }
    }
    return students
}

async function getStudentsInClassFB(classId: string): Promise<Student[]> {
    const classData = await getClassData(classId)
    const students: Student[] = []
    if(classData) {
        for(const studentId in classData.students) {
            const studentData = await getStudentData(classData.students[studentId])
            students.push(studentData)
        }
    }
    return students
}

export async function getStudentEvals(classId: string, projectId: string, studentId: string): Promise<Eval[]> {
    if(ISLOCAL) {
        return getStudentEvalsLocal(classId, projectId, studentId)
    }
    return await getStudentEvalsFB(classId, projectId, studentId)
}

function getStudentEvalsLocal(classId: string, projectId: string, studentId: string): Eval[] {
    const classData = localClasses[classId]
    const projectData = classData.projects[projectId]
    const evals: Eval[] = []
    for(const e in projectData.evals){
        const currentEval = projectData.evals[e]
        if(currentEval.targetId == studentId){
            evals.push(currentEval)
        }
    }
    return evals
}

async function getStudentEvalsFB(classId: string, projectId: string, studentId: string): Promise<Eval[]> {
    const projectData = await getProjectData(classId, projectId)
    const evals: Eval[] = []
    for(const e in projectData.evals){
        const currentEval = projectData.evals[e]
        if(currentEval.targetId == studentId){
            evals.push(currentEval)
        }
    }
    return evals
}

export async function checkIfUserNameTaken(name: string): Promise<boolean> {
    if(ISLOCAL) {
        return checkIfUserNameTakenLocal(name)
    }
    return await checkIfUserNameTakenFB(name)
}

function checkIfUserNameTakenLocal(name: string): boolean {
    for(const key in localStudents) {
        const student = localStudents[key]
        if(student.name == name) {
            return true
        }
    }
    for(const key in localTeachers) {
        const teacher = localTeachers[key]
        if(teacher.name == name) {
            return true
        }
    }
    return false
}

async function checkIfUserNameTakenFB(name: string): Promise<boolean> {
    const students = await getStudents()
    const teachers = await getTeachers()
    for(const key in students) {
        const student = students[key]
        if(student.name == name) {
            return true
        }
    }
    for(const key in teachers) {
        const teacher = teachers[key]
        if(teacher.name == name) {
            return true
        }
    }
    return false
}

export async function checkIfClassNameTaken(name: string): Promise<boolean> {
    if(ISLOCAL) {
        return checkIfClassNameTakenLocal(name)
    }
    return await checkIfClassNameTakenFB(name)
}

function checkIfClassNameTakenLocal(name: string): boolean {
    for(const key in localClasses) {
        const classData = localClasses[key]
        if(classData.name == name) {
            return true
        }
    }
    return false
}

async function checkIfClassNameTakenFB(name: string): Promise<boolean> {
    const classes = await getClasses()
    for(const key in classes) {
        const classData = classes[key]
        if(classData.name == name) {
            return true
        }
    }
    return false
}

export async function getClasses(): Promise<Class[]> {
    if(ISLOCAL) {
        return getClassesLocal()
    }
    return await getClassesFB()
}

function getClassesLocal(): Class[] {
    const classes: Class[] = []
    for (const key in localClasses) {
        const classData = localClasses[key]
        classes.push({
            name: classData.name,
            students: classData.students,
            id: classData.id,
            teachers: classData.teachers
        })
    }
    return classes
}

async function getClassesFB(): Promise<Class[]> {
    const q = query(collection(db, "Classes"))
    const querySnapshot = await getDocs(q)
    const classes: Class[] = []
    const data = querySnapshot.docs.map((doc) => doc.data())
    data.forEach((classData) => {
        classes.push({
            name: classData.name,
            students: classData.students,
            id: classData.id,
            teachers: classData.teachers
        })
    })
    return classes
}

export async function checkIfProjectNameTaken(classId: string, name: string): Promise<boolean> {
    if(ISLOCAL) {
        return checkIfProjectNameTakenLocal(classId, name)
    }
    return await checkIfProjectNameTakenFB(classId, name)
}

function checkIfProjectNameTakenLocal(classId: string, name: string): boolean {
    const classData = localClasses[classId]
    if(classData) {
        for(const key in classData.projects) {
            const project = classData.projects[key]
            if(project.name == name) {
                return true
            }
        }
    }
    return false
}

async function checkIfProjectNameTakenFB(classId: string, name: string): Promise<boolean> {
    const projects = await getClassProjects(classId)
    console.log("Checking if project name " + name + " is taken in class " + classId)
    for(const key in projects) {
        const project = projects[key]
        console.log("Checking if " + project.name + " is equal to " + name)
        if(project.name == name) {
            return true
        }
    }
    return false
}

export async function deleteClass(classId: string) {
    if(ISLOCAL) {
        await deleteClassLocal(classId)
        return
    }
    await deleteClassFB(classId)
}

async function deleteClassLocal(classId: string) {
    delete localClasses[classId]
    await saveFile("Classes", JSON.stringify(localClasses))
}

async function deleteClassFB(classId: string) {
    await deleteDoc(doc(db, "Classes", classId))
}


export async function deleteProject(classId: string, projectId: string) {
    if(ISLOCAL) {
       await deleteProjectLocal(classId, projectId)
        return
    }
    await deleteProjectFB(classId, projectId)
}

async function deleteProjectLocal(classId: string, projectId: string) {
    delete localClasses[classId].projects[projectId]
   await saveFile("Classes", JSON.stringify(localClasses))
}

async function deleteProjectFB(classId: string, projectId: string) {
    await deleteDoc(doc(db, "Classes", classId, "Projects", projectId))
}

export async function joinClass(classId: string, studentId: string) {
    if(ISLOCAL) {
        await joinClassLocal(classId, studentId)
        return
    }
    await joinClassFB(classId, studentId)
}

async function joinClassLocal(classId: string, studentId: string) {
    const classData = localClasses[classId]
    if(classData) {
        classData.students.push(studentId)
    }
    await saveFile("Classes", JSON.stringify(localClasses))
}

async function joinClassFB(classId: string, studentId: string) {
    const studentClass = doc(db, "Classes", classId)
    const classData = (await getDoc(studentClass)).data()
    if (classData) {
        await updateDoc(studentClass, {students: [...classData.students, studentId]})
    }
}