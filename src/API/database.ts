import {
    getFirestore, doc, query,getDoc,setDoc, collection, addDoc, updateDoc, getDocs, where, Firestore, orderBy, deleteDoc
}
from "firebase/firestore"
import {ClassLocal, Class, Eval, Project, Student, Teacher, EvalSubmission, Group} from "../CustomTypes/firebase_types"
import { app } from "./firebase"
import { Questions } from "../CustomTypes/QuestionTypes"
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
                teachers: classData.teachers,
                background: classData.background,
                backgroundColor: classData.backgroundColor
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
            teachers: classData.teachers,
            background: classData.background,
            backgroundColor: classData.backgroundColor
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
            classes.push(classData)
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
            teachers: classData.teachers,
            background: classData.background,
            backgroundColor: classData.backgroundColor
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
                projects.push(projectData)
        }
    }
    return projects
}

async function getStudentProjectsFB(studentId: string, classId: string): Promise<Project[]> {
    console.log("Getting projects for student " + studentId + " in class " + classId)
    const studentClass = doc(db, "Classes", classId)
    const q = query(collection(studentClass, "Projects"))
    const querySnapshot = await getDocs(q)
    const projects: Project[] = []
    const data = querySnapshot.docs.map((doc) => doc.data())
    data.forEach((projectData) => {
        projects.push({
            name: projectData.name,
            id: projectData.id,
            eval_template: projectData.eval_template,
            evals: projectData.evals,
            background: projectData.background,
            backgroundColor: projectData.backgroundColor,
            cardColor: projectData.cardColor,
            evalBackgroundColor: projectData.evalBackgroundColor,
            groups: {}
        })
    })
    return projects
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

export async function editProject(classId: string, projectId: string, name: string, background: string, backgroundColor: string, cardColor: string, evalBackgroundColor: string){
    if(ISLOCAL){
        await editProjectLocal(classId, projectId, name, background, backgroundColor, cardColor, evalBackgroundColor)
        return
    }
    await editProjectFB(classId, projectId, name, background, backgroundColor, cardColor, evalBackgroundColor)
}

async function editProjectLocal(classId: string, projectId: string, name: string, background: string, backgroundColor: string, cardColor: string, evalBackgroundColor: string){
    const classData = localClasses[classId]
    if(classData) {
        const projectData = classData.projects[projectId]
        if(projectData) {
            projectData.name = name
            projectData.background = background
            projectData.backgroundColor = backgroundColor
            projectData.cardColor = cardColor
            projectData.evalBackgroundColor = evalBackgroundColor

        }
    }
    await saveFile("Classes", JSON.stringify(localClasses))
}

async function editProjectFB(classId: string, projectId: string, name: string, background: string, backgroundColor: string, cardColor: string, evalBackgroundColor: string){
    const studentClass = doc(db, "Classes", classId)
    const project = doc(studentClass, "Projects", projectId)
    const projectData = (await getDoc(project)).data()
    if (projectData) {
        
        
        await updateDoc(project, {name: name, background: background, backgroundColor: backgroundColor, cardColor: cardColor, evalBackgroundColor: evalBackgroundColor})
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
        id: id,
        default_eval_template: []
    }
    await saveFile("Teachers",JSON.stringify(localTeachers))
    onFinish()
}

async function addTeacherDocFB(name:string, email:string, id:string, onFinish: () => void) {
    await setDoc(doc(db, "Teachers", id), {
        name: name,
        email: email,
        id: id,
        default_eval_template: []
    })
    onFinish()
}

export async function checkIfTeacher(id:string): Promise<boolean> {
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
        teachers.push(teacherData)
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
            email: teacherData.email,
            default_eval_template: teacherData.default_eval_template
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
        projects: {},
        background: "Hex",
        backgroundColor: ""
    }
    console.log("Created class with id " + id)
    await saveFile("Classes",JSON.stringify(localClasses))
    
}

async function createClassFB(name: string, students: string[], teachers: string[]) {
    const id = await addDoc(collection(db, "Classes"), {
        name: name,
        students: students,
        teachers: teachers,
        background: "Hex",
        backgroundColor: ""
    })

    //Update the class with the id
    await updateDoc(doc(db, "Classes", id.id), {
        id: id.id
    })
    console.log("Created class with id " + id.id)
    
}

