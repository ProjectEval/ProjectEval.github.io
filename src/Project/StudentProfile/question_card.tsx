import "./question_card.css"

import { EvalSubmission } from '../../firebase_types'
import { Answer, Question } from "../../QuestionComps/QuestionTypes";
import FreeResponseSubmissionCard from "./SubmissionCards/FreeResponseSubmission";
import RangeSubmissionCard from "./SubmissionCards/RangeSubmission";
import { useState } from "react";
import LeftCircle from "../../assets/left_circle.png"
import RightCircle from "../../assets/right_circle.png"

type QuestionCardProps = {
    question: Question<Answer>;
    submissions: EvalSubmission[]
}

function QuestionCard({question, submissions}: QuestionCardProps) {
  const [sumbissionIndex, setSubmissionIndex] = useState<number>(0)

  
  return (
    <>
      <div className='QuestionCard'>
        <h2>{question.Question}</h2>
        {question.Answer.Type != "Range" ? 
          
            <FreeResponseSubmissionCard answer={submissions[sumbissionIndex].value.toString()} comment={submissions[sumbissionIndex].comment}/>
          
          : 
           
          <RangeSubmissionCard answer={submissions[sumbissionIndex].value.toString()} comment={submissions[sumbissionIndex].comment} max={question.Answer.Max}/>
        }
        <div className="Controls">
          <img src={LeftCircle} alt="Past Submission"className={"LeftSubmission " + (sumbissionIndex == 0 ? "Disabled" : "")} onClick={() => {
            if(sumbissionIndex > 0){
              setSubmissionIndex(sumbissionIndex - 1)
            }
          }}/>
          <img src={RightCircle} alt="Next Submission"className={"RightSubmission " + (sumbissionIndex == submissions.length - 1 ? "Disabled" : "")} onClick={() => {
            if(sumbissionIndex < submissions.length - 1){
              setSubmissionIndex(sumbissionIndex + 1)
            }
          }}/>
        </div>
      </div>

      
    </>
  )
}

export default QuestionCard
