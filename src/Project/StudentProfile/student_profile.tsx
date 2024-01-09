import { useState, useEffect } from 'react'
import "./student_profile.css"
import { Answer, Question, Questions } from '../../CustomTypes/QuestionTypes'
import { getProjectData, getProjectEvalTemplate, getStudentData, getStudentEvals } from '../../API/database'
import { Eval, EvalSubmission, Student } from '../../CustomTypes/firebase_types'
import { getUserId } from '../../API/auth'
import BackArrow from "../../assets/back_arrow.png"
import QuestionCard from './question_card'


type EvalReview = {
    question: Question<Answer>,
    submissions: EvalSubmission[]
}

function StudentProfile() {

    const [studentId, setStudentId] = useState<string>("")
    const [userId, setUserId] = useState<string>("")
    const [projID, setProjID] = useState("")
    const [classId, setClassId] = useState("")
    const [student, setStudent] = useState<Student>()
    const [isCurrentStudent, setIsCurrentStudent] = useState<boolean>(false)
    const [evalSubmissions, setEvalSubmissions] = useState<Eval[]>([])
    const [evalQs, setEvalQs] = useState<Questions>([])
    const [matchedQSubs, setMatchedQSubs] = useState<EvalReview[]>([])
    const [background, setBackground] = useState<string>("")
    const [evalBackgroundColor, setEvalBgColor] = useState<string>("")
    const [cardColor, setCardColor] = useState<string>("")
    const [groupId, setGroupId] = useState<string>("")

    useEffect(() => {
       async function fetchData(){
            const url: string = window.location.search
            const params: URLSearchParams = new URLSearchParams(url)
            if(!params.has("projectId")){
                throw Error("missing project id!")
            }
            if(!params.has("studentId")){
                throw Error("missing student id!")
            }
            if(!params.has("classId")){
                throw Error("missing class id!")
            }
            const projectId = params.get("projectId")!
            const classId = params.get("classId")!
            const studentId = params.get("studentId")!
            if(params.has("groupId")){
                setGroupId(params.get("groupId")!)
            }
            setProjID(projectId)
            setClassId(classId)
            setStudentId(params.get("studentId")!)
            const userId = await getUserId()
            if (!userId){
                throw Error("missing user id!")
            }
            setUserId(userId as string)
            const res = await getStudentData(studentId)
            setStudent(res)
            if (res.id == userId){
                setIsCurrentStudent(true)
            }
            const projectData = await getProjectData(classId, projectId)
            setEvalBgColor(projectData.evalBackgroundColor)
            setCardColor(projectData.cardColor)
            setBackground(projectData.background)
            const evals: Eval[] = await getStudentEvals(classId, projectId, studentId)
            setEvalSubmissions(evals)
            if(evals.length == 0){
                return
            }
            console.log(evals)
            const evalQs: Questions = await getProjectEvalTemplate(classId, projectId)
            
            setEvalQs(evalQs)
            const matchedQSubs: EvalReview[] = []
            for(let i = 0; i < evalQs.length; i++){
                const question: Question<Answer> = evalQs[i]
                const submissions: EvalSubmission[] = []
                evals.forEach((e) => {
                    submissions.push({id: e.submission[i].id, value: e.submission[i].value, comment: e.submission[i].comment, student: e.submitterId})
                })
                for(let j = 0; j < submissions.length; j++){
                    const submission = submissions[j]
                    const student = await getStudentData(submission.student!)
                    submission.student = student.name
                }
                matchedQSubs.push({question: question, submissions: submissions})
                // setMatchedQSubs((prev) => [...prev, {question: question, submissions: submissions}])
            }
            setMatchedQSubs(matchedQSubs)
            console.log(matchedQSubs)
            
        }
        fetchData()
        
    }, [])

  return (
    <>
        {student != undefined ? <div className={'Center ' + background} style={{backgroundColor: evalBackgroundColor}}>
            <h2 className='Title'>{isCurrentStudent ? "Your Profile" : student.name + "'s Profile"}</h2>
            <img src={BackArrow} alt="back" className="BackArrow" onClick={() => {
                const url = new URL(window.location.href)     
                url.searchParams.delete("studentId")
                if(groupId != ""){
                    window.location.href = url.origin + "/Group/" + url.search 
                } else {
                    window.location.href = url.origin + "/Project/" + url.search 
                }
               
        }}/>
            <div className='Results'>
            {evalSubmissions.length > 0 ? matchedQSubs.map((q) => (
                <QuestionCard question={q.question} submissions={q.submissions} cardColor={cardColor} isCurrentStudent={isCurrentStudent}/>
            )) : 
            <h3>No Evaluations Yet!</h3>}
            </div>
            
            
        </div> : null}
      
    </>
  )
}

export default StudentProfile
