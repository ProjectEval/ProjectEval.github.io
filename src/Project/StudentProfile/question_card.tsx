import "./question_card.css"

import { EvalSubmission } from '../../CustomTypes/firebase_types'
import { Answer, Question } from "../../CustomTypes/QuestionTypes";
import FreeResponseSubmissionCard from "./SubmissionCards/FreeResponseSubmission";
import RangeSubmissionCard from "./SubmissionCards/RangeSubmission";
import { useEffect, useState } from "react";
import LeftCircle from "../../assets/left_circle.png"
import RightCircle from "../../assets/right_circle.png"
import RangeOverviewCard from "./SubmissionCards/RangeOverview";
import MultiChoiceOverview, { ChoiceOverview } from "./SubmissionCards/MultiChoiceOverview";

type QuestionCardProps = {
    question: Question<Answer>;
    submissions: EvalSubmission[];
    cardColor: string;
}

function QuestionCard({question, submissions, cardColor}: QuestionCardProps) {
  const [sumbissionIndex, setSubmissionIndex] = useState<number>(0)
  const [rangeAverage, setRangeAverage] = useState<number>(0)
  const [choices, setChoices] = useState<ChoiceOverview[]>([])
  const [isFrq, setIsFrq] = useState<boolean>(false)


  useEffect(() => {
    if(question.Answer.Type == "Range"){
      let sum = 0
      submissions.forEach(submission => {
        sum += submission.value as number
      })
      setRangeAverage(Math.round(sum / submissions.length))
    } else if(question.Answer.Type == "MultiChoice"){
      const choiceMap: Map<string, number> = new Map()
      submissions.forEach(submission => {
        if(choiceMap.has(submission.value as string)){
          choiceMap.set(submission.value as string, choiceMap.get(submission.value as string)! + 1)
        } else {
          choiceMap.set(submission.value as string, 1)
        }
      })
      const choices: ChoiceOverview[] = []
      choiceMap.forEach((value, key) => {
        choices.push({choice: key, count: value})
      })
      setChoices(choices)
    } else if(question.Answer.Type == "MultiSelect"){
      const choiceMap: Map<string, number> = new Map()
      submissions.forEach(submission => {
        const choices: string[] = submission.value.split(",")
        choices.forEach(choice => {
          if(choiceMap.has(choice)){
            choiceMap.set(choice, choiceMap.get(choice)! + 1)
          } else {
            choiceMap.set(choice, 1)
          }
        })
      })
      const choices: ChoiceOverview[] = []
      choiceMap.forEach((value, key) => {
        choices.push({choice: key, count: value})
      })
      setChoices(choices)
    } else if(question.Answer.Type == "FreeResponse"){
      setIsFrq(true)
    }
  } , [])


  
  return (
    <>
      <div className='QuestionCard'>
        <h2>{question.Question}</h2>
        {question.Answer.Type != "Range" && question.Answer.Type != "FreeResponse" ? 
          (question.Answer.Type == "MultiChoice"  || question.Answer.Type == "MultiSelect") && sumbissionIndex == 0 ?
            <MultiChoiceOverview choices={choices} cardColor={cardColor}/>
          :

          
            <FreeResponseSubmissionCard cardColor={cardColor} answer={submissions[ sumbissionIndex - 1].value.toString()} comment={submissions[sumbissionIndex - 1].comment}/>
          
          : question.Answer.Type == "Range" ?
            sumbissionIndex == 0 ?
            <RangeOverviewCard cardColor={cardColor} average={rangeAverage}/>
          :
          <RangeSubmissionCard cardColor={cardColor} answer={submissions[sumbissionIndex - 1].value.toString()} comment={submissions[sumbissionIndex - 1].comment} max={question.Answer.Max}/>
          :
          <FreeResponseSubmissionCard cardColor={cardColor} answer={submissions[sumbissionIndex ].value.toString()} comment={submissions[sumbissionIndex].comment}/>
        }
        <div className="Controls">
          <img src={LeftCircle} alt="Past Submission"className={"LeftSubmission " + (sumbissionIndex == 0 ? "Disabled" : "")} onClick={() => {
            if(sumbissionIndex > 0){
              setSubmissionIndex(sumbissionIndex - 1)
            }
          }}/>
          <img src={RightCircle} alt="Next Submission"className={"RightSubmission " + (sumbissionIndex == (isFrq ? submissions.length - 1 : submissions.length) ? "Disabled" : "")} onClick={() => {
            if(sumbissionIndex < (isFrq ? submissions.length - 1 : submissions.length)){
              setSubmissionIndex(sumbissionIndex + 1)
            }
          }}/>
        </div>
      </div>

      
    </>
  )
}

export default QuestionCard
