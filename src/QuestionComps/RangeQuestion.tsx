

import { QuestionProps, RangeAnswer } from '../CustomTypes/QuestionTypes';
import RangeBtn from './RangeBtn';
import './RangeQuestion.css'


function RangeQuestion({question, updateEval, submission, updateEvalComment}:QuestionProps<RangeAnswer>) {

  function handleChangeChoice(choice: number){
    updateEval(choice)
  }

  return (
    <>
      <div className='Question' id={question.id}>
        <h3>{question.Question}</h3>
        <div className='Buttons'>
            <RangeBtn text={question.Answer.MinTitle} value={question.Answer.Min} handleChangeChoice={handleChangeChoice} selectedValue={submission.value as number}/>
            {[...Array(question.Answer.Max - question.Answer.Min - 1)].map((e: number, i: number) => (
                <RangeBtn text='' value={question.Answer.Min + i + 1} handleChangeChoice={handleChangeChoice} selectedValue={submission.value as number}/>
            ))}
            <RangeBtn text={question.Answer.MaxTitle} value={question.Answer.Max} handleChangeChoice={handleChangeChoice} selectedValue={submission.value as number}/>
        </div>
        {question.hasComment && <><label htmlFor="">Comment: </label>
                
                <textarea name="" className="CommentElmt" value={submission.comment} onChange={(e) => {
                    updateEvalComment(e.target.value)
                }} ></textarea></>}
      </div>
      
    </>
  )
}

export default RangeQuestion