export async function createProject(name: string, classId: string, numGroups: number){
    if(ISLOCAL) {
        await createProjectLocal(name, classId, numGroups)
        return
    }
    await createProjectFB(name, classId, numGroups)
}

async function createProjectLocal(name: string, classId: string, numGroups: number){
    const id = "project" + Math.floor(Math.random() * 1000000000)
    const groups: Record<string, Group> = {}
    for(let i = 0; i < numGroups; i++){
        groups["group" + i] = {
            name: "Group " + (i+1),
            students: [],
            id: "group" + i,
            index: i + 1
        }
    }
    localClasses[classId].projects[id] = {
        name: name,
        groups: groups,
        eval_template: [],
        evals: [],
        id: id,
        background: "Hex",
        backgroundColor: "#21212152",
        cardColor: "",
        evalBackgroundColor: "#21212152"
    }
    console.log("Created project with id " + id)
    await saveFile("Classes",JSON.stringify(localClasses))
}

async function createProjectFB(name: string, classId: string, numGroups: number){
    
    
    const id = await addDoc(collection(db, "Classes", classId, "Projects"), {
        name: name,
        eval_template: [],
        evals: [],
        background: "Hex",
        backgroundColor: "#21212152",
        cardColor: "",
        evalBackgroundColor: "#21212152",
    })

    //Update the class with the id
    await updateDoc(doc(db, "Classes", classId, "Projects", id.id), {
        id: id.id
    })

    for(let i = 0; i < numGroups; i++){
        const group = {
            name: "Group " + (i+1),
            students: [],
            index: i + 1
           
        }
        const groupId = await addDoc(collection(db, "Classes", classId, "Projects", id.id,"Groups"), group)
        await updateDoc(doc(db, "Classes", classId, "Projects", id.id, "Groups", groupId.id), {
            id: groupId.id
        })

    }
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
            projects.push(projectData)
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
            groups: {},
            id: projectData.id,
            eval_template: projectData.eval_template,
            evals: projectData.evals,
            background: projectData.background,
            backgroundColor: projectData.backgroundColor,
            cardColor: projectData.cardColor,
            evalBackgroundColor: projectData.evalBackgroundColor
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
    return {name: "", id: "", students: [], teachers: [], background: "", backgroundColor: ""}
}

async function getClassDataFB(classId: string): Promise<Class> {
    const studentClass = doc(db, "Classes", classId)
    const classData = (await getDoc(studentClass)).data()
    if (classData) {
        return classData as Class
    }
    return {name: "", id: "", students: [], teachers: [], background: "", backgroundColor: ""}
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
    return {name: "", id: "", groups: {}, eval_template: [], evals: [], background: "", backgroundColor: "", cardColor: "", evalBackgroundColor: ""}
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
    return {name: "", id: "", email: "", default_eval_template: []}
}

