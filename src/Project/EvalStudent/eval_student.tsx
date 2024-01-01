import { useState, useEffect, useRef } from 'react'
import "./eval_student.css"
import RangeQuestion from '../../QuestionComps/RangeQuestion'
import { Answer, FreeResponseAnswer, MultiChoiceAnswer, MultiSelectAnswer, Question, Questions, RangeAnswer } from '../../QuestionComps/QuestionTypes'
import MultiChoice from '../../QuestionComps/MultiChoice'
import MultiSelect from '../../QuestionComps/MultiSelect'
import FreeResponse from '../../QuestionComps/FreeResponse'
import { addStudentEval, getPastEvals, getProjectEvalTemplate } from '../../API/database'
import { Eval, EvalSubmission } from '../../firebase_types'
import { getUserId } from '../../API/auth'
import BackArrow from "../../assets/back_arrow.png"


function EvalStudent() {
    const [name, setName] = useState("")
    const [studentId, setStudentId] = useState<string>("")
    const [userId, setUserId] = useState<string>("")
    const [projID, setProjID] = useState("")
    const [classId, setClassId] = useState("")
    const [evalRes, setEvalRes] = useState<EvalSubmission[]>([])
    const completeEvalRef = useRef<HTMLDialogElement>(null)
    const incompleteEvalRef = useRef<HTMLDialogElement>(null)
    const [evalQs, setQs]  = useState<Questions>([{Question: "How much did they contribute?", Answer: {Type: "Range", Min: 1, MinTitle: "Not at all", Max: 5, MaxTitle: "Did Everything"}, id: "contribution", hasComment: true}, {Question: "What did they help with?", Answer: {Type: "MultiChoice", Choices: ["Slides", "Research", "Both"]}, id: "help", hasComment: true}, {Question: "What did they do well?", Answer: {Type: "MultiSelect", Choices: ["Teamwork", "Efficiency", "Creativity", "Nothing"]}, id: "well", hasComment: true}, {Question: "Any other comments?" , Answer: {Type: "FreeResponse"},hasComment: false, id:"comments"}])
    useEffect(() => {
       async function fetchData(){
            const url: string = window.location.search
            const params: URLSearchParams = new URLSearchParams(url)
            if (!params.has("name")){
                throw Error("missing name!")
            }
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
            setName(params.get("name")!)
            setProjID(projectId)
            setClassId(classId)
            setStudentId(params.get("studentId")!)
            const userId = await getUserId()
            if (!userId){
                throw Error("missing user id!")
            }
            setUserId(userId as string)
            const res = await getProjectEvalTemplate(classId, projectId)
            setQs(res)
            const pastEval: EvalSubmission[] = await getPastEvals(classId, projectId, studentId, userId as string)
            console.log(pastEval)
            const fillerEvalRes: EvalSubmission[] = []
                res.forEach((question) => {
                    fillerEvalRes.push({id: question.id, value: "", comment: ""})
                })
            console.log(fillerEvalRes)
            pastEval.forEach((p) => {
                
                fillerEvalRes.forEach((f) => {
                    if(p.id == f.id){
                        f.value = p.value
                        f.comment = p.comment
                    }
                })
            })
            console.log(fillerEvalRes)
            setEvalRes(fillerEvalRes)
            
            
        }
        fetchData()
        
    }, [])

    async function handleSumbitEval(){
        console.log(evalRes)
        for (let index = 0; index < evalRes.length; index++) {
            const submission = evalRes[index];
            if(submission.value == ""){
                incompleteEvalRef.current!.showModal()
                return
            }
            
        }
        // eval.forEach((question: EvalSubmission, index: number) => {
        //     if(question.value == ""){
        //         alert("Please fill out all the fields!")
        //         return
        //     }
        // })
        // for (const question of evalQs) {
        //     const sub: EvalSubmission = {id: question.id, value: "" }
        //     const val: number | string | undefined = document.getElementById(question.id)!.dataset.value
        //     if (!val){
        //         alert("Please fill out all the fields!")
        //         return
        //     }
        //     sub.value = val
        //     if(question.hasComment){
        //         const comment = document.getElementById(question.id + "-comment")!.value
        //         sub.comment = comment
        //     }
        //     evalRes.push(sub)
        // }
        // evalQs.forEach((question: Question<Answer>) => {
        //     const sub: EvalSubmission = {id: question.id}
        //     const val: number | string = document.getElementById(question.id)!.dataset.value
        //     if (!val){
        //         alert("Please fill out all the fields!")
        //         return
        //     }
        //     sub.value = val
        //     if(question.hasComment){
        //         const comment = document.getElementById(question.id + "-comment")!.value
        //         sub.comment = comment
        //     } else {
        //         sub.comment = null
        //     }
        //     evalRes.push(sub)
        // })
        const evaluation: Eval = {submitterId: userId, targetId: studentId, submission: evalRes}
        
        console.log(evaluation)
        await addStudentEval(classId, projID, evaluation, submitted)
       
        
        
    }

    const submitted = () => {
        completeEvalRef.current!.showModal()
    }

    const updateEval = (qustionIndex: number) => (answer: string | number) => {
        const newEval = [...evalRes]
        // newEval[qustionIndex].value =
        
            newEval[qustionIndex].value = answer
       
       
        setEvalRes(newEval)
    }

    const updateEvalComment = (qustionIndex: number) => ( comment: string) => {
        const newEval = [...evalRes]
        
        
            newEval[qustionIndex].comment = comment
        
        setEvalRes(newEval)
    }

    const getEval = (questionIndex: number) => () => {
        return evalRes[questionIndex]
    }
    
  return (
    <>
        <div className='Center'>
            <h2 className='Title'>{name}</h2>
            <img src={BackArrow} alt="back" className="BackArrow" onClick={() => {
                 const oldUrl = new URL(window.location.href)
                 oldUrl.searchParams.delete("name")
                 oldUrl.searchParams.delete("studentId")
                 window.location.href = oldUrl.origin + "/Project/" + oldUrl.search
            }}/>
            <div className='EvalQuestions'>
            {evalRes.length > 0 ? evalQs.map((question: Question<Answer>, index: number) => (
                <>
                {question.Answer.Type == "Range" ? <RangeQuestion key={question.id} question={question as Question<RangeAnswer>} updateEval={updateEval(index)} submission={evalRes[index]}/> 
                : question.Answer.Type == "MultiChoice" ? <MultiChoice key={question.id} question={question as Question<MultiChoiceAnswer>} updateEval={updateEval(index)} submission={evalRes[index]}/> 
                : question.Answer.Type == "MultiSelect" ? <MultiSelect key={question.id} question={question as Question<MultiSelectAnswer>} updateEval={updateEval(index)} getEval={getEval(index)} submission={evalRes[index]}/>
                : question.Answer.Type == "FreeResponse" ? <FreeResponse key={question.id} question={question as Question<FreeResponseAnswer>} updateEval={updateEval(index)} submission={evalRes[index]}/>
                : null}
                { question.hasComment ? <><label htmlFor="">Comment: </label>
                <br />
                <textarea name="" value={evalRes[index].comment} onChange={(e) => {
                    updateEvalComment(index)(e.target.value)
                }} cols={20} rows={5}></textarea> </>: null}
                </>
            )) : null}
            </div>
            
            <br />
            <div className='SubmitEval'>
                <button className='SubmitEvalBtn' onClick={handleSumbitEval}>Submit Evaluation</button>
            </div>
            
            <br />
            <br />
        </div>
        <dialog ref={completeEvalRef} className='CompleteEval'>
            <h2>Eval Submitted!</h2>
            <button onClick={() => {
                completeEvalRef.current!.close()
                const oldUrl = new URL(window.location.href)
                oldUrl.searchParams.delete("name")
                oldUrl.searchParams.delete("studentId")
                window.location.href = oldUrl.origin + "/Project/" + oldUrl.search
            }}>Close</button>
        </dialog>
        <dialog ref={incompleteEvalRef} className='IncompleteEval'>
            <h2>Please fill out all the fields!</h2>
            <button onClick={() => {
                incompleteEvalRef.current!.close()
            }}>Close</button>
        </dialog>
    </>
  )
}

export default EvalStudent