async function getTeacherDataFB(teacherId: string): Promise<Teacher> {
    console.log(teacherId + " Teacher ID")
    const teacher = doc(db, "Teachers", teacherId)
    const teacherData = (await getDoc(teacher)).data()
    if (teacherData) {
        return teacherData as Teacher
    }
    return {name: "", id: "", email: "", default_eval_template: []}
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


export async function getStudentsData(studentIds: string[]): Promise<Student[]> {
    if(ISLOCAL) {
        return getStudentsDataLocal(studentIds)
    }
    return await getStudentsDataFB(studentIds)
}

function getStudentsDataLocal(studentIds: string[]): Student[] {
    const students: Student[] = []
    for(const studentId in studentIds) {
        const id = studentIds[studentId]
        const studentData = localStudents[id]
        // console.log("Getting teacher data for " + id + ": " + JSON.stringify(teacherData))
        if (studentData) {
            students.push(studentData as Student)
        }
    }
    return students
}

async function getStudentsDataFB(studentIds: string[]): Promise<Student[]> {
    const students: Student[] = []
    for(const studentId in studentIds) {
       const studentData = await getStudentData(studentIds[studentId])
        students.push(studentData)
    }
    return students
}

export async function editClass(classId: string, name: string, students: string[], teachers: string[], background: string, backgroundColor: string) {
    if(ISLOCAL) {
        await editClassLocal(classId, name, students, teachers, background, backgroundColor)
        return
    }
    await editClassFB(classId, name, students, teachers, background, backgroundColor)
}

async function editClassLocal(classId: string, name: string, students: string[], teachers: string[], background: string, backgroundColor: string) {
    const classData = localClasses[classId]
    if(classData) {
        classData.name = name
        classData.students = students
        classData.teachers = teachers
        classData.background = background,
        classData.backgroundColor = backgroundColor
    }
    await saveFile("Classes",JSON.stringify(localClasses))
}

async function editClassFB(classId: string, name: string, students: string[], teachers: string[], background: string, backgroundColor: string) {
    await updateDoc(doc(db, "Classes", classId), {
        name: name,
        students: students,
        teachers: teachers,
        background: background,
        backgroundColor: backgroundColor
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
            teachers: classData.teachers,
            background: classData.background,
            backgroundColor: classData.backgroundColor
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
            teachers: classData.teachers,
            background: classData.background,
            backgroundColor: classData.backgroundColor
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

export async function copyProject(classId: string, projectId: string) {
    if(ISLOCAL) {
        await copyProjectLocal(classId, projectId)
        return
    }
    await copyProjectFB(classId, projectId)
}

async function copyProjectLocal(classId: string, projectId: string) {
    const classData = localClasses[classId]
    const projectData = classData.projects[projectId]
    const id = "project" + Math.floor(Math.random() * 1000000000)
    localClasses[classId].projects[id] = {
        name: projectData.name + " (Copy)",
        groups: {},
        eval_template: projectData.eval_template,
        evals: [],
        id: id,
        background: projectData.background,
        backgroundColor: projectData.backgroundColor,
        cardColor: projectData.cardColor,
        evalBackgroundColor: projectData.evalBackgroundColor
    }
    await saveFile("Classes", JSON.stringify(localClasses))
}

async function copyProjectFB(classId: string, projectId: string) {
    const projectData = await getProjectData(classId, projectId)
    const id = await addDoc(collection(db, "Classes", classId, "Projects"), {
        name: projectData.name + " (Copy)",
        students: [],
        eval_template: projectData.eval_template,
        evals: [],
        background: projectData.background,
        backgroundColor: projectData.backgroundColor,
        cardColor: projectData.cardColor,
        evalBackgroundColor: projectData.evalBackgroundColor
    })

    //Update the class with the id
    await updateDoc(doc(db, "Classes", classId, "Projects", id.id), {
        id: id.id
    })
}

export async function getProjectGroups(classId: string, projectId: string): Promise<Group[]>{
    if(ISLOCAL){
        return getProjectGroupsLocal(classId, projectId)
    }
    return await getProjectGroupsFB(classId, projectId)
}

function getProjectGroupsLocal(classId: string, projectId: string): Group[]{
    const classData = localClasses[classId]
    const projectData = classData.projects[projectId]
    const projectGroups = projectData.groups
    const groups: Group[] = []
    for (const key in projectGroups) {
        const groupData = projectGroups[key]
        groups.push({
            name: groupData.name,
            id: groupData.id,
            students: groupData.students,
            index: groupData.index
        })
    }
    return groups
}

async function getProjectGroupsFB(classId: string, projectId: string): Promise<Group[]>{
    const q = query(collection(db, "Classes", classId, "Projects", projectId, "Groups"))
    const querySnapshot = await getDocs(q)
    const groups: Group[] = []
    const data = querySnapshot.docs.map((doc) => doc.data())
    data.forEach((groupData) => {
        groups.push({
            name: groupData.name,
            students: groupData.students,
            id: groupData.id,
            index: groupData.index
        })
        
    })
   
    return groups
}

export async function getStudentGroup(classId: string, projectId: string, userId: string): Promise<Group | undefined> {
    if(ISLOCAL){
        return getStudentGroupLocal(classId, projectId, userId)
    }
    return await getStudentGroupFB(classId, projectId, userId)
}

function getStudentGroupLocal(classId: string, projectId: string, userId: string): Group | undefined{
    const classData = localClasses[classId]
    const projectData = classData.projects[projectId]
    const projectGroups = projectData.groups
    for (const key in projectGroups) {
        const groupData = projectGroups[key]
        const students = groupData.students
        if(students.includes(userId)){
            return groupData
        }
    }
    return undefined
}

async function getStudentGroupFB(classId: string, projectId: string, userId: string): Promise<Group | undefined>{
   //get group where list students contain userId
   const groupQ = query(collection(db, "Classes", classId, "Projects", projectId, "Groups"), where("students", "array-contains", userId))
    const groupQuerySnapshot = await getDocs(groupQ)
    const groupData = groupQuerySnapshot.docs.map((doc) => doc.data())
    if(groupData.length > 0){
        return groupData[0] as Group
    }
    return undefined
    
}

export async function createGroup(classId: string, projectId:string, name: string, students: string[]) {
    if(ISLOCAL) {
        await createGroupLocal(classId, projectId,name, students)
        return
    }
    await createGroupFB(classId, projectId,name, students)
    
}

async function createGroupLocal(classId: string, projectId:string, name: string, students: string[]) {
    const id = "class" + Math.floor(Math.random() * 1000000000)
    const classData = localClasses[classId]
    const projectData = classData.projects[projectId]
    let index = 0
    if(name.includes("Group") && name.split("Group").length == 2){
        index = parseInt(name.split("Group")[1])
    }
    projectData.groups[id] = {
        name: name,
        students: students,
        id: id,
        index: index
    }
    console.log("Created group with id " + id)
    await saveFile("Classes",JSON.stringify(localClasses))
    
    
}

async function createGroupFB(classId: string, projectId:string, name: string, students: string[]) {
    let index = 0
    if(name.includes("Group") && name.split("Group").length == 2){
        index = parseInt(name.split("Group")[1])
    }
    const id = await addDoc(collection(db, "Classes", classId, "Projects", projectId, "Groups"), {
        name: name,
        students: students,
        index: index


    })

    //Update the class with the id
    await updateDoc(doc(db, "Classes", classId, "Projects", projectId, "Groups", id.id), {
        id: id.id
    })
    console.log("Created group with id " + id.id)
    
}

export async function userInGroup(classId:string, projectId:string, userId:string, groupId?: string): Promise<boolean> { 
    if(ISLOCAL){
        return userInGroupLocal(classId, projectId, userId, groupId)
    }
    return await userInGroupFB(classId, projectId, userId, groupId)
}

function userInGroupLocal(classId: string, projectId: string, userId: string, groupId?: string): boolean{
    const projectData = localClasses[classId].projects[projectId]
    const groups = projectData.groups
    for(const key in groups){
        const group = groups[key]
        if(groupId != undefined){
            if(group.id == groupId){
                break
            }
        }

        if(group.students.includes(userId)){
            return true
        }
    }
    return false
}

async function userInGroupFB(classId: string, projectId: string, userId: string, groupId?: string): Promise<boolean>{
    const groupQ = query(collection(db, "Classes", classId, "Projects", projectId, "Groups"), where("students", "array-contains", userId))
    const groupQuerySnapshot = await getDocs(groupQ)
    const groupData = groupQuerySnapshot.docs.map((doc) => doc.data())
    //loop through groups and ignore groupId if it is defined
    for(const key in groupData){
        const group = groupData[key]
        if(groupId != undefined){
            if(group.id == groupId){
                break
            }
        }

        if(group.students.includes(userId)){
            return true
        }
    }
    
    return false
}

export async function getGroupData(classId: string, projectId: string, groupId: string): Promise<Group> {
    if(ISLOCAL){
        return getGroupDataLocal(classId, projectId, groupId)
    }
    return await getGroupDataFB(classId, projectId, groupId)
}

function getGroupDataLocal(classId: string, projectId: string, groupId: string): Group {
    return localClasses[classId].projects[projectId].groups[groupId]
}

async function getGroupDataFB(classId: string, projectId: string, groupId: string): Promise<Group> {
    const  group = doc(db, "Classes", classId, "Projects", projectId, "Groups", groupId)
    const groupData = (await getDoc(group)).data()
    if (groupData) {
        return groupData as Group
    }
    return {name: "", id: "", students: [], index: 0}
}

export async function editGroup(classId: string, projectId: string, groupId: string, groupName: string, students: string[]){
    if(ISLOCAL){
        await editGroupLocal(classId, projectId, groupId, groupName, students)
        return
    }
    await editGroupFB(classId, projectId, groupId, groupName, students)
}

async function editGroupLocal(classId: string, projectId: string, groupId: string, groupName: string, students: string[]){
    const group = localClasses[classId].projects[projectId].groups[groupId]
    group.name = groupName
    group.students = students
    saveFile("Classes", JSON.stringify(localClasses))

}

async function editGroupFB(classId: string, projectId: string, groupId: string, groupName: string, students: string[]){
    await updateDoc(doc(db, "Classes", classId, "Projects", projectId, "Groups", groupId), {
        name: groupName,
        students: students,
    })
}

export async function saveDefaultTemplate(userId: string, template: Questions){
    if(ISLOCAL){
        await saveDefaultTemplateLocal(userId, template)
        return
    }
    await saveDefaultTemplateFB(userId, template)
}

async function saveDefaultTemplateLocal(userId: string, template: Questions){
    localTeachers[userId].default_eval_template = template
    await saveFile("Teachers", JSON.stringify(localTeachers))
}

async function saveDefaultTemplateFB(userId: string, template: Questions){
    await updateDoc(doc(db, "Teachers", userId), {default_eval_template: template})
}

export async function deleteGroup(classId: string, projectId: string, groupId: string){
    if(ISLOCAL){
        await deleteGroupLocal(classId, projectId, groupId)
        return
    }
    await deleteGroupFB(classId, projectId, groupId)
}

async function deleteGroupLocal(classId: string, projectId: string, groupId: string){
    delete localClasses[classId].projects[projectId].groups[groupId]
    await saveFile("Classes", JSON.stringify(localClasses))
}

async function deleteGroupFB(classId: string, projectId: string, groupId: string){
    await deleteDoc(doc(db, "Classes", classId, "Projects", projectId, "Groups", groupId))
}

export async function studentJoinGroup(classId: string, projectId: string, groupId: string, userId: string){
    if(ISLOCAL){
        await studentJoinGroupLocal(classId, projectId, groupId, userId)
        return
    }
    await studentJoinGroupFB(classId, projectId, groupId, userId)
}

async function studentJoinGroupLocal(classId: string, projectId: string, groupId: string, userId: string){
    const group = localClasses[classId].projects[projectId].groups[groupId]
    group.students.push(userId)
    await saveFile("Classes", JSON.stringify(localClasses))
}

async function studentJoinGroupFB(classId: string, projectId: string, groupId: string, userId: string){
    const group = doc(db, "Classes", classId, "Projects", projectId, "Groups", groupId)
    const groupData = (await getDoc(group)).data()
    if (groupData) {
        await updateDoc(group, {students: [...groupData.students, userId]})
    }
}

export async function addStudentsToGroup(classId: string, projectId: string, groupId: string, students: string[]){
    if(ISLOCAL){
        await addStudentsToGroupLocal(classId, projectId, groupId, students)
        return
    }
    await addStudentsToGroupFB(classId, projectId, groupId, students)
}

async function addStudentsToGroupLocal(classId: string, projectId: string, groupId: string, students: string[]){
    const group = localClasses[classId].projects[projectId].groups[groupId]
    group.students = [...group.students, ...students]
    await saveFile("Classes", JSON.stringify(localClasses))
}

async function addStudentsToGroupFB(classId: string, projectId: string, groupId: string, students: string[]){
    const group = doc(db, "Classes", classId, "Projects", projectId, "Groups", groupId)
    const groupData = (await getDoc(group)).data()
    if (groupData) {
        await updateDoc(group, {students: [...groupData.students, ...students]})
    }
}

export async function leaveGroup(classId: string, projectId: string, groupId: string, userId: string){
    if(ISLOCAL){
        await leaveGroupLocal(classId, projectId, groupId, userId)
        return
    }
    await leaveGroupFB(classId, projectId, groupId, userId)
}

async function leaveGroupLocal(classId: string, projectId: string, groupId: string, userId: string){
    const group = localClasses[classId].projects[projectId].groups[groupId]
    group.students = group.students.filter((student) => student != userId)
    await saveFile("Classes", JSON.stringify(localClasses))
}

async function leaveGroupFB(classId: string, projectId: string, groupId: string, userId: string){
    const group = doc(db, "Classes", classId, "Projects", projectId, "Groups", groupId)
    const groupData = (await getDoc(group)).data()
    if (groupData) {
        await updateDoc(group, {students: groupData.students.filter((student: string) => student != userId)})
    }
}